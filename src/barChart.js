import React, { Component } from 'react';
import BarChart from 'react-bar-chart';
import './App.css';


// class Chart extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }
//     componentWillUpdate() {
        
//     }
//     render() {
//         return (
//             <div class="bar-chart-wrapper">
//                 <div class="bar-chart">
//                     <div class="first">
//                         </div>
//                         <div class="second">
//                         </div>
//                     </div>
//             </div>
//         );
//     }
// }

// export default Chart;

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            margin : {top: 20, right: 0, bottom: 30, left: 60}
        };
    }

  render() {
    return (
        <div ref='root'>
            <div class="bar-chart-wrapper"> 
                <div class="bar-chart">
                <BarChart ylabel='Repos'
                  width={700}
                  height={300}
                  margin={this.state.margin}
                  data={this.props.chartData } />
            </div>
        </div>
        </div>
    );
  }
}

export default Chart;