import React, { Component } from "react";
import "./app.scss";
//

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuote: {},
      quotes: [],
      colorClassNum: 6,
      loading: false
    };
    this.setNewQuote = this.setNewQuote.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.getNewNumber = this.getNewNumber.bind(this);
  }
  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch(
      "https://gist.githubusercontent.com/adarshnanwani/2d88f96dd03444d0544cc6c7e049dfd9/raw/e4a3e182e5a3641900052385919e23b06bd9cd97/quotes.json"
    )
      .then(response => response.json())
      .then(data => {
        if (data.quotes && data.quotes.length > 0) {
          this.setState({
            quotes: data.quotes,
            currentQuote: data.quotes[0],
            loading: false
          });
          this.handleTransitionEnd();
        }
      })
      .catch(err => {
        this.setState({
          loading: false
        });
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

  getNewNumber() {
    let num = Math.floor(Math.random() * 12);
    if (num === 0 || num === this.state.colorClassNum) {
      return this.getNewNumber();
    }
    return num;
  }

  handleTransitionEnd(e) {
    let num = this.getNewNumber();
    this.setState({
      colorClassNum: num
    });
  }

  render() {
    let containerClasses = `container container--color${this.state.colorClassNum}`;
    let buttonClasses = `button button-background--color${this.state.colorClassNum}`;

    let quote = (
      <section id="loading-text">Looking for the best quotes...</section>
    );
    if (!this.state.loading) {
      quote = (
        <>
          <section id="text">" {this.state.currentQuote.quote}" </section>
          <section id="author">- {this.state.currentQuote.author}</section>
        </>
      );
    }

    return (
      <div
        className={containerClasses}
        onTransitionEnd={this.handleTransitionEnd}
      >
        <div id="quote-box">
          <div id="quote">{quote}</div>
          <div id="actions">
            <button
              id="new-quote"
              onClick={this.setNewQuote}
              className={buttonClasses}
            >
              New Quote
            </button>
            <a
              id="tweet-quote"
              className={buttonClasses}
              href={`https://twitter.com/intent/tweet?text=${this.state.currentQuote.quote} - ${this.state.currentQuote.author}`}
              target="_blank"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="promotion">
          <span>
            Made with <i className="fas fa-heart" style={{ color: "red" }}></i>{" "}
            by Ady
          </span>
        </div>
      </div>
    );
  }
}
