import React, { Component } from "react";
import API from "../../utils/API";

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
		articles: [],
		savedarticles: [],
	};

//functions go here

	componentDidMount() {
    	this.getArticles();
    	this.loadArticles();
  	}
  	
  	getArticles = event => {
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
		    this.setState({ savedarticles: res.data, title: "", author: "", synopsis: "" }, function(){
		    	// console.log(this.state);
		    }),
		  )
		  .catch(err => console.log(err));
	};

	// Deletes a book from the database with a given id, then reloads books from the db
	deleteArticle = id => {
		API.deleteArticle(id)
		  .then(res => this.loadArticles())
		  .catch(err => console.log(err));
	};

		// Handles updating component state when the user types into the input field
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		});
	};

	saveArticle = (headline, url) => {
		if (true) {
		  API.saveArticle({
		    headline: headline,
		    url: url
		    // date: this.state.synopsis
		  })
		    .then(res => this.loadArticles())
		    .catch(err => console.log(err));
		}
	};

  render() {
    return (
      <div className="App">
       	{console.log(this.state)}
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
              <button className='submit' onClick={this.getArticles3}>Search Articles</button>
        </Form>
        <Searched>
   			{this.state.articles.map((article,i) =>  (
       			<Searcheditems key={i}>
       				<span>{article.headline.main}</span>
       				<Savebtn value={article.headline.main} onClick={() => this.saveArticle(article.headline.main, article.web_url)}/>
       			</Searcheditems>
   			))}	
        </Searched>
       	<Saved>
       		{this.state.savedarticles.map((article,i) =>  (
       			<Saveditems key={i}>
       				<span>{article.headline}</span>
       				<span>{article.date}</span>
       				<Delete value={article.headline} onClick={() => this.deleteArticle(article._id)}/>
       			</Saveditems>
   			))}	
       	</Saved>
      </div>
    );
  }
}

export default Articles;