import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/blog.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
