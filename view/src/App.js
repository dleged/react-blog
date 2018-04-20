import React, { Component } from 'react';
import './style/App.css';
import Header from './component/header';
import Content from './component/content';//博客列表和分页组件
import Detail from './component/detail';//博客详情
import Tag from './component/tag';//博客标签
import List from './component/list';//最新文章
import Cover from './component/cover';
// import BasicProfile from './component/basic-profile'//个人基本资料

import {
    BrowserRouter as Router,
    Route,
 } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router path='/'>
          <div className="App">
                <Header />
                <div className="blog-main">
                    <Cover src='../../images/module-9.jpg' />
                    <section class="module">
                      <div className="blog-content row">
                          <div className="col-lg-8">
                            <Route exact path='/' component={Content}/>
                            <Route path='/index' component={Content}/>
                            <Route path='/listDetail/:id' component={Detail} />
                          </div>
                          <div className="col-lg-4">
                            <Tag />
                            <List title="最新文章" />
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
