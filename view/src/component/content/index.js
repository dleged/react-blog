import React, { Component }  from 'react';
import Title from '../title';
import {
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {fetchContentArticle} from '../../api/index';

class Content extends Component {
	constructor(props){
		super(props);
		this.post = this.post.bind(this);
		this.state = {
			data: {}
		};
	}

	post(page) {
		let that = this;
    fetchContentArticle({
      page: page
    })
    .then(function(res){
      let data = res.data;
      that.setState({data});
    })
    .catch((err) => new Error(err));

	}

	componentDidMount() {
		this.post(1);
	}

	render(){
		if(!this.state.data.page){
			return false;
		}
		let info;
		if(this.state.data && this.state.data.count){
			info = <ArticleList data={ this.state.data.data } />
		}else{
			info = <Prompt />
		}
		return(
			<section className="col-lg-12 content-list content">
				{info}
				<Pages pageTick={ this.post} data={ this.state.data} />
			</section>
		);
	}
}

function Prompt(props) {
	return (<h3 className="blog-tips">还没有博客，开始你的第一个</h3>);
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
		let data = this.props.data;
		return(
		    <article className="row blog-piece">
          <div className="col-lg-4">
              <div className="post-preview">
                <Link to={ `/listDetail/${data._id}` }>
                  <img src={require('../../images/5.jpg')} alt=""/>
                </Link>
              </div>
          </div>
          <div className="col-lg-8">
            <Title data={ data } />
		        <section className="post-content">
		            <p className="blog-article">
                    { data.info } ...
		            </p>
                <Link className="read-more" to={ `/listDetail/${data._id}` }>MORE</Link>
		        </section>
          </div>
		    </article>
		);
	}
}

class ArticleList extends Component {
	render(){
		let articleList = this.props.data.map(function(article){
			return <Article key={ article._id } data={ article } />
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
		let page = this.state.page + 1;
		this.setState({
			page: page
		});
		this.props.pageTick(page);
	}

	prePage = () => {
    if(this.state.page === 1){
      return;
    }
		let page = this.state.page - 1;
		this.setState({
			page: page
		});
		this.props.pageTick(page);
	}

	render(){
		return (
			<nav className="pagination">
          <a className={ this.state.page === 1 ? "defalut-posts newer-posts" : "newer-posts" } onClick={this.prePage}>
          <span aria-hidden="true">←</span> PREV </a>
          <span className="page-number">Page { this.state.page } of { this.state.pages }</span>
          <a className={ this.state.page === this.state.pages ? "defalut-posts older-posts" : "older-posts" }
             onClick={this.nextPage}>
             NEXT
             <span aria-hidden="true">→</span>
          </a>
      </nav>
		);
	}
}

export default Content;
