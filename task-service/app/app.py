from flask import Flask, jsonify

app = Flask(__name__)

tasks = [
    {'id': 1, 'title': 'Faire les courses', 'completed': False},
    {'id': 2, 'title': 'Lire un livre', 'completed': False}
]

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)