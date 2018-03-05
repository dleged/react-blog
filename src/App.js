import React, { Component } from 'react';
import logo from './logo.svg';
import './style/App.css';
import Header from './component/header';
import Content from './component/content';//博客列表和分页组件
import Detail from './component/detail';//博客详情
import BasicProfile from './component/basic-profile'//个人基本资料
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
                    <div className="blog-content">
                        <Route exact path='/' component={Content}/>
                        <Route path='/listDetail.html/:id' component={Detail} />
                        <BasicProfile />
                    </div>
                </div>

          </div>
       </Router>
    );
  }
}

export default App;
