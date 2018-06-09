import React,{Component} from 'react';
import './index.less';

class Loading extends Component{
  render(){
    return (
      <div className="loading">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    )
  }
}
console.log('加载过渡组件...')
export default Loading;
