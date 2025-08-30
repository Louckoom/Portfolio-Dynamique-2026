import os
from flask import Flask, render_template, jsonify

# Importation des données depuis le nouveau dossier 'data'
from Data.data import projects
from Data.datamood import mood_data

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, '..', 'templates'),
    static_folder=os.path.join(BASE_DIR, '..', 'static')
)

@app.route('/')
def home():
    return render_template('index.html', projects=projects)

@app.route('/moodboard')
def moodboard():
    return render_template('moodboard.html')

@app.route('/api/moodboard/<mood>')
def get_moodboard(mood):
    if mood in mood_data:
        return jsonify(mood_data[mood])
    else:
        return jsonify({'error': 'Mood not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)