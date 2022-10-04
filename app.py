from flask import Flask, render_template, request, session
from boggle import Boggle
import jinja2

app = Flask(__name__)
boggle_game = Boggle()
game_board = []


@app.route('/')
def load_home():
    render_template("index.html")
    return load_board()


@app.route('/check-word')
def check_word():
    word = request.args["text"]
    board = game_board
    return boggle_game.check_valid_word(board, word)


def load_board():
    board = boggle_game.make_board()
    global game_board
    game_board = board
    return render_template("board.html", board=board, y=-1, x=-1)
