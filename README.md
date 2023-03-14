# Hoko

Japanese speech-controlled maze-based game

# How to run

## Start Web-app:

1. Navigate to hoko-app/
2. `npm start`

## Create and run backend docker image

The API (server.py) runs on a default port of 5000. To change the port, edit the Dockerfile and the port mapping in `docker run`.

`docker build -t hoko-backend .`
`docker run -p 5000:5000 hoko-backend`

## API Connection

Include a .env file in top level, containing a wit.ai access token.

## Train move-extraction NLP model

An example dataset can be found in `/examples`.

1. Load dataset csv `direction_phrases_dataset.csv` into `/speech/data`
2. `python speech/retrain_model.py`

# How to play

Instructions for playing the game are shown in the Help menu. Press the `Help` button on the UI to see game information and instructions.

Have fun playing!
