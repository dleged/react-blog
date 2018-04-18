import React, { Component }  from 'react';
import {Link} from 'react-router-dom'

class Header extends Component {
	render(){
		return(
			<header className="header header-transparent header-small header-shadow">
            <div className="container-fluid">
                <div className="inner-header"><a className="inner-brand" href="index.html">端了个端</a></div>
                <div className="inner-navigation collapse">
                    <div className="inner-nav">
                        <ul>
                            <li className="menu-item-has-children menu-item-has-mega-menu">
																<Link to="/index"><span className="menu-item-span">Home</span></Link>
                            </li>
														<li className="menu-item-has-children menu-item-has-mega-menu">
																<Link to="/index"><span className="menu-item-span">Home</span></Link>
                            </li>
														<li className="menu-item-has-children menu-item-has-mega-menu">
																<Link to="/index"><span className="menu-item-span">Home</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="extra-nav">
                    <ul>
                        <li><a className="top-bar-cart" href="shop-cart-1.html"><span className="menu-item-span"><i className="ti-shopping-cart"></i><span>3</span></span></a></li>
                        <li><a className="off-canvas-open" href="#"><span className="menu-item-span"><i className="ti-menu"></i></span></a></li>
                        <li className="nav-toggle"><a href="#" data-toggle="collapse" data-target=".inner-navigation"><span className="menu-item-span"><i className="ti-menu"></i></span></a></li>
                    </ul>
                </div>
            </div>
        </header>
		);
	}
}


export default Header;
