import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './index.css';
import { BrowserRouter } from "react-router-dom";

class Doc extends React.Component{
    componentDidMount(){
      document.title = "dfsdfsdfsd"
    }
  
    render(){
      return(
        <b> test </b>
      )
    }
  }

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

export default Doc;


