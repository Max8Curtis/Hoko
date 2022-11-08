from flask import Flask
from flask_restful import Resource, Api, reqparse

app = Flask("AppAPI")
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('title', required=True)


@app.route('/data')
def get_time():
    return {
        'ID': "0",
        'Data': "Parameter returned"
    }


if __name__ == "__main__":
    app.run()
