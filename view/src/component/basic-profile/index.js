import React, { Component }  from 'react';

class BasicProfile extends Component {
	render(){
		return(
			<section className="content-secondly content">
				<div className="info-basic">
					<div className="bg-cover">
					</div>
					<div className="conbox">
						<a href="#" className="mem-banner">
							<img src={require('../../images/bg-cover.png')} />
						</a>
					</div>
				</div>
				<div className="info-link-box">
					<a className="info-link" href="http://www.ponshine.com/" target="_blank">
						<span className="v-icon">
							<svg version="1.1" fill="#5f8884" width="4.571428571428571" height="4.571428571428571" viewBox="0 0 512 512" className="svg-icon active" style={{width: "20px",height: "20px", transform: "rotate(0deg) scale(1, 1)"}}><path d="M256,112L96,240v208h112V320h96v128h112V240L256,112z" stroke="transparent"></path><path d="M256,64l-96,76.8V96H96v95.999l-32,25.499l11.51,11.384L256,84.49l180.49,144.393L448,217.498L256,64z" stroke="transparent"></path></svg>
						</span>
						<span className="desc">ponshine
						</span>
					</a>
					<a className="info-link" href="http://www.ponshine.com/" target="_blank">
						<span className="v-icon">
							<svg  version="1.1" fill="red" aria-hidden="true" height="16" viewBox="0 0 12 16" width="20"><path fillRule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
						</span>
						<span className="desc">HangZhou
						</span>
					</a>
					<a className="info-link" href="https://github.com/dleged" target="_blank">
						<span className="v-icon">
							<svg version="1.1" width="9.142857142857142"
								height="9.142857142857142" viewBox="0 0 1024 1024" className="svg-icon active"
								style={{width: "20px",height: "20px", transform: "rotate(0deg) scale(1, 1)"}}>
								<path d="M941.714 512q0 143.433-83.712 258.011t-216.283 158.574q-15.433 2.853-22.565-3.986t-7.131-17.152v-120.576q0-55.442-29.696-81.152 32.585-3.438 58.587-10.277t53.723-22.272 46.299-37.998 30.281-60.014 11.703-86.016q0-69.157-45.129-117.723 21.138-52.005-4.571-116.553-16.018-5.157-46.299 6.29t-52.553 25.161l-21.723 13.714q-53.138-14.848-109.714-14.848t-109.714 14.848q-9.143-6.29-24.283-15.433t-47.726-22.016-49.152-7.717q-25.161 64.585-3.986 116.553-45.129 48.567-45.129 117.723 0 48.567 11.703 85.723t29.989 60.014 46.007 38.29 53.723 22.272 58.587 10.277q-22.857 20.553-28.014 58.843-11.995 5.705-25.71 8.558t-32.585 2.853-37.413-12.288-31.707-35.73q-10.862-18.286-27.721-29.696t-28.27-13.714l-11.447-1.719q-11.995 0-16.567 2.56t-2.853 6.583 5.157 8.009 7.424 6.839l3.986 2.853q12.581 5.705 24.869 21.723t17.993 29.147l5.705 13.129q7.424 21.723 25.161 35.145t38.29 17.152 39.717 3.986 31.707-2.011l13.129-2.304q0 21.723 0.293 50.871t0.293 30.866q0 10.277-7.424 17.152t-22.857 3.986q-132.571-43.995-216.283-158.574t-83.712-258.011q0-119.442 58.843-220.27t159.707-159.707 220.27-58.843 220.27 58.843 159.707 159.707 58.843 220.27z" stroke="transparent">
								</path>
							</svg>
						</span>
						<span className="desc">端了个端啊
						</span>
					</a>
				</div>
			</section>
		);
	}
}

export default BasicProfile;
