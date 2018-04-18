import React from 'react'
import PropTypes from 'prop-types'
import img from '../../images/module-9.jpg';
class Cover extends React.Component {
	componentDidMount(){
		var context = this;
		window.onscroll = () => {
			console.log(111)
			context.elementImg = document.querySelector('.module-cover-img');
			context.imgScroll(window.scrollY);
		}
	}

	imgScroll = (y) =>{
			let img = this.elementImg;
			img.style.transform = "translate3d('10px', `-${y}px`, '0px')";
	}

	render () {
		return(
			<section className="module-cover parallax text-center" data-overlay="0.3" style={{
					backgroundImage: 'none',
					zIndex: 0
				}}>
            <div className="overlay-background" style={{opacity: 0.3}}></div>
						<div id="jarallax-container-0" style={{
								position: 'absolute',
								top: '0px',
								left: '0px',
								width: '100%',
								height: '100%',
								overflow: 'hidden',
								pointerEvents: 'none',
								zIndex: '-100'
							}}>
							<div className="module-cover-img" >
							</div>
						</div>
				</section>
		)
	}
}

export default Cover;
