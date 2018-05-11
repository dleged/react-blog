import React from 'react';
import {Link} from 'react-router-dom';
import Content from '../content';
class Tag extends React.Component {
	render () {
		return(
			<aside className="widget widget-tag-cloud">
          <div className="widget-title">
              <h6>标签</h6>
          </div>
          <div className="tag-cloud">
						{
							this.props.list.map((item,index) => (
								 <Link key={index} to={`/tag/${item}`}>{item}</Link>
							))
						}
					</div>
      </aside>
		)
	}
}

export default Tag;
