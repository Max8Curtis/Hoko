# Hoko

Japanese speech-controlled maze-based game

# How to run

## Start Web-app:

1. Navigate to hoko-app/
2. `npm start`

## Create and run backend docker image

The API (server.py) runs on a default port of 5000. To change the port, edit the Dockerfile and the port mapping in command 3, then alter the `api/server.py` port variable.

1. Navigate to hoko-app/
2. `docker build -t hoko-backend .`
3. `docker run -p 5000:5000 --env-file .env hoko-backend`

## External API Connection

Include a .env file in top level, containing a wit.ai access token. Format is as follows:

GENERATE_SOURCEMAP=false

WIT_ACCESS_TOKEN=<Personal token>
  
API_ENDPOINT=https://api.wit.ai/
  
API_FUNCTION_SPEECH=speech

## Train move-extraction NLP model

An example dataset can be found in `/examples`.

1. Load dataset csv `direction_phrases_dataset.csv` into `/speech/data`
2. `python speech/retrain_model.py`
3. Rebuild docker image to include new model

# How to play

Instructions for playing the game are shown in the Help menu. Press the `Help` button on the UI to see game information and instructions.

# Have fun playing!
