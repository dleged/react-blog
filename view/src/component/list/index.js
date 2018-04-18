import React from 'react'
import PropTypes from 'prop-types'

class List extends React.Component {
	constructor(props){
		super(props);
	}
	render () {
		let { title } = this.props;
		return(<aside className="widget widget-categories">
              <div className="widget-title">
                  <h6>{title}</h6>
              </div>
              <ul>
                  <li><a href="#">Journey <span className="float-right">112</span></a></li>
                  <li><a href="#">Development <span className="float-right">86</span></a></li>
                  <li><a href="#">Sport <span className="float-right">10</span></a></li>
                  <li><a href="#">Photography <span className="float-right">144</span></a></li>
                  <li><a href="#">Symphony <span className="float-right">18</span></a></li>
              </ul>
          </aside>)
	}
}

export default List;
