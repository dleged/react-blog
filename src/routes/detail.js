import React, { Component } from 'react';
import {Router,hashHistory,Link} from 'react-router';
import logo from './logo.svg';
import './style/App.css';
import Header from './component/header';
import Detail from '../component/detail';

class ArticleDeail extends Component {
	return(
		<Detail data-id={ this.props['data-id'] }>
	)
}
