# python app to parse csv files in slqlite server

import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

import mysql.connector

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# ===================
#  Database Setup
# ===================

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/mlb-stats.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Samples_Metadata = Base.classes.sample_metadata
Samples = Base.classes.samples

# mysql
# mydb = mysql.connector.connect(
#   host="localhost",
#   user="jwh.laforest",
#   passwd="waihung",
#   database="baseball"
# )

# print(mydb)

# mycursor = mydb.cursor()

# mycursor.execute("SELECT * FROM baseball.nlteamstats")

# data = mycursor.fetchall()

# for x in data:
#   print(x)

# connecting app to homepage
@app.route("/")
def index():
  return render_template("index.html")

@app.route("/teams")
def teams():
  stmt = db.session.query(Samples).statement
  df = pd.read_sql_query(stmt, db.seesion.bind)

  return jsonify(list(df.coloumns)[2:])

@app.route("/metadata/<sample>")
def sample_metadata(sample):
  sel = [
    Samples_Metadata.sample,
    Samples_Metadata.Tm,
    Samples_Metadata.W,
    Samples_Metadata.L,
    Samples_Metadata.ERA,
    Samples_Metadata.H,
    Samples_Metadata.R,
    Samples_Metadata.HR,
    Samples_Metadata.WAR
  ]

  results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

  sample_metadata = {}
  for result in results:
    sample_metadata["sample"] = result[0]
    sample_metadata["Team"] = result[1]
    sample_metadata["Wins"] = result[26]
    sample_metadata["Losses"] = result[27]
    sample_metadata["ERA"] = result[29]
    sample_metadata["Hits"] = result[39]
    sample_metadata["Runs"] = result[40]
    sample_metadata["Home Runs"] = result[42]
    sample_metadata["WAR"] = result[86]

  print(sample_metadata)
  return jsonify(sample_metadata)

@app.route("/samples/<sample>")
def samples(sample):
  stmt = db.session.query(Samples).statement
  df = pd.read_sql_query(stmt, db.session.bind)

  sample_data = df.loc[df[sample] > 1, ["bball_id", "bball_label", sample]]
  data = {
    "bball_id": sample_data.bball_id.values.tolist(),
    "sample_values"; sample_data[sample].values.tolist(),
    "bball_label": sample_data.bball_label.tolist(),
  }
  return jsonify(data)

if __name__ == "__main__":
  app.run()