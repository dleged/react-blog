import React from 'react';
import {Link} from 'react-router-dom'
class Tag extends React.Component {
	render () {
		return(
			<aside className="widget widget-tag-cloud">
          <div className="widget-title">
              <h6>标签</h6>
          </div>
          <div className="tag-cloud">

					</div>
      </aside>
		)
	}
}

export default Tag;
// <Link to="/tag/react" component={Content}>react</Link>
// <Link to="/tag/es6" component={Content}>es6</Link>
// <Link to="/tag/webpack" component={Content}>webpack</Link>
// <Link to="/tag/javascript" component={Content}>javascript</Link>
// <Link to="/tag/css" component={Content}>css</Link>
// <Link to="/tag/html" component={Content}>html</Link>
