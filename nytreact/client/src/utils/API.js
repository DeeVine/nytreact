import axios from "axios";

export default {
  // // Gets all books
  // getBooks: function() {
  //   return axios.get("/api/books");
  // },

  getArticles: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // },

  //Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/books", articleData);
  },

  //request data from nytimes
  getArticles2: function(topic, begin, end) {
    axios({
      url:'https://api.nytimes.com/svc/search/v2/articlesearch.json',
      params:{ 'api-key': "7ca74794a0a64d579de04b287793ce32",
            'q': topic,
            'begin_date': begin,
            'end_date': end}
    })
      .then(function(response) {
      console.log(response);
    });
  }

  // getArticles: function () {
  //   return axios({
  //     url:'https://api.nytimes.com/svc/search/v2/articlesearch.json',
  //     params:{ 'api-key': "7ca74794a0a64d579de04b287793ce32",
  //           'q': "food",
  //           'begin_date': "20171201",
  //           'end_date': "20171205"},
  //     responseType:'stream'
  //   })
  //     .then(function(response) {
  //     console.log(response);
  //   });
};
