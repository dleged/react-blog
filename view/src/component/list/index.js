import React from 'react'

class List extends React.Component {

	render () {
		let { title } = this.props;
		return(<aside className="widget widget-categories">
              <div className="widget-title">
                  <h6>{title}</h6>
              </div>
              <ul>
                  <li key="0"><a to="#">Journey <span className="float-right">112</span></a></li>
                  <li key="1"><a to="#">Development <span className="float-right">86</span></a></li>
                  <li key="2"><a to="#">Sport <span className="float-right">10</span></a></li>
                  <li key="3"><a to="#">Photography <span className="float-right">144</span></a></li>
                  <li key="4"><a to="#">Symphony <span className="float-right">18</span></a></li>
              </ul>
          </aside>)
	}
}

export default List;
