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


# 라이브러리 타입을 잘못 입력했을 경우에 발생하는 커스텀 오류 선언
class LibraryTypeError(Exception):
    def __init__(self, msg):
        self.msg = msg

    def __str__(self):
        return self.msg


##########################
### electronic lockers ###
##########################

# returnEmptyLoackers에서 사용하는 함수. 로커 테이블을 받아 정보를 가공해 리턴해준다. 
def saveLine(LockersTable):
    returnInfo = {}

    Lockers = LockersTable.find_all("td")
    returnInfo['full']=(Lockers[1].contents[1].split(":")[1].strip().encode("utf-8")) # 총 사물함 수
    returnInfo['remain']=(Lockers[3].contents[1].split(":")[1].strip().encode("utf-8")) # 잔여 사물함 수
    returnInfo['update']=(Lockers[4].contents[0].encode("utf-8")) # 업데이트 일시분초 
    # encode unicode to utf-8

    return returnInfo

def returnEmptyLoackers():
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
    lockerAInfo['name'] = "사물함 A"
    lockerBInfo = saveLine(lockerB)
    lockerBInfo['name'] = "사물함 B"

    return lockerAInfo, lockerBInfo



##########################
###  the reading room  ###
##########################

# libraryType으로 백남학술정보관과 법학학술정보관을 구분한다. 백남 -> 0, 법학 -> 1 (integer)
def returnReadingRoomInfo(libraryType):
    returnInfo = {}   # 전체 정보를 리턴할 딕셔너리 선언 

    if libraryType==0:
        RRInfoUrl = "http://166.104.182.141/seats/domian5.asp"   # url 변수
        tableEndLine = 12   # 파싱할 때 테이블의 경계를 표시하기 위한 변수.
        rangeEndVal = 8 # 백남과 법학 학술 정보관의 열람실 수 차이로 인한 변수

    elif libraryType==1:
        RRInfoUrl = "http://166.104.182.141/seatl/domian5.asp"
        tableEndLine = 8
        rangeEndVal = 4
    else :
        raise LibraryTypeError("라이브러리 타입 오류")

    RRHtmlBody = unicode(urllib.urlopen(RRInfoUrl).read(), "euc-kr").encode("utf-8")

    # makes beautifulsoup object
    RRSoup = BeautifulSoup(RRHtmlBody, "html.parser")


    ReadingRooms = RRSoup.find_all("tr")[4: tableEndLine ]   # 테이블 내 4번째에서 11번째의 열이 열람실의 좌석을 나타낸다. 
    returnInfo["Date"] = RRSoup.find_all("tr")[2].font.string # 업데이트 일시분초

    ReadingRoomsInfo = []   #전체 열람실 좌석정보를 담을 리스트 선언
    for RR in range(0, rangeEndVal ):
        tmpRR = {}   # 각 열람실 좌석 정보를 담을 딕셔너리 선언
        tmpRR["RRname"] = ReadingRooms[RR].find_all("td")[1].find("a").contents[0]
        tmpRR["totalSeat"] = int(ReadingRooms[RR].find_all("td")[2].find("font").contents[0]) #string to int
        tmpRR["remainSeat"] = int(ReadingRooms[RR].find_all("td")[4].find("font").contents[0])

        ReadingRoomsInfo.append(tmpRR)

    returnInfo["ReadingRoomsInfo"] = ReadingRoomsInfo
    return returnInfo


