import React, { Component } from 'react';
import './style/App.css';
import Header from './component/header';
import Tag from './component/tag';//博客标签
import List from './component/list';//最新文章
import Cover from './component/cover';
import Loading from './component/loading';
import {
  BrowserRouter as Router,Route
} from 'react-router-dom';

import Loadable from 'react-loadable';

let Detail = Loadable({
  loader: () => import('./component/detail'),
  loading: Loading
})

let Content = Loadable({
  loader: () => import('./component/content'),
  loading: Loading
})

class App extends Component {
  render() {
    return (
        <Router path='/'>
          <div className="App">
                <Header />
                <div className="blog-main">
                    <Cover src='../../images/module-9.jpg' />
                    <section className="module">
                      <div className="blog-content row">
                          <div className="col-lg-8">
                            <Route exact path='/' component={Content}/>
                            <Route path='/index' component={Content}/>
                            <Route path='/listDetail/:id' component={Detail} />
                          </div>
                          <div className="col-lg-4">
                            <Tag list={['react','es6','webpack','javascript','css','html']}/>
                            <List title="最新文章 🆕 " />
                          </div>
                      </div>
                    </section>
                </div>
          </div>
       </Router>
    );
  }
}

(function(){
  const t = window.performance && performance.timing;
  if (!t) {
    return;
  }
  const loadTime = (t.loadEventEnd - t.navigationStart) / 1000;
  console.log(`This page loaded in ${loadTime} seconds`);
}())

export default App;
