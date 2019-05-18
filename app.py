import numpy as np
from flask import Flask, render_template, redirect
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
from config import dbuser, dbpasswd, dburi, dbport, dbname

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################

engine = create_engine(f"mysql://{dbuser}:{dbpasswd}@{dburi}:{dbport}/{dbname}")
# Base.metadata.create_all(engine)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Crime = Base.classes.crime_data_2018

# Create our session (link) from Python to the DB
session = Session(engine)

# Create an instance of Flask
app = Flask(__name__)


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

@app.route("/data")
def data():

    return render_template("kcpd_crime.json")
 
# API will have 3 parameters: Lat, Lng, and Radius
# SQL query will search MySQL DB based on the 3 parameters 
@app.route("/api/crimes")
def crimes():

    results = session.query(Crime).all()
    d = list()
    for t in results: 
        d.append([t.Description, t.Address])

    return jsonify(d)

if __name__ == "__main__":
    app.run(debug=True)