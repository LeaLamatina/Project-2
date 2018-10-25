# python app to parse csv files in slqlite server

import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


# ======================================
#  Database Setup
# ======================================
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Resources/test/baseballdatabasetest.db"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(db.engine, reflect=True)

print('check')
# Save references to each table
baseBALLtest = Base.classes.baseballtest
consolidatedPlayers = Base.classes.consolidatedplayers

# connecting app to homepage
@app.route("/")
def index():
  return render_template("index.html")

@app.route("/teams")
def teams():
  stmt = db.session.query(baseBALLtest).statement
  df = pd.read_sql_query(stmt, db.session.bind)
  # return a list of the teamnames
  return jsonify(list(df['Tm'][0:len(df)-1]))

@app.route("/baseball/<team>")
def BASEBALLtest(team):
  sel = [
    baseBALLtest.Tm,
    baseBALLtest.pitcherW,
    baseBALLtest.pitcherL,
    baseBALLtest.pitcherERA,
    baseBALLtest.pitcherH,
    baseBALLtest.pitcherR,
  ]
  
  results = db.session.query(*sel).filter(baseBALLtest.Tm == team).all()

  baseballtest_data= {}
  for result in results:
    baseballtest_data["Tm"] = result[0]
    baseballtest_data["pitcherW"] = result[1]
    baseballtest_data["pitcherL"] = result[2]
    baseballtest_data["pitcherERA"] = result[3]
    baseballtest_data["pitcherH"] = result[4]
    baseballtest_data["pitcherR"] = result[5]

  print(baseballtest_data)
  return jsonify(baseballtest_data)


if __name__ == "__main__":
  app.run()