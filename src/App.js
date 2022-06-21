import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  
  const pageSize=9;
  const apiKey=process.env.REACT_APP_NEWS_API2;
  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
      <Navbar/>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
      <Switch>
        <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="/" pageSize={pageSize} country="in" title="NewsMonkey - Get your daily dose of news for free!"/>} />
        <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" title="Business" category="business"/>} />
        <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" title="Entertainment" category="entertainment"/>} />
        <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" title="General" category="general"/>} />
        <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" title="Health" category="health"/>} />
        <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" title="Science" category="science"/>} />
        <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" title="Sports" category="sports"/>} />
        <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" title="Technology" category="technology"/>} />
      </Switch>
      </Router>
    </div>
  )
}

export default App;