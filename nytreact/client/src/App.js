import React, { Component } from 'react';
import Articles from "./pages/Articles";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Basic Header
        </header>
 
        <Articles />
      </div>
    );

  }
}

export default App;