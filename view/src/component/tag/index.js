import React from 'react';
import Content from '../content/index';
import {Link} from 'react-router-dom'
class Tag extends React.Component {
	render () {
		return(
			<aside class="widget widget-tag-cloud">
          <div class="widget-title">
              <h6>标签🏷️</h6>
          </div>
          <div class="tag-cloud">
						<Link to="/tag/react" component={Content}>react</Link>
						<Link to="/tag/es6" component={Content}>es6</Link>
						<Link to="/tag/webpack" component={Content}>webpack</Link>
						<Link to="/tag/javascript" component={Content}>javascript</Link>
						<Link to="/tag/css" component={Content}>css</Link>
						<Link to="/tag/html" component={Content}>html</Link>
					</div>
      </aside>
		)
	}
}

export default Tag;
