import json
from flask import Flask, app
import requests
import icalendar
app = Flask("main")

@app.get("/temperature")
def hello_world():
    return getNOAATemp()

@app.get("/calendar")
def calendar():
    file = open("./calendar.ics")
    calendar = icalendar.Calendar.from_ical(file.read())
    eventsntimes = {
        "name":  [],
        "timestart": [],
        "timeend": []
    }
    for event in calendar.walk('VEVENT'):
        eventsntimes["name"].append(str(event.get("SUMMARY")))
        eventsntimes["timestart"].append(str(event.get("DTSTART")))
        eventsntimes["timeend"].append(str(event.get("dtend")))

        #eventsntimes.append([event.get("SUMMARY"), event.get("DTSTART")])
    print(eventsntimes)
    return json.dumps(eventsntimes)

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

