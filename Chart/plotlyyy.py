import dash
from dash import dcc, html
from dash.dependencies import Output, Input
import plotly.graph_objs as go
import psycopg2
import pandas as pd

# Database connection parameters
db_params = {
    'host': '127.0.0.1',
    'database': 'tssl',
    'user': 'postgres',
    'password': ' ',  # Fill in your password
}

# Function to fetch data from the database
def fetch_data():
    try:
        with psycopg2.connect(**db_params) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT received_at, VOLTAGE, CURRENT, FREQ, POW
                    FROM kafka_app_book
                    ORDER BY received_at DESC
                    LIMIT 50
                """)
                result = cursor.fetchall()

        return result

    except psycopg2.Error as e:
        print(f"Error fetching data from the database: {e}")
        return None

# Initialize the Dash app
app = dash.Dash(__name__)

# Layout of the app
app.layout = html.Div([
    dcc.Graph(id='live-update-graph'),
    dcc.Interval(
        id='interval-component',
        interval=1*100,  # in milliseconds
        n_intervals=0
    )
])

# Callback function to update the graph
@app.callback(Output('live-update-graph', 'figure'),
              [Input('interval-component', 'n_intervals')])
def update_graph_live(n):
    data = fetch_data()
    df = pd.DataFrame(data, columns=['received_at', 'VOLTAGE', 'CURRENT', 'FREQ', 'POW'])

    # Create the graph with plotly
    fig = go.Figure()

    fig.add_trace(go.Scatter(x=df['received_at'], y=df['VOLTAGE'], name='Voltage',
                             mode='lines+markers'))
    fig.add_trace(go.Scatter(x=df['received_at'], y=df['CURRENT'], name='Current',
                             mode='lines+markers'))
    fig.add_trace(go.Scatter(x=df['received_at'], y=df['FREQ'], name='Frequency',
                             mode='lines+markers'))
    fig.add_trace(go.Scatter(x=df['received_at'], y=df['POW'], name='Power',
                             mode='lines+markers'))

    # Update layout
    # fig.update_layout(    title={
    #                 'text': 'Real-time data',
    #                 'x': 0.5,  
    #                 'y': 0.9  
    #                 },
    #                   xaxis_title='Time',
    #                   yaxis_title='Values')
    fig.update_layout(
    title={'text': 'Real-time Data', 'x': 0.5, 'y': 0.9, 'font': {'size': 24, 'color': 'gray'}},
    xaxis_title='Time',
    yaxis_title='Values',
    plot_bgcolor='rgba(0, 0, 0, 0)',  # Transparent background
    paper_bgcolor='rgba(0, 0, 0, 0)',  # Transparent paper
    font=dict(family='Arial, sans-serif', size=12, color='#7f7f7f'),
    xaxis=dict(showline=True, showgrid=False, linecolor='rgb(204, 204, 204)'),
    yaxis=dict(showline=True, showgrid=True, gridcolor='rgb(204, 204, 204)'),
    legend=dict(x=0, y=1, traceorder='normal', font=dict(size=12)),
    margin=dict(l=40, r=40, t=40, b=40),
    hovermode='closest'
)

    # Customize each trace
    fig.update_traces(marker=dict(size=10, line=dict(width=2, color='DarkSlateGrey')),
                  selector=dict(mode='markers'))


    return fig

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
