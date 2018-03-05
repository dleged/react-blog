import React,{ Component,Fragment } from 'react';

class Title extends Component {
	render(){
		let data = this.props.data;
		return(
			<Fragment>
			<h2 className="blog-title"><a href="./list?_id={ this.props.id }">{ data.title }</a></h2>
			<div className="blog-meta">
				<div className="mark-tag">
					{
					 data.mark.split().map(mark => {
							return <a key="mark" href="#" target="_self">{ mark }</a>
						})
					}
				</div>
				<div className="create-info">
					<a href="#"> { data.author } </a>,
					on
					<time className="post-date"> { data.createTime.slice(0,10) }
					</time>
				</div>
			</div>
			</Fragment>
		)
	}
}
export default Title;
