import React, { Component } from 'react';
import logo from './logo.svg';
import { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './App.css';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        data:[]
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
          this.dataArray.push({
            date:i,
            High:data["Time Series (Daily)"][i]["2. high"],
        Low:data["Time Series (Daily)"][i]["3. low"],
      Open:data["Time Series (Daily)"][i]["1. open"],
       Close:data["Time Series (Daily)"][i]["4. high"] });
          
          } 
          // for(let j in data["Time Series (Daily)"][0]){
          // console.log(j);
          
          // }
          
          console.log(this.dataArray);
        }
      }
      obj.updates(data);
      console.log(obj.dataArray);
      // console.log(obj.labelArray);

      this.setState({
        data:obj.dataArray});//this.dataArray}]});
      console.log(this.state.data);
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
        <LineChart
        width={1200}
        height={800}
        data={this.state.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="30 30" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="High" stroke="#8884d8" activeDot={{ r: 80 }} />
        <Line type="monotone" dataKey="Low" stroke="#82b419" />
        <Line type="monotone" dataKey="Open" stroke="#bbbbc5" />
        <Line type="monotone" dataKey="Close" stroke="#289a11" />
        {console.log(this.state.data.High)};
      </LineChart>
        <button onClick = {()=>this.getData()}>click me</button>
      </div>
    );
  }
  
}

export default App;
