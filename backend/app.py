import os
import mysql.connector
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Set up environment variables
app.config['MYSQL_USER'] = "ben"
app.config['MYSQL_PASSWORD'] = ""
app.config['MYSQL_HOST'] = "34.85.227.21"
app.config['MYSQL_DB'] = "ec"
# app.config['MYSQL_UNIX_SOCKET'] = os.environ['MYSQL_UNIX_SOCKET']
app.config['GOOGLE_APPLICATION_CREDENTIALS'] = './music-trading-381415-7d8a8712d53d.json'

@app.route('/')
def hello_world():
    # Connect to the database
    cnx = mysql.connector.connect(user=app.config['MYSQL_USER'],
                                   password=app.config['MYSQL_PASSWORD'],
                                   host=app.config['MYSQL_HOST'],
                                   database=app.config['MYSQL_DB'],
                                   autocommit=True)
    cursor = cnx.cursor()

    # Execute a query
    query = ("SELECT * FROM Owned_CD")
    cursor.execute(query)
    rows = cursor.fetchall()

    # Convert the result to JSON format
    results = []
    for row in rows:
        results.append(row)
    return jsonify(results)

@app.route('/vinyls')
def vinyls():
    cnx = mysql.connector.connect(user=app.config['MYSQL_USER'],
                                   password=app.config['MYSQL_PASSWORD'],
                                   host=app.config['MYSQL_HOST'],
                                   database=app.config['MYSQL_DB'],
                                   autocommit=True)
    cursor = cnx.cursor()

    # Execute a query
    query = ("SELECT * FROM Owned_Vinyl")
    cursor.execute(query)
    rows = cursor.fetchall()

    # Convert the result to JSON format
    results = []
    for row in rows:
        results.append({'ownedMusicID': row[0], 'userID': row[1], 'Name': row[2], 'Artist': row[3], 'Genre': row[4], 'Size': row[5], 'Thumbnail': row[6]})
    return jsonify(results)

@app.route('/cds')
def cds():
    cnx = mysql.connector.connect(user=app.config['MYSQL_USER'],
                                   password=app.config['MYSQL_PASSWORD'],
                                   host=app.config['MYSQL_HOST'],
                                   database=app.config['MYSQL_DB'],
                                   autocommit=True)
    cursor = cnx.cursor()

    # Execute a query
    query = ("SELECT * FROM Owned_CD")
    cursor.execute(query)
    rows = cursor.fetchall()

    # Convert the result to JSON format
    results = []
    for row in rows:
        results.append({'ownedMusicID': row[0], 'userID': row[1], 'Name': row[2], 'Artist': row[3], 'Genre': row[4], 'CDtype': row[5], 'Thumbnail': row[6]})
    return jsonify(results)

@app.route('/cassettes')
def cassettes():
    cnx = mysql.connector.connect(user=app.config['MYSQL_USER'],
                                   password=app.config['MYSQL_PASSWORD'],
                                   host=app.config['MYSQL_HOST'],
                                   database=app.config['MYSQL_DB'],
                                   autocommit=True)
    cursor = cnx.cursor()

    # Execute a query
    query = ("SELECT * FROM Owned_Cassette")
    cursor.execute(query)
    rows = cursor.fetchall()

    # Convert the result to JSON format
    results = []
    for row in rows:
        results.append({'ownedMusicID': row[0], 'userID': row[1], 'Name': row[2], 'Artist': row[3], 'Genre': row[4], 'TapeType': row[5], 'Thumbnail': row[6]})
    return jsonify(results)

@app.route('/all')
def all():
    cnx = mysql.connector.connect(user=app.config['MYSQL_USER'],
                                   password=app.config['MYSQL_PASSWORD'],
                                   host=app.config['MYSQL_HOST'],
                                   database=app.config['MYSQL_DB'],
                                   autocommit=True)
    cursor = cnx.cursor()

    # Execute a query
    query = ("SELECT * FROM Owned_CD UNION SELECT * FROM Owned_Vinyl UNION SELECT * FROM Owned_Cassette")
    cursor.execute(query)
    rows = cursor.fetchall()

    # Convert the result to JSON format
    results = []
    for row in rows:
        results.append({'ownedMusicID': row[0], 'userID': row[1], 'Name': row[2], 'Artist': row[3], 'Genre': row[4], 'Type': row[5], 'Thumbnail': row[6]})
    return jsonify(results)


if __name__ == '__main__':
    app.run(host='localhost', port=3000)
