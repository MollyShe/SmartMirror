from flask import Flask
import requests
import apiKeys
app = Flask("main")

@app.get("/temperature")
def hello_world():
    return getNOAATemp()

def getTemp():
    r = requests.get(url=f"http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={apiKeys.getWeatherAPIkey()}")
    temp  = r.json()["list"][0]["main"]
    return temp


def getNOAATemp():
    r = requests.get(url="https://api.weather.gov/points/37.2296,-80.4139")
    url = r.json()["properties"]["forecast"]
    r=requests.get(url)
    print(r.json())
    return r.json()


@app.get("/gesture")
def returnGesture():
    pass #get from nathan

