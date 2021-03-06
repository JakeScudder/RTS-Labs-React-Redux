import React, { Component } from "react";
//components
import SearchResults from "./components/SearchResults";
import SearchForm from "./components/SearchForm";

//Redux
import { Provider } from "react-redux";
import store from "./store";

import logo from "./hackerLogo.png";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  //When component mounts, API is fetched.
  componentDidMount() {
    this.fetchResults();
  }

  //API fetch function (For Front Page News Display)
  fetchResults = (query) => {
    //Declare searchQuery variable, if user has not entered any search terms
    //If no query is provided, webpage will load up the front page news, otherwise search api will be fetched with query
    if (!query) {
      fetch(`https://hn.algolia.com/api/v1/search?tags=front_page`)
        .then((res) => res.json())
        .then((data) => this.setState({ results: data.hits }));
    } else {
      fetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => this.setState({ results: data.hits }));
    }
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Hacker News</h2>
          </header>
          <div id="form-results-container">
            <SearchForm handleSearch={this.fetchResults} />
            <SearchResults data={this.state.results} />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
