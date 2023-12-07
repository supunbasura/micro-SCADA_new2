import dash
from dash import dcc, html
from dash.dependencies import Output, Input
import plotly.graph_objs as go
import psycopg2

# PostgreSQL database connection parameters
DATABASES = {
    'NAME': 'tssl',
    'USER': 'postgres',
    'PASSWORD': ' ',  # Adjust your password
    'HOST': 'localhost',
    'PORT': '5432',
}

def fetch_data():
    try:
        connection = psycopg2.connect(
            dbname=DATABASES['NAME'],
            user=DATABASES['USER'],
            password=DATABASES['PASSWORD'],
            host=DATABASES['HOST'],
            port=DATABASES['PORT']
        )
        cursor = connection.cursor()  # Initialize the cursor
        cursor.execute("""
            SELECT received_at, VOLTAGE, CURRENT, FREQ, POW
            FROM kafka_app_book
            ORDER BY received_at DESC
            LIMIT 10
        """)
        result = cursor.fetchall()
        cursor.close()  # Close the cursor
        connection.close()  # Close the connection
        return result
    except psycopg2.Error as e:
        print(f"Error fetching data from the database: {e}")
        return None

# Initialize the Dash web application
app = dash.Dash(__name__)

app.layout = html.Div([
    dcc.Graph(id='live-update-graph'),
    dcc.Interval(
        id='interval-component',
        interval=0.25 * 1000,  # in milliseconds
        n_intervals=0
    )
])

@app.callback(Output('live-update-graph', 'figure'),
              Input('interval-component', 'n_intervals'))
def update_graph(n):
    power_data = fetch_data()
    if power_data:
        received_at = [row[0] for row in power_data]
        voltage_values = [row[1] for row in power_data]
        current_values = [row[2] for row in power_data]
        freq_values = [row[3] for row in power_data]
        pow_values = [row[4] for row in power_data]

        fig = go.Figure()
        fig.add_trace(go.Scatter(x=received_at, y=voltage_values, mode='lines', name='Voltage'))
        fig.add_trace(go.Scatter(x=received_at, y=current_values, mode='lines', name='Current'))
        fig.add_trace(go.Scatter(x=received_at, y=freq_values, mode='lines', name='Frequency'))
        fig.add_trace(go.Scatter(x=received_at, y=pow_values, mode='lines', name='Power'))

        fig.update_layout(title='LBS Data', xaxis_title='Timestamp', yaxis_title='Values')
        return fig
    else:
        return go.Figure()

if __name__ == '__main__':
    app.run_server(debug=True)
