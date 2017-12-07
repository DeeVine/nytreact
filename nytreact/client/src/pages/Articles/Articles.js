import React, { Component } from "react";
import API from "../../utils/API";
import Main from "../../components/Main";
import {Delete} from "../../components/Delete";
import {Input, Form} from "../../components/Form";
import {Saved,Saveditems} from "../../components/Saved";
import {Searched, Searcheditems} from "../../components/Searched";

class Articles extends Component {

	state = {

		topic: "",
		startyear: "",
		endyear:"",

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
		    	// console.log(this.state);
		    }),
		  )
		  .catch(err => console.log(err));
	};

	// Deletes a book from the database with a given id, then reloads books from the db
	deleteBook = id => {
		API.deleteBook(id)
		  .then(res => this.loadBooks())
		  .catch(err => console.log(err));
	};

		// Handles updating component state when the user types into the input field
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		});
	};

	// 	// When the form is submitted, use the API.saveBook method to save the book data
	// 	// Then reload books from the database
	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.title && this.state.author) {
		  API.saveBook({
		    title: this.state.title,
		    author: this.state.author,
		    synopsis: this.state.synopsis
		  })
		    .then(res => this.loadBooks())
		    .catch(err => console.log(err));
		}
	};

  render() {
    return (
      <div className="App">
       	{console.log(this.state)}
       	

        <p className="App-intro">
          This is the Article Page.
        </p>
        <Main />
        <Form>
        	<Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
             />
             <Input
                value={this.state.startyear}
                onChange={this.handleInputChange}
                name="startyear"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.endyear}
                onChange={this.handleInputChange}
                name="endyear"
                placeholder="End Year (required)"
              />
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
             />
             <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <button className='submit' onClick={this.handleFormSubmit}>Submit</button>
        </Form>
        <Searched>
   			{this.state.books.map(book =>  (
       			<Searcheditems>
       				<span>{book.title}</span>
       				<Delete onClick={() => this.deleteBook(book._id)}/>
       			</Searcheditems>
   			))};	
        </Searched>
       	<Saved>
       		<Saveditems />
       	</Saved>
      </div>
    );
  }
}

export default Articles;