# Hoko

Japanese speech-controlled maze-based game

# How to run

Start API:

1. Navigate to hoko-app/api/
2. Run `python server.py`

Start Web-app:

1. Navigate to hoko-app/
2. `npm start`

## API Connection

Include a .env file in top level, containing a wit.ai access token.

## Train move-extraction NLP model

1. Load dataset csv `direction_phrases_dataset.csv` into `/speech/data`
2. `python speech/retrain_model.py`
