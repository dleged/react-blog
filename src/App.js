import React, { Component } from 'react';
import logo from './logo.svg';
import './style/App.css';
import Header from './component/header';
import Content from './component/content';//博客列表和分页组件
import BasicProfile from './component/basic-profile'//个人基本资料


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="blog-main">
            <div className="blog-content">
                <Content />
                <BasicProfile />
            </div>
        </div>
      </div>
    );
  }
}

export default App;
