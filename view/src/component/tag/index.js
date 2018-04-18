import React from 'react';

class Tag extends React.Component {
	render () {
		return(
			<aside class="widget widget-tag-cloud">
          <div class="widget-title">
              <h6>标签</h6>
          </div>
          <div class="tag-cloud">
						<a href="#">e-commerce</a><a href="#">portfolio</a>
						<a href="#">responsive</a><a href="#">bootstrap</a>
						<a href="#">business</a><a href="#">corporate</a>
					</div>
      </aside>
		)
	}
}

export default Tag;
