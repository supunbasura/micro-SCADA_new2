import dash
from dash import dcc, html
from dash.dependencies import Output, Input
import plotly.graph_objs as go
import psycopg2
from datetime import datetime, date, time
# PostgreSQL database connection parameters
db_params = {
    'host': '127.0.0.1',
    'database': 'plotly',
    'user': 'postgres',
    'password': ' ',
}

def fetch_data():
    try:
        # Connect to the PostgreSQL database
        with psycopg2.connect(**db_params) as conn:
            with conn.cursor() as cursor:
                # Query to fetch the last 25 data rows from the power_data table
                cursor.execute("""
                    SELECT entry_date, entry_time, VOLTAGE, CURRENT, FREQ, POW
                    FROM power_data
                    ORDER BY entry_date DESC, entry_time DESC
                    LIMIT 50
                """)
                result = cursor.fetchall()

        return result

    except psycopg2.Error as e:
        print(f"Error fetching data from the database: {e}")
        return None

# Initialize the Dash web application
app = dash.Dash(__name__)

# # Set displayModeBar to False to hide the header and footer
# app.config.suppress_callback_exceptions = True
# app.config.update({'displayModeBar': False})
# Plotly.fig( {displayModeBar: true})# Layout of the web application

app.layout = html.Div([
    dcc.Graph(id='live-update-graph'),
    dcc.Interval(
        id='interval-component',
        interval=0.25 * 1000,  # in milliseconds
        n_intervals=0
    )
])

# Callback function to update the graph data
@app.callback(Output('live-update-graph', 'figure'),
              Input('interval-component', 'n_intervals'))
def update_graph(n):
    # Fetch the latest data
    power_data = fetch_data()

    if power_data:
        entry_dates = [str(row[0]) + ' ' + str(row[1]) for row in power_data]
        voltage_values = [row[2] for row in power_data]
        current_values = [row[3] for row in power_data]
        freq_values = [row[4] for row in power_data]
        pow_values = [row[5] for row in power_data]

        # Create a subplot with shared x-axis
        fig = go.Figure()

        # Plot voltage values
        fig.add_trace(go.Scatter(x=entry_dates, y=voltage_values, mode='lines', name='Voltage'))

        # Plot current values
        fig.add_trace(go.Scatter(x=entry_dates, y=current_values, mode='lines', name='Current'))

        # Plot frequency values
        fig.add_trace(go.Scatter(x=entry_dates, y=freq_values, mode='lines', name='Frequency'))

        # Plot power values
        fig.add_trace(go.Scatter(x=entry_dates, y=pow_values, mode='lines', name='Power'))

        # Update layout
        fig.update_layout(title='LBS Data',
                          xaxis_title='Timestamp',
                          yaxis_title='Values')

        return fig

    else:
        return go.Figure()

if __name__ == '__main__':
    # Run the web application
    app.run_server(debug=True)
