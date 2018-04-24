import React, { Component }  from 'react';
import {Link} from 'react-router-dom'

class Header extends Component {
	render(){
		return(
			<header className="header header-transparent">
            <div className="container-fluid">
                <div className="inner-header"><a className="inner-brand" href="/index">端了个端啊</a></div>
                <div className="inner-navigation collapse">
                    <div className="inner-nav">
                        <ul>
                            <li className="menu-item-has-children menu-item-has-mega-menu">
																<Link to="/index"><span className="menu-item-span">Home</span></Link>
                            </li>
														<li className="menu-item-has-children menu-item-has-mega-menu">
																<Link to="/index"><span className="menu-item-span">书籍</span></Link>
                            </li>
														<li className="menu-item-has-children menu-item-has-mega-menu">
																<Link to="/index"><span className="menu-item-span">关于我</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="extra-nav">
                    <ul>
                        <li><a className="top-bar-cart" to="shop-cart-1.html"><span className="menu-item-span"><i className="ti-shopping-cart"></i><span>3</span></span></a></li>
                        <li><a className="off-canvas-open" to="#"><span className="menu-item-span"><i className="ti-menu"></i></span></a></li>
                        <li className="nav-toggle"><a to="#" data-toggle="collapse" data-target=".inner-navigation"><span className="menu-item-span"><i className="ti-menu"></i></span></a></li>
                    </ul>
                </div>
            </div>
        </header>
		);
	}
}


export default Header;
