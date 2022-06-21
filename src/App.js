import './App.css';
import React, { Component, useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  
  pageSize=9;
  apiKey=process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress}) 
  }
  
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Switch>
          <Route exact path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="/" pageSize={this.pageSize} country="in" title="NewsMonkey - Get your daily dose of news for free!"/>} />
          <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" title="Business" category="business"/>} />
          <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" title="Entertainment" category="entertainment"/>} />
          <Route exact path="/general" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" title="General" category="general"/>} />
          <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" title="Health" category="health"/>} />
          <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" title="Science" category="science"/>} />
          <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" title="Sports" category="sports"/>} />
          <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" title="Technology" category="technology"/>} />
        </Switch>
        </Router>
      </div>
    )
  }
}

