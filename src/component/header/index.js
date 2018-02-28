import React, { Component }  from 'react';

class Header extends Component {
	render(){
		return(
			<header className="headerV">
			    <div className="headerv-nav">
			        <a href="/index">前端开发</a>
			        <a href="/user/timeline" className="">UED实验室</a>
			        <a href="/admin" className="">后台管理</a>
			        <a href="/channel/" className="">关于我</a>
			    </div>
			    <div className="headerV-center">
			        青取之于蓝，而胜于蓝
			    </div>
			</header>
		);
	}
}


export default Header;
