# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import urllib

# 비어있는 사물함을 확인하고 반환해주는 함수
def returnEmptyLoackers(Loackers):
    # 비어있는 사물함을 저장할 리스트
    EmptyLoackers = []

    for line in Loackers:
        for loacker in line.find_all('td'):
            checkIfEmpty = loacker.find(style="font-size:11px; background-image:url(/image/ko/local/locker/B_box_L.png); padding-top:3px; padding-left:1px; ")
            if checkIfEmpty is not None:
                EmptyLoackers.append(checkIfEmpty.b.string)
    return EmptyLoackers


# electronic lockers
LockersInfoUrl = "http://library.hanyang.ac.kr/tulip/jsp/theme/hanyang/save_locker.jsp?code=1"
LockerHtmlBody = urllib.urlopen(LockersInfoUrl).read()

# makes beautifulsoup object
lockersSoup = BeautifulSoup(LockerHtmlBody, 'html.parser')

# 갱신되는 테이블이 자리한 섹션을 반환. *top01_01은 갱신 전 섹션.
firstResult = lockersSoup.find(id="top01_02")
secondResult = firstResult.find_all("table")

# 전자사물함A, B
lockers_A =  secondResult[2].find_all("tr")
lockers_B = secondResult[5].find_all("tr")

# A, B사물함 라인 1~5
lockersALine = []
lockersBLine = []
for i in range(0, 5):
    lockersALine.append(lockers_A[1 + 2*i])
    lockersBLine.append(lockers_B[1 + 2*i])

# A, B 사물함의 비어있는 자리 리스트.
lockersAEmpty = returnEmptyLoackers(lockersALine).sort()
lockersBEmpty = returnEmptyLoackers(lockersBLine).sort()

# 확인.
print lockersAEmpty, lockersBEmpty

# the reading room
