import React from 'react';
import {Link} from 'react-router-dom'
class Tag extends React.Component {
	render () {
		return(
			<aside class="widget widget-tag-cloud">
          <div class="widget-title">
              <h6>标签</h6>
          </div>
          <div class="tag-cloud">
						<Link to="#">e-commerce</Link><Link to="#">portfolio</Link>
						<Link to="#">responsive</Link><Link to="#">bootstrap</Link>
						<Link to="#">business</Link><Link to="#">corporate</Link>
					</div>
      </aside>
		)
	}
}

export default Tag;
