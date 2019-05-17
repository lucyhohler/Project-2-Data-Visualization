from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
#mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Return template and data
    return render_template("index.html")#, mars=db_data)

@app.route("/chart")
def chart():

    # Return template and data
    return render_template("chart.html")

@app.route("/map")
def map():

    # Return template and data
    return render_template("map.html")




if __name__ == "__main__":
    app.run(debug=True)