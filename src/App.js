import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route ,Link  } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
        <NavBar/>
       
          
          <Routes>
          <Route exact path="/"  element={<News country= 'in' key="general" pageSize={6} category="general" />}></Route>
          <Route exact path="/business"  element={<News country= 'in' key="business" pageSize={6} category="business" />} ></Route>
          <Route exact path="/science"  element={<News country= 'in' key="science" pageSize={6} category="science" />} ></Route>
          <Route exact path="/technology"  element={<News country= 'in' key="technology" pageSize={6} category="technology" />} ></Route>
          <Route exact path="/health"  element={<News country= 'in' key="health" pageSize={6} category="health" />} ></Route>
          <Route exact path="/sport"   element={<News country= 'in'  key="sport" pageSize={6} category="sport" />} ></Route>
          <Route exact path="/entertainment" element={<News country= 'in' key="entertainment"  pageSize={6} category="entertainment" />} ></Route>
          </Routes>
          
          
        
        </Router>
      </>
    )
  }
}
