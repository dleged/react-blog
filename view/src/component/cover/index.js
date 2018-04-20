import React from 'react'
class Cover extends React.Component {

	componentDidMount(){
		var context = this;
		context.elementImg = document.querySelector('.module-cover-img');
		context.elementHeader = document.querySelector('.header');
		context.elementCover = document.querySelector('.module-cover');
		context.setImgSize(window.innerWidth);
		window.onscroll = () => {
			context.imgScroll(window.scrollY);
		}
		window.onresize = () => {
			context.setImgSize(window.innerWidth);
		}
	}

	setImgSize = (width) =>{
			this.elementImg.style.height = width / 3 + 'px';
			this.elementCover.style.height = width / 3 + 'px';
	}
	imgScroll = (y) =>{
			if(y){
					this.elementHeader.classList.add('header-small');
					this.elementHeader.classList.add('header-shadow');
			}else{
					this.elementHeader.classList.remove('header-small');
					this.elementHeader.classList.remove('header-shadow');
			}
			let img = this.elementImg;
			let transform = `translate3d(0px, -${y/1.5}px, 0px)`;
			img.style.webkitTransform = transform;
			img.style.MozTransform = transform;
			img.style.msTransform = transform;
			img.style.OTransform = transform;
			img.style.transform = transform;
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
							zIndex: '100'
						}}>
						<div className="module-cover-img" >
						</div>
					</div>
				</section>
		)
	}
}

export default Cover;
