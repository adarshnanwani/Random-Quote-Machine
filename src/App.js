import React, { Component } from "react";
import "./app.scss";
//
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuote: {},
      quotes: []
    };
    this.setNewQuote = this.setNewQuote.bind(this);
  }
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/adarshnanwani/2d88f96dd03444d0544cc6c7e049dfd9/raw/e4a3e182e5a3641900052385919e23b06bd9cd97/quotes.json"
    )
      .then(response => response.json())
      .then(data => {
        if (data.quotes && data.quotes.length > 0) {
          this.setState({
            quotes: data.quotes,
            currentQuote: data.quotes[0]
          });
        }
      })
      .catch(err => {
        console.log("An error occured while loading quotes.");
      });
  }

  setNewQuote() {
    const newQuote = this.state.quotes[
      Math.floor(Math.random() * this.state.quotes.length)
    ];
    this.setState({
      currentQuote: newQuote
    });
  }

  render() {
    return (
      <div className="container">
        <div id="quote-box">
          <div id="quote">
            <section id="text">{this.state.currentQuote.quote}</section>
            <section id="author">{this.state.currentQuote.author}</section>
          </div>
          <div id="actions">
            <button id="new-quote" onClick={this.setNewQuote}>
              New Quote
            </button>
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${this.state.currentQuote.quote} - ${this.state.currentQuote.author}`}
              target="_blank"
            >
              Tweet
            </a>
          </div>
        </div>
      </div>
    );
  }
}
