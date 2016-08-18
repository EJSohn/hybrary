# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import urllib
import logging
import logging.handlers

# logger 인스턴스 생성 및 로그 레벨 설정
logger = logging.getLogger("crumbs")
logger.setLevel(logging.DEBUG)

# formmater 생성
formatter = logging.Formatter('[%(levelname)s|%(filename)s:%(lineno)s] %(asctime)s > %(message)s')
#fileHandler 생성 및 세팅
fileHandler = logging.FileHandler('./log/finder.log')
fileHandler.setFormatter(formatter)
# handler를 logging에 추가.
logger.addHandler(fileHandler)

def saveLine(LockersTable):
    returnInfo = []

    Lockers = LockersTable.find_all("td")
    returnInfo.append(Lockers[1].contents[1].split(":")[1].strip()) # 총 사물함 수
    returnInfo.append(Lockers[3].contents[1].split(":")[1].strip()) # 잔여 사물함 수
    returnInfo.append(Lockers[4].contents[0]) # 업데이트 일시분초 
    # encode unicode to utf-8
    returnInfo = [each.encode("utf-8") for each in returnInfo]

    return returnInfo

def returnEmptyLoackers():
    # electronic lockers
    LockersInfoUrl = "http://library.hanyang.ac.kr/tulip/jsp/theme/hanyang/save_locker.jsp?code=2"
    LockerHtmlBody = unicode(urllib.urlopen(LockersInfoUrl).read(), "euc-kr").encode("utf-8")

    # makes beautifulsoup object
    lockersSoup = BeautifulSoup(LockerHtmlBody, 'html.parser')

    # 갱신되는 테이블이 자리한 섹션을 반환. *top01_01 -> 서울캠퍼스, top01_02 -> 에리카 캠퍼스
    seoulLockers = lockersSoup.find(id="top01_01")
    ericaLockers = lockersSoup.find(id="top01_02")

    lockerA = seoulLockers.find(bgcolor="#dddddd")
    lockerB = seoulLockers.find(bgcolor="dddddd")

    # 각 사물함 라인의 총 사물함, 잔여 사물함, 업데이트 일시분초를 차례로 담는 list  
    lockerAInfo = saveLine(lockerA)
    lockerBInfo = saveLine(lockerB)

    print lockerAInfo, lockerBInfo


# the reading room
