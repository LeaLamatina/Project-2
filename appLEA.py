# python app to parse csv files in slqlite server
import os
import csv

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


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
try:
  with open("ConsolidatedPlayers.csv") as PlayerStats:
    players = list(csv.reader(PlayerStats))
except IOError as e:
  print >>sys.stderr, "error: %s" % (e)
  sys.exit(1)

# Team_Metadata = Base.classes.team_metadata
# Team  = Base.classes.team

# ===================
# Flask Setup
# ===================
app = Flask(__name__)

# connecting app to homepage
@app.route("/")
def index():
  return render_template("index.html")

# returns team names to be populated into dropdowns
@app.route("/teams")
def teams():
  #@TODO - EVERYTHING

if __name__ == "__main__":
  app.run()