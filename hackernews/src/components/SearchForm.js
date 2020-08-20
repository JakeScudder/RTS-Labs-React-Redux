import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import { searchNews } from "../actions/searchActions";

class SearchForm extends Component {
  //Function handles the onChange event and sends the target value to the searchNews function in the searchReducer
  handleChange = (e) => {
    this.props.searchNews(e.target.value);
  };

  //Function handles the submit event
  //Sends this.props.text(From Redux State) through the handleSearch prop to the App.js file
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.props.text);
  };

  render() {
    return (
      <div id="search-bar-container">
        <form onSubmit={this.handleSubmit}>
          <div id="form-container">
            <input
              id="form-input"
              placeholder="What are you looking for?"
              type="text"
              name="query"
              onChange={this.handleChange}
            ></input>
          </div>
          <br />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  text: state.news.text,
});

export default connect(mapStateToProps, { searchNews })(SearchForm);
