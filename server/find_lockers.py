# -*- coding: utf-8 -*-

from seat_finder import returnEmptyLoackers
from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import select
from twilio.rest import TwilioRestClient

# 데이터베이스 연결 함수
def connectDB():
    engine = create_engine('#################')
    metadata = MetaData(bind=engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    return engine, metadata, session


def searchEmptyLockers():
    lockers = returnEmptyLoackers()
    # variable for save all remain locker number
    remains = []
    remainsNum = 0

    for locker in lockers:
        tmpdic = {}
        tmpdic['name'] = locker['name'] 
        tmpdic['remains'] = locker['remain']
        remains.append(tmpdic)
        tmpNum = int(locker['remain'])
        remainsNum += tmpNum

    if remainsNum > 0:
        # make connection
        engine, metadata, session = connectDB()
        engine.text_factory = str
        conn = engine.connect()

        Users = Table('Users', metadata, autoload=True)
        check = select([Users]).where(Users.c.state == 1)
        check_result = conn.execute(check)
        
        # make twilio client
        client = TwilioRestClient("#################",\
                                  "#################")

        # make message body
        messageBody = "[하이브러리]: "+ \
                      remains[0]['name']+"에 "+ \
                      str(remains[0]['remains'])+"개의 사물함 , "+ \
                      remains[1]['name']+"에 "+ \
                      str(remains[1]['remains'])+"개의 사물함이 남아 있습니다." 

        for row in check_result:
            # save users phone number and sending message
            phoneNum = row[Users.c.phoneNum]
            # phone number edit
            phoneNum = "+82"+phoneNum[1:]

            messageBody = \
            client.messages.create(to=phoneNum, from_="#################", \
                    body= messageBody )

        # after sending message, edit users state to 0
        stateToZero = Users.update().where(Users.c.state == 1).values(state=0)
        stz_result = conn.execute(stateToZero)


if __name__ == "__main__":
    searchEmptyLockers()

