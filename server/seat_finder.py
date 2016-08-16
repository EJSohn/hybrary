# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import urllib

# electronic lockers
LockersInfoUrl = "http://library.hanyang.ac.kr/tulip/jsp/theme/hanyang/save_locker.jsp?code=1"

LockerHtmlBody = urllib.urlopen(LockersInfoUrl).read()

# the reading room