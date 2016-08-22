# -*- coding: utf-8 -*-
# coded by EJSohn

from flask import Flask
from flask import jsonify
from seat_finder import returnEmptyLoackers, returnReadingRoomInfo

application = Flask(__name__)



@application.route("/")
def hello():
    return "<h1 style='color:blue'>Test page.</h1>"


# 서울캠퍼스 전자사물함의 총 사물함 수, 빈 사물함 수, 업데이트 일시분초를 json으로 반환해주는 함수
@application.route("/v1.0/getSeoulEmptyLockers")
def getSeoulEmptyLockers():
    returnval = returnEmptyLoackers()

    return jsonify(returnval)

# 서울캠퍼스 각 열람실의 열람실이름, 총 자리 갯수, 빈 자리의 갯수를 json으로 반환해주는 함수
@application.route("v1.0/getSeoulEmptyReadingRoom")
def getSeoulEmptyReadingRoom():
    returnval = returnReadingRoomInfo()

    return jsonify(returnval)

if __name__ == "__main__":
    application.run(host='0.0.0.0', port='60')



