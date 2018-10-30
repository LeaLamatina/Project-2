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
baseBALLteam = Base.classes.BASEBALLtest
baseBALLbatter = Base.classes.mlbBatterALL
baseBALLpitcher = Base.classes.mlbPitcherALL

# connecting app to homepage
@app.route("/")
def index():
  return render_template("index.html")

@app.route("/teams")
def teams():
  stmt = db.session.query(baseBALLteam).statement
  df = pd.read_sql_query(stmt, db.session.bind)
  # return a list of the teamnames
  return jsonify(list(df['Tm']))

@app.route("/baseballteam/<team>")
def BASEBALLtest(team):
  sel = [
    baseBALLteam.Tm,
    baseBALLteam.whole_name,
    baseBALLteam.start_year,
    baseBALLteam.world_championships,
  ]
  results = db.session.query(*sel).filter(baseBALLteam.Tm == team).all()

  baseballteam_data= {}
  for result in results:
    baseballteam_data["Tm"] = result[0]
    baseballteam_data["whole_name"] = result[1]
    baseballteam_data["start_year"] = result[2]
    baseballteam_data["world_championships"] = result[3]

  print(baseballteam_data)
  return jsonify(baseballteam_data)

# Team Stats
@app.route("/baseballstat/teamstat.json")
def baseballteamstat():
  stmt = db.session.query(baseBALLteam).statement
  df = pd.read_sql_query(stmt, db.session.bind)
  # return a list of the teamnames
  
  print(df.columns.values)
  print(df.shape[1])

  baseballteam_data= {}
  for i in range(df.shape[1]):
    print(i)
    colname = df.columns.values[i]
    print(colname)
    print(list(df[colname]))
    baseballteam_data[colname] = list(df[colname])
  
  print(baseballteam_data)
  return jsonify(baseballteam_data)

# Batter Stats
@app.route("/baseballstat/batterstat.json")
def baseballbatterstat():
  stmt = db.session.query(baseBALLbatter).statement
  df = pd.read_sql_query(stmt, db.session.bind)
  # return a list of the teamnames
  
  print(df.columns.values)
  print(df.shape[1])

  baseballbatter_data= {}
  for i in range(df.shape[1]):
    print(i)
    colname = df.columns.values[i]
    print(colname)
    print(list(df[colname]))
    baseballbatter_data[colname] = list(df[colname])
  
  print(baseballbatter_data)
  return jsonify(baseballbatter_data)

# Pitcher Stat
@app.route("/baseballstat/pitcherstat.json")
def baseballpitcherstat():
  stmt = db.session.query(baseBALLpitcher).statement
  df = pd.read_sql_query(stmt, db.session.bind)
  # return a list of the teamnames
  
  print(df.columns.values)
  print(df.shape[1])

  baseballpitcher_data= {}
  for i in range(df.shape[1]):
    print(i)
    colname = df.columns.values[i]
    print(colname)
    print(list(df[colname]))
    baseballpitcher_data[colname] = list(df[colname])
  
  print(baseballpitcher_data)
  return jsonify(baseballpitcher_data)

if __name__ == "__main__":
  app.run()