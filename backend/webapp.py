from flask import Flask
import requests

app = Flask("main")


@app.get("/temperature")
def hello_world():
    return getNOAATemp()


def getNOAATemp():
    r = requests.get(url="https://api.weather.gov/points/37.2296,-80.4139")
    url = r.json()["properties"]["forecastHourly"]
    r = requests.get(url)
    return r.json()["properties"]["periods"]


@app.get("/gesture")
def returnGesture():
    pass  # get from nathan


app.run(port=5000)
