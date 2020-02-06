import React, { Component } from 'react';
import logo from './logo.svg';
import {Line} from "react-chartjs-2";
import './App.css';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      labels:[],
      datasets:[{
        data:[]
      }]
    }
  }

  
  refineData(data){
    console.log(data);
    let obj = {
      info:data["Meta Data"]["1. Information"],
      dataArray:[],
      labelArray:[],
      //creating an array of stock price
      updates:function arrayfy(data){
        for(let i in data["Time Series (Daily)"]){
          this.dataArray.push(data["Time Series (Daily)"][i]["2. high"]);
          this.labelArray.push(i);
          
          } 
          // for(let j in data["Time Series (Daily)"][0]){
          // console.log(j);
          
          // }
          
          console.log(this.labelArray);
        }
      }
      obj.updates(data);
      console.log(obj.dataArray);
      // console.log(obj.labelArray);

      this.setState({labels:obj.labelArray,
        datasets:[{data:obj.dataArray}]});//this.dataArray}]});
      console.log(this.state);
      return obj;
  }
  //api call
  getData = ()=>{
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=T9Q2A6KO804DZQZZ`)
    .then(response => {return response.json()})
    .then(data=>this.refineData(data))
  }
  //setting state of datas
  

  //calling api after button click
  render(){
    return (
      <div className="App">
        <Line data = {this.state}/>
        <button onClick = {()=>this.getData()}>click me</button>
      </div>
    );
  }
  
}

export default App;
