import React, { Component } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const ARRAY_WORDS = [
  "LICORNE",
  "ANTHROPOLOGISTE",
  "POMMINVILLE",
  "ROMARIN",
  "TERRIBLEMENT",
  "SALAMANDRE",
  "TERRORISTE",
  "AEROPORT",
  "HOCKEY",
  "PLANETARIUM",
  "THESAURUS",
  "SHAKESPEARE",
  "LEONARDO DA VINCI",
];

const ALPHABET_CHARS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

class Squarewords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordToGuess: this.generateWord(),
      lettersFound: [],
      wrongChoices: [],
      score: 0,
      nbOfLives: this.props.nbOfLives,
      endGame: false,
    };
    this.baseState = this.state;
  }

  resetGame = () => {
    this.baseState.wordToGuess = this.generateWord();
    this.baseState.score = this.state.score;
    this.setState(this.baseState);
  };

  render() {
    const { wordToGuess, score, nbOfLives, wrongChoices, endGame } = this.state;

    if (!endGame) {
      return (
        <React.Fragment>
          <div>
            <div style={{ marginBottom: "25px" }}>Score : {score} </div>
            <div style={{ marginBottom: "25px" }}>
              {" "}
              Nb d'essais restants : {nbOfLives}
            </div>
            {wordToGuess.map((char) => (
              <div
                style={{
                  display: "inline-block",
                  width: "20px",
                  marginRight: "25px",
                  borderBottom: char !== " " ? "2px solid black" : "",
                  textAlign: "center",
                }}
              >
                {this.displayChar(char)}
              </div>
            ))}
          </div>
          <div>
            {ALPHABET_CHARS.map((char) => (
              <div
                onClick={
                  !wrongChoices.includes(char)
                    ? () => {
                        this.handleClickChoice(char);
                      }
                    : null
                }
                className={this.getClassCharcter(char)}
              >
                {char}
              </div>
            ))}
          </div>
        </React.Fragment>
      );
    } else if (endGame && nbOfLives === 0) {
      return (
        <React.Fragment>
          <p className="losingMsg">Vous avez perdu...Voulez-vous rejouer?</p>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.resetGame}
            size="large"
          >
            Rejouer
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <p className="winningMsg">Vous avez gagné!</p>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.resetGame}
            size="large"
          >
            Continuer
          </Button>
        </React.Fragment>
      );
    }
  }

  displayChar(char) {
    const { lettersFound } = this.state;

    if (lettersFound.includes(char)) {
      return char;
    } else if (char === " ") {
      return " ";
    }
    return "?";
  }

  handleClickChoice(char) {
    let {
      wordToGuess,
      lettersFound,
      nbOfLives,
      wrongChoices,
      endGame,
      score,
    } = this.state;

    if (wordToGuess.includes(char)) {
      lettersFound = lettersFound.concat(char);
    } else {
      nbOfLives--;
      wrongChoices = wrongChoices.concat(char);
    }

    let wordFound = true;

    for (let i = 0; i < wordToGuess.length; i++) {
      if (!lettersFound.includes(wordToGuess[i]) && wordToGuess[i] !== " ") {
        wordFound = false;
      }
    }

    if (wordFound || nbOfLives === 0) {
      endGame = true;
      if (wordFound) {
        score++;
      } else if (nbOfLives === 0) {
        score = 0;
      }
    }
    this.setState({
      lettersFound: lettersFound,
      nbOfLives: nbOfLives,
      wrongChoices: wrongChoices,
      endGame: endGame,
      score: score,
    });
  }

  getClassCharcter(char) {
    const { lettersFound, wrongChoices } = this.state;

    if (lettersFound.includes(char)) {
      return "charFound";
    } else if (wrongChoices.includes(char)) {
      return "wrongChoice";
    } else {
      return "charNotFound";
    }
  }

  generateWord() {
    const word = ARRAY_WORDS[Math.floor(Math.random() * ARRAY_WORDS.length)];
    return [...word];
  }
}

export default Squarewords;
