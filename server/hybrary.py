# -*- coding: utf-8 -*-
# coded by EJSohn

from flask import Flask
from flask import jsonify
from seat_finder import returnEmptyLoackers, returnReadingRoomInfo

application = Flask(__name__)



@application.route("/")
def hello():
    return "<h1 style='color:blue'>Test page.</h1>"

@application.route("/v1.0/getSeoulEmptyLockers")
def getSeoulEmptyLockers():
    returnval = returnEmptyLoackers()

    return jsonify(returnval)


if __name__ == "__main__":
    application.run(host='0.0.0.0', port='60')



