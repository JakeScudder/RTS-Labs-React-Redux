import React, { Component } from "react";
import { Provider } from "react-redux";
import logo from "./hackerLogo.png";
import "./App.css";

//components
import SearchResults from "./components/SearchResults";
import SearchForm from "./components/SearchForm";

//Redux
import store from "./store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.fetchResults();
  }

  //API fetch function
  fetchResults = (query) => {
    console.log(this.props);
    let searchQuery;
    if (!query) {
      searchQuery = "bitcoin";
    } else {
      searchQuery = query;
    }

    fetch(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => this.setState({ results: data.hits }));
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Hacker News</h1>
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
