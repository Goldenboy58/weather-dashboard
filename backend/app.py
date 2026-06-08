from flask import Flask, jsonify
from flask_cors import CORS
import redis
import requests
import os
import json

app = Flask(__name__)
CORS(app)
r = redis.Redis(
    host=os.getenv('REDIS_HOST', 'redis-service'),
    port=6379,
    decode_responses=True
)

API_KEY = os.getenv('OPENWEATHER_API_KEY')
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
@app.route('/health')
def health():
    return jsonify({"status": "ok"})
@app.route('/weather/<city>')
def get_weather(city):
    # 1. Check Redis cache first
    cached = r.get(city)
    if cached:
        return jsonify(json.loads(cached))
    
    # 2. Call OpenWeather API
    response = requests.get(BASE_URL, params={
        'q': city,
        'appid': API_KEY,
        'units': 'metric'
    })
    data = response.json()

    # 3. Cache result for 10 minutes (600 seconds)
    r.setex(city, 600, json.dumps(data))

    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

