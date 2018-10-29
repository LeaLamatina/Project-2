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
# app = Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Resources/baseballdatabase.db"
# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()

# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# print('check')
# # Save references to each table
# baseBatting = Base.classes.TmStdBatting
# basePitching= Base.classes.TmStdPitching



# TeamSalaries = Base.classes.TmSalaries

# # connecting app to homepage
# @app.route("/")
# def index():
#   return render_template("index.html")

# @app.route("/teams")
# def teams():
#   stmt = db.session.query(baseBatting).statement
#   df = pd.read_sql_query(stmt, db.session.bind)
#   # return a list of the teamnames
#   return jsonify(list(df['Tm'][0:len(df)-1]))

# @app.route("/baseball/<team>")
# def BaseBatting(team):
#   sel = [
#     baseBatting.Tm,
#     baseBatting.BA,
#     baseBatting.OBP,
#     baseBatting.SLG,
#     baseBatting.OPS,
    
#   ]
  
#   results = db.session.query(*sel).filter(baseBatting.Tm == team).all()

#   baseballbatting_data= {}
#   for result in results:
#     baseballbatting_data["Tm"] = result[0]
#     baseballbatting_data["BA"] = result[1]
#     baseballbatting_data["OBP"] = result[2]
#     baseballbatting_data["SLG"] = result[3]
#     baseballbatting_data["OPS"] = result[4]
    

#   print(baseballbatting_data)
#   return jsonify(baseballbatting_data)


# if __name__ == "__main__":
#   app.run() 
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Resources/baseballdatabasetest.db"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(db.engine, reflect=True)

print('check')
# Save references to each table
baseBALLtest = Base.classes.BASEBALLtest


# connecting app to homepage
@app.route("/")
def index():
  return render_template("index.html")

@app.route("/teams")
def teams():
  stmt = db.session.query(baseBALLtest).statement
  df = pd.read_sql_query(stmt, db.session.bind)
  # return a list of the teamnames
  return jsonify(list(df['Tm']))

@app.route("/baseballteam/<team>")
def BASEBALLtest(team):
  sel = [
    baseBALLtest.Tm,
    baseBALLtest.whole_name,
    baseBALLtest.start_year,
    baseBALLtest.world_championships,
  ]
  results = db.session.query(*sel).filter(baseBALLtest.Tm == team).all()

  baseballtest_data= {}
  for result in results:
    baseballtest_data["Tm"] = result[0]
    baseballtest_data["whole_name"] = result[1]
    baseballtest_data["start_year"] = result[2]
    baseballtest_data["world_championships"] = result[3]

  print(baseballtest_data)
  return jsonify(baseballtest_data)

@app.route("/baseballstat/<team>.json")
def BASEBALLteamstat(team):
  sel = [
    baseBALLtest.Tm,
    baseBALLtest.Bat_BA, 
    baseBALLtest.Bat_OBP,
    baseBALLtest.BatSLG,
    baseBALLtest.Bat_OPS,
  ]
  results = db.session.query(*sel).filter(baseBALLtest.Tm == team).all()

  baseballstat_data= {}
  for result in results:
    baseballstat_data["Tm"] = result[0]
    baseballstat_data["Bat_BA"] = result[1]
    baseballstat_data["Bat_OBP"] = result[2]
    baseballstat_data["BatSLG"] = result[3]
    baseballstat_data["Bat_OPS"] = result[4]
  print(baseballstat_data)
  return jsonify(baseballstat_data)

if __name__ == "__main__":
  app.run()