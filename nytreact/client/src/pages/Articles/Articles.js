import React, { Component } from "react";
import API from "../../utils/API";

class Articles extends Component {

	state = {
		books: [],
    title: "testing",
    author: "",
    synopsis: ""
	};

//functions go here

	componentDidMount() {
    	this.loadBooks();
  	}

	loadBooks = () => {
		API.getBooks()
		  .then(res =>
		    this.setState({ books: res.data, title: "", author: "", synopsis: "" }, function(){
		    	console.log(this.state);
		    }),
		  )
		  .catch(err => console.log(err));
	};

	// // Deletes a book from the database with a given id, then reloads books from the db
	// deleteBook = id => {
	// 	API.deleteBook(id)
	// 	  .then(res => this.loadBooks())
	// 	  .catch(err => console.log(err));
	// };

	// 	// Handles updating component state when the user types into the input field
	// handleInputChange = event => {
	// 	const { name, value } = event.target;
	// 	this.setState({
	// 	  [name]: value
	// 	});
	// };

	// 	// When the form is submitted, use the API.saveBook method to save the book data
	// 	// Then reload books from the database
	// handleFormSubmit = event => {
	// 	event.preventDefault();
	// 	if (this.state.title && this.state.author) {
	// 	  API.saveBook({
	// 	    title: this.state.title,
	// 	    author: this.state.author,
	// 	    synopsis: this.state.synopsis
	// 	  })
	// 	    .then(res => this.loadBooks())
	// 	    .catch(err => console.log(err));
	// 	}
	// };

  render() {
    return (
      <div className="App">
       	{console.log(this.state)}
        <p className="App-intro">
          This is the Article Page.
        </p>
      </div>
    );
  }
}

export default Articles;