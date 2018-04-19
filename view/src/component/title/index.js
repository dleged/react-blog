import React,{ Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Title extends Component {
	render(){
		let data = this.props.data;
		return(
				<div className="post-header">
						<h2 className="post-title"><Link to={ `/listDetail/${data._id}` }>{ data.title }</Link></h2>
						<ul className="post-meta">
								<li>{ data.createTime.slice(0,10) }</li>
									{
									 data.mark.split().map(mark => {
											return <li><a key="mark" to="#" target="_self">{ mark }</a></li>
										})
									}
						</ul>
	      </div>
		)
	}
}
export default Title;
