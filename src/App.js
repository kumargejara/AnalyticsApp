import React, { Component } from 'react';
//import BarChart from './BarChart';
import PieChart from './PieChart';
import './App.css';
import * as mongoDBAPI from './api'

class App extends Component {
  
  constructor(props){
      super(props);      
      this.state = {
        showBarChartReport: false,
        title: 'Analytics Application',
        mongoData: 'test',
        donationsList: []
      }
      this.onClick = this.onClick.bind(this);
   }

   onClick(){
      var testData=this.state.mongoData[0];
      var tempDonationsList = [];    
      for (var i = 0; i < this.state.mongoData.length; i++) {
         tempDonationsList.push(this.state.mongoData[i].donations)    
      }
    
    //console.log(donationsList);
      this.setState(
      {
          showBarChartReport: true,
          donationsList: tempDonationsList         
      })           
   }

  render() {

mongoDBAPI.getData()
    .then((data) => {
      return new Promise((resolve, reject) => {
        if (data.status !== 'success'){
          reject('error')
        } else {
          
          // success
          this.setState(
          {
              title: 'Bar Chart Application',
              mongoData: data.output
          })    
          //console.log(this.state.mongoData);
          resolve()
        }
      })
    })
    .catch((err) => {
      console.log("err:", err)      
    })  
    
    return (
      <div className="App">
        <h1>Analytics Demo</h1>
        <div>
          <button onClick={this.onClick}>BarChart</button>
        </div>
        <h2>{this.state.title}</h2>
        <div>
          <PieChart data={[5, 2, 7, 1, 1, 3, 4, 9]} />
        </div>
      </div>
    );
  }
}

export default App;
