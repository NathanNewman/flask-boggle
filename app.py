from flask import Flask, render_template, request, session
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "SHHHHHHHHHHH SEEKRIT"
boggle_game = Boggle()
game_board = []


@app.route('/')
def load_home():
    """Loads the web page and game."""
    render_template("index.html")
    return load_board()


@app.route('/check-word')
def check_word():
    """Receives the guessed word from script.js and calls the check_valid_word function."""
    word = request.args["text"]
    board = game_board
    if board == []:
        return "board is not set"
    return boggle_game.check_valid_word(board, word)


def load_board():
    """Loads the game board. Also displays the number of times the game is played."""
    board = boggle_game.make_board()
    if "count" not in session:
        session["count"] = 0
    num = session["count"]
    global game_board
    game_board = board
    return render_template("board.html", board=board, y=-1, x=-1, count=num)


@app.route('/recordscore', methods=["POST"])
def record_score():
    """Records the score if it is a new high score. Also counts the number of times the game is played."""
    score = request.json.get('score', 0)
    session["count"] += 1
    if "score" in session:
        if score > session["score"]:
            session["score"] = score
            return str(score)
    else:
        session["score"] = score
    return str(session["score"])


@app.route('/highscore')
def high_score():
    if 'score' in session:
        return str(session["score"])
    
    """Returns the high score."""
    return '0'
