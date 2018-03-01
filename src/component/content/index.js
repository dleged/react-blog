import React, { Component }  from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
class Content extends Component {
	constructor(){
		super();
		this.post = this.post.bind(this);
		this.state = {};
	}

	post(page) {
		let that = this;
		fetch('/queryList',
		 	{ method: 'POST',
				headers: {
					"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			  	},
				mode: 'cors',
				cache: 'default',
				body:`page=${page}`
		   }
	   ).then(function (res) {
			if(res.ok){
				res.text().then((data)=>{
					data = JSON.parse(data);
	                that.setState({data: data});
	            })
			}

		}).catch(function(err){
			console.log(err);
		})
	}
	componentDidMount() {
		this.post(1);
	}

	render(){
		if(!this.state.data){
			return false;
		}
		let info;
		if(this.state.data && this.state.data.count){
			info = <ArticleList data={ this.state.data.data } />
		}else{
			info = <Prompt />
		}
		return(
			<section className="content-list content">
				{info}
				<Pages pageTick={ this.post} data={ this.state.data} />
			</section>
		);
	}
}

function Prompt(props) {
	return (<h3 className="blog-tips">还没有博客，开始你的第一个
				<a href="/admin">博客吧！</a>
			</h3>);

}

class Article extends Component {
	static contextTypes = {
	    router: PropTypes.object
	}
  	constructor(props, context) {
     super(props, context);
		this.fetchDetail = this.fetchDetail.bind(this);
	}
	fetchDetail(id){
		this.context.router.history.push('listDetail');
	}
	render(){
		return(
		    <article className="blog-piece">
		        <h2 className="blog-title">
					<a to='/listDetail' onClick={this.props.fetchDetail}>
						{ this.props.data.title }
					</a>
				</h2>
		        <div className="blog-meta">
		            <div className="mark-tag">
						{
							this.props.data.mark.split().map(mark=>{
								<a href="/tag/{ mark }" target="_blank">{ mark }</a>
							})
						}
		            </div>
		            <a href="#">{ this.props.author }</a>
		            on ,
		            <time className="post-date">{ this.props.data.createTime.slice(0,10) }
		            </time>
		        </div>
		        <section className="blog-excerpt">
		            <p className="blog-article"> { this.props.data.info } ...
						<a className="read-more" onClick={this.fetchDetail} to='/listDetail'>MORE</a>
		            </p>
		        </section>
		    </article>
		);
	}
}

class ArticleList extends Component {

	render(){
		let articleList = this.props.data.map(function(article){
			return <Article data={ article } />
		});
		return articleList;
	}
}

class Pages extends Component {
	constructor(props){
		super(props);
		this.nextPage = this.nextPage.bind(this);
		this.prePage = this.prePage.bind(this);
		this.state = {
			page: props.data.page || 1,
			pages: props.data.pages || 1
		}
	}
	nextPage = () => {
		if(this.state.pages === this.state.page){
			return;
		}
		let page = ++this.state.page;
		this.setState({
			page: page
		});
		this.props.pageTick(page);
	}

	prePage = () => {
		if(this.state.page === 1){
			return;
		}
		let page = --this.state.page;
		this.setState({
			page: page
		});
		this.props.pageTick(page);
	}

	render(){
		return (
			<nav className="pagination" role="navigation">
	            <a className={ this.state.page == 1 ? "defalut-posts newer-posts" : "newer-posts" } onClick={this.prePage}>
	                <span aria-hidden="true">←</span> PREV </a>
	            <span className="page-number">Page { this.state.page } of { this.state.pages }</span>
	            <a className={ this.state.page == this.state.pages? "defalut-posts older-posts" : "older-posts" } onClick={this.nextPage}>
	                NEXT <span aria-hidden="true">→</span></a>
	        </nav>
		);
	}
}

export default Content;
