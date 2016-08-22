from flask import Flask
application = Flask(__name__)



@application.route("/")
def hello():
    return "<h1 style='color:blue'>in changes?</h1>"


if __name__ == "__main__":
    application.run(host='0.0.0.0', port='60')



