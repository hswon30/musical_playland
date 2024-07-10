import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WhoSangItBetter from './pages/WhoSangItBetter';
import WordCloudPage from './pages/WordCloudPage';
import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
			path="/"
			render={() => (
				<HomePage />
		)}/>
         
        <Route exact
			path="/search"
			render={() => (
				<SearchPage />
		)}/>
		
		<Route exact
			path="/compare"
			render={() => (
				<WhoSangItBetter />
		)}/>

		<Route exact
			path="/wordcloud"
			render={() => (
				<WordCloudPage />
		)}/>

		<Route exact
			path="/about"
			render={() => (
				<AboutPage />
		)}/>

      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

