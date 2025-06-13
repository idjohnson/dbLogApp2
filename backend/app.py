from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_db_connection():
    return psycopg2.connect(
        host=os.environ.get("POSTGRES_HOST", "db"),
        database=os.environ.get("POSTGRES_DB", "logapp"),
        user=os.environ.get("POSTGRES_USER", "postgres"),
        password=os.environ.get("POSTGRES_PASSWORD", "postgrespass"),
        port=os.environ.get("POSTGRES_PORT", 5432)
    )

@app.route('/api/logs')
def get_logs():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, body, project, type, date, avatar_src, owner, description, created_at, status FROM logs ORDER BY created_at DESC')
    rows = cur.fetchall()
    columns = [desc[0] for desc in cur.description]
    logs = [dict(zip(columns, row)) for row in rows]
    cur.close()
    conn.close()
    return jsonify(logs)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)