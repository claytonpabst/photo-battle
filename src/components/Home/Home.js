import React, { Component } from 'react';

import './Home.css';
import data from './data.js';


class Home extends Component {
  constructor(props){
    super(props)

    this.state = data
    
    this.loadTwoPictures = this.loadTwoPictures.bind(this);
  }
  componentDidMount(){
    this.loadTwoPictures()
  }

  loadTwoPictures(){
    let pictureOne = {};
    let pictureTwo = {};
    for(let i=0; i<this.state.pictures.length; i++){
      
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="home">
        <div className='pictureToVoteWrapper'>
          <img className='pictureToVotePicture' src={this.state.pictures[0].URL} alt=""/>
          <button className='pictureToVoteButton'>WINNER</button>
        </div>
        <div className='pictureToVoteWrapper'>
          <img className='pictureToVotePicture' src={this.state.pictures[1].URL} alt=""/>
          <button className='pictureToVoteButton'>WINNER</button>
        </div>

      </div>
    );
  }
}


export default Home;