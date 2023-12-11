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
    fig.update_layout(title='Real-time data from PostgreSQL',
                      xaxis_title='Time',
                      yaxis_title='Values')

    return fig

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
