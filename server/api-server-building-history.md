## Centos 5 환경에서 uWSGI+Nginx+Flask API 서버 빌딩 ##


>  본 기록은 개인 학습용이므로 아무런 책임이나 신용은 받지 않습니다.
>  참고한 링크 : 
>  https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-centos-7
>  https://www.linode.com/docs/websites/nginx/wsgi-using-uwsgi-and-nginx-on-centos-5

설치를 진행하기 전 dependencies를 체크하고 설치나 업데이트가 필요한 프로그램들은 yum으로 재설치 및 업데이트한다. 








### Python 가상 환경 만들기    

pip을 이용해 virtualenv 설치. 프로젝트 디렉토리로 들어가 해당 프로젝트를 위한 가상 환경을 생성한다.

    sudo pip install virtualenv
    virtualenv myprojectenv

가상환경은 다음과 같은 명령어로 실행시키고 멈출 수 있다.

    source myprojectenv/bin/activate
    deactivate


### Flask application 생성

 flask 또한 pip으로 설치. 
 

    pip install uwsgi flask

 후에 api 코드가 작성 될 python 파일 내에 Hello world 함수를 만든다.
 

    // in  proejctdir/app.py
    from flask import Flask
    application = Flask(__name__)
    
    @application.route("/")
    def hello():
	    return "<h1 style='color:blue'>Hello There!</h1>"
	
	if __name__ == "__main__":
		application.run(host='0.0.0.0')


### WSGI Entry point 만들기

프로젝트 디렉토리에 wsgi.py 파일을 만들고 flask 어플리케이션을 받아 서브할 수 있도록 코드를 짠다.

    // in proejctdir/wsgi.py
    from myproject import application
    
    if __name__ == "__main__":
	    application.run()

이정도까지 진행이 되었으면 터미널에 다음과 같은 명령어를 타이핑함으로써 서버에 앱이 올라가는 것을 확인 할 수 있다. 

    uwsgi --socket 0.0.0.0:8000 --protocol=http -w wsgi

하지만 매번 저렇게 긴 옵션들을 타이핑하는것은 여간 번거로운 일이 아니므로 uWSGI configuration file을 생성해 과정을 생략할 수 있도록 한다.

    // in  proejctdir/app.ini
    [uwsgi]
    module = wsgi
    master = true
    processes = 5
    socket = 0.0.0.0:60 //app.sock enable
    protocol = http
    vacuum = true
    die-on-term = true


이제 긴 명령어 대신 다음을 타이핑 함으로써 uwsgi를 실행시킬 수 있게 되었다.

    uwsgi app.ini &


사실 여기까지 진행하면 서버를 재시동 하지 않는 이상 uwsgi는 백그라운드에서 계속해서 돌아가게 된다.. 즉 api 서버로 사용 가능하다는 것이다. 
재시동 시마다 init.d에서 uwsgi를 실행하도록, 그리고 nginx와 uwsgi를 연결하는 작업 또한 시도했으나 실패하였다. 
