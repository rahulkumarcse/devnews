import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey=process.env.REACT_APP_API_KEY
  state = {
    progress : 0 
  }
  setProgress =  (elem) =>{
    
    this.setState({
      progress : elem
    })
    console.log("updating progrees to "+ this.state.progress)
  }
  render() {
    return (
      <>
        <Router>
        
        <NavBar/>
        <LoadingBar
        color='#f11946'
        
        progress={this.state.progress}
        
      />
          <Routes>
          <Route exact path="/"  element={<News  setProgress={this.setProgress }   apiKeey={this.apiKey}   country= 'in' key="general" pageSize={6} category="general" />}></Route>
          <Route exact path="/business"  element={<News  setProgress={this.setProgress}   apiKeey={this.apiKey}   country= 'in' key="business" pageSize={6} category="business" />} ></Route>
          <Route exact path="/science"  element={<News  setProgress={this.setProgress}   apiKeey={this.apiKey}   country= 'in' key="science" pageSize={6} category="science" />} ></Route>
          <Route exact path="/technology"  element={<News  setProgress={this.setProgress}   apiKeey={this.apiKey}   country= 'in' key="technology" pageSize={6} category="technology" />} ></Route>
          <Route exact path="/health"  element={<News  setProgress={this.setProgress}   apiKeey={this.apiKey}   country= 'in' key="health" pageSize={6} category="health" />} ></Route>
          <Route exact path="/sport"   element={<News  setProgress={this.setProgress}   apiKeey={this.apiKey}   country= 'in'  key="sport" pageSize={6} category="sport" />} ></Route>
          <Route exact path="/entertainment" element={<News  setProgress={this.setProgress}   apiKeey={this.apiKey}   country= 'in' key="entertainment"  pageSize={6} category="entertainment" />} ></Route>
          </Routes>
        </Router>
      </>
    )
  }
}
