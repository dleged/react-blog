import React, { Component }  from 'react';
import axios from 'axios';

class Detail extends Component {
	constructor(props){
		super(props);
		this.state = {};
		this.post = this.post.bind(this);
	}

	post(id){
		let that = this;
		fetch('/listDetail',
		 	{ method: 'POST',
				headers: {
					"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			  	},
				mode: 'cors',
				cache: 'default',
				body:`id=${id}`
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
		this.post('5a964d0e96078e32b107c274');
	}

	render(){
		if(!this.state.data){
			return;
		}
		return (
			<article className="blog-piece">
		        <h2 className="blog-title"><a href="./list?_id={ this.props.id }">{ this.props.data.title }</a></h2>
		        <div className="blog-meta">
		            <div className="mark-tag">
						{
							this.props.data.mark.split().map(mark=>{
								<a href="#" target="_self">{ mark }</a>
							})
						}
		            </div>
		            <a href="#">{ this.props.author }</a>
		            on ,
		            <time className="post-date">{ this.props.data.createTime.slice(0,10) }
		            </time>
		        </div>
		        <section className="blog-excerpt">
					<p> { this.props.data.content } </p>
		        </section>
		    </article>
		)
	}
}

export default Detail;

// <div class="blog-main">
// 	<div class="blog-content">
// 		<!--博客内容详情-->
// 		<article class="blog-piece blog-code">
// 			<h2 class="blog-title"><a href="./list/{{ item.id }}">{{ responseData.data.title }}</a></h2>
// 			<div class="blog-meta">
// 				<!-- <a href="#">{{ responseData.data.author }}</a> on ,
// 				<time class="post-date" datetime="2017-10-26">
// 					{{ responseData.data.createTime|date('Y-m-d H:i:s', -480, 'CCT') }}
// 				</time> -->
// 			</div>
// 			<section class="blog-excerpt">
// 				<p> {% autoescape %}{{ responseData.data.content }}{% endautoescape %} </p>
// 			</section>
// 		</article>
// 	</div>
// </div>
