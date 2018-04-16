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

 // render(
 //     <Provider store={store}>
 //        <Router history={browserHistory}>
 //          <Route path='Login' component={Login} />
 //          <Route path='/' component={App}>
 //              <IndexRoute component={Index}/>
 //              <Route path='LearnCenter' component={LearnCenter}/>
 //              <Route path='ArticleDetail/:id' component={ArticleDetail}/>
 //          </Route>
 //          <Route path='/404' component={NotFoundPage} />
 //          <Redirect from='*' to='/404' />
 //        </Router>
 //     </Provider>,
 //     document.getElementById('root')
 // );

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

(function(){
  const t = window.performance && performance.timing;
  if (!t) {
    return;
  }
  const loadTime = (t.loadEventEnd - t.navigationStart) / 1000;
  console.log(`This page loaded in ${loadTime} seconds`);
}())

export default App;
