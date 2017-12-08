import React, { Component } from "react";
import API from "../../utils/API";
import Main from "../../components/Main";
import {Delete} from "../../components/Delete";
import {Input, Form} from "../../components/Form";
import {Saved, Savebtn, Saveditems} from "../../components/Saved";
import {Searched, Searcheditems} from "../../components/Searched";
import axios from "axios";

class Articles extends Component {

	state = {
		topic: "food",
		begindate: "20171201",
		enddate:"20171205",
		books: [],
		articles: [],
		savedarticles: [],
	    title: "testing",
	    author: "",
	    synopsis: "",
	    testing: ""
	};

//functions go here

	componentDidMount() {
    	// this.loadBooks();
    	this.loadArticles();
    	this.getArticles3();
  	}
  	
  	getArticles3 = event => {
  		let self = this;
	    axios({
	      url:'https://api.nytimes.com/svc/search/v2/articlesearch.json',
	      params:{ 'api-key': "7ca74794a0a64d579de04b287793ce32",
	            'q': this.state.topic,
	            'begin_date': this.state.begindate,
	            'end_date': this.state.enddate}
	    })
	      .then(function(response) {	
	      // console.log(response);
	      console.log(response.data.response.docs);
	      self.setState({articles: response.data.response.docs})
	    });
	};

	loadArticles = () => {
		API.getArticles()
		  .then(res =>
		    this.setState({ articles: res.data, title: "", author: "", synopsis: "" }, function(){
		    	// console.log(this.state);
		    }),
		  )
		  .catch(err => console.log(err));
	};

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

	handleFormSubmitArticle = (event) => {

		console.log(event);

		if (true) {
			console.log(event)
		  API.saveArticle({
		    headline: event
		    // url: this.state.author
		    // date: this.state.synopsis
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
  
        <Form>
        	<Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
             />
             <Input
                value={this.state.begindate}
                onChange={this.handleInputChange}
                name="begindate"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.enddate}
                onChange={this.handleInputChange}
                name="enddate"
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
              <button className='submit' onClick={this.getArticles2}>NYT Submit</button>
              <button className='submit' onClick={this.getArticles3}>Article3</button>
        </Form>
        <Searched>
   			{this.state.articles.map((article,i) =>  (
       			<Searcheditems key={i}>
       				<span>{article.headline.main}</span>
       				<Savebtn value={article.headline.main} onClick={() => this.handleFormSubmitArticle(article.headline.main)}/>
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