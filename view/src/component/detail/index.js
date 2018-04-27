import React, { Component }  from 'react';
import Title from '../title';
import {fetchArticle} from '../../api/index'
class Detail extends Component {
	constructor(props){
		super(props);
		this.state = {
			data:{
				data: {
					title: '',
					content: '',
					author: '',
					mark: '',
					createTime: ''
				}
			}
		};
		this.post = this.post.bind(this);
	}

	post(id){
		let that = this;

		fetchArticle({
      id: id
    })
    .then(function(res){
      let data = res.data;
      that.setState({data});
    })
    .catch((err) => new Error(err));

	}

	componentDidMount = () => {
		this.post(this.props.match.params.id);
	}

	render(){
		let data = this.state.data.data;
		return (
			<article className="blog-piece">
		        <Title data={ data } />
		        <section className="blog-excerpt">
					<p dangerouslySetInnerHTML={ {__html: data.content} }></p>
		        </section>
		    </article>
		)
	}
}

export default Detail;
// module.exports = Detail;

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
