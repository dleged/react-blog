webpackJsonp([0],{125:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(0),i=n.n(c),u=n(35),l=n(36),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.componentDidMount=function(){n.post(n.props.match.params.id)},n.state={data:{data:{title:"",content:"",author:"",mark:"",createTime:""}}},n.post=n.post.bind(n),n}return a(t,e),s(t,[{key:"post",value:function(e){var t=this;Object(l.a)({id:e}).then(function(e){var n=e.data;t.setState({data:n})}).catch(function(e){return new Error(e)})}},{key:"render",value:function(){var e=this.state.data.data;return i.a.createElement("article",{className:"blog-piece"},i.a.createElement(u.a,{data:e}),i.a.createElement("section",{className:"blog-excerpt"},i.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.content}})))}}]),t}(c.Component);t.default=f}});
//# sourceMappingURL=0.2a6c5630.chunk.js.map