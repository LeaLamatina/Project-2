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

# connecting app to homepage
@app.route("/")
def index():
  return render_template("index.html")

if __name__ == "__main__":
  app.run()