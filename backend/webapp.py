import json
from flask import Flask, app
from flask_cors import CORS
import requests
import icalendar
app = Flask("main")
CORS(app)  # This will allow all origins

@app.get("/temperature")
def hello_world():
    return getNOAATemp()

  
@app.get("/calendar")
def calendar():
    file = open("./calendar.ics")
    calendar = icalendar.Calendar.from_ical(file.read())
    eventsntimes = []
    i=0
    for event in calendar.walk('VEVENT'):
        
        eventsntimes.append(dict(id = i, title = str(event.get("SUMMARY"),), start = cleanTime(str(event.get("DTSTART"))), end = cleanTime(str(event.get("dtend")) )))
        #eventsntimes[i].append(str(event.get("SUMMARY")))
        #eventsntimes[i].append(str(event.get("DTSTART")))
        #eventsntimes[i].append(str(event.get("dtend")))
        
        i+=1

        #eventsntimes.append([event.get("SUMMARY"), event.get("DTSTART")])
    print(eventsntimes)
    return eventsntimes

def cleanTime(datetime: str):
    if(datetime):
        datetime = datetime.removeprefix("vDDDTypes(")
        datetime = datetime.removesuffix(", Parameters({}))")
        datetime = datetime.replace(", Parameters({'TZID': 'America/New_York'}))", "")
        datetime = datetime.replace("Parameters({'VALUE': 'DATE'}))", "")
        return datetime
    
    return


def getTemp():
    r = requests.get(url=f"http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={apiKeys.getWeatherAPIkey()}")
    temp  = r.json()["list"][0]["main"]
    return temp

  
def getNOAATemp():
    r = requests.get(url="https://api.weather.gov/points/37.2296,-80.4139")
    url = r.json()["properties"]["forecastHourly"]
    r = requests.get(url)
    return r.json()["properties"]["periods"]


@app.get("/gesture")
def returnGesture():
    pass  # get from nathan


app.run(port=5000)
