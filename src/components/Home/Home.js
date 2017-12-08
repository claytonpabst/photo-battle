import React, { Component } from 'react';

import './Home.css';
import data from './data.js';


class Home extends Component {
  constructor(props){
    super(props)

    this.state = data
    
    this.loadTwoPictures = this.loadTwoPictures.bind(this);
    this.loadTwoBetaPictures = this.loadTwoBetaPictures.bind(this);
  }
  componentDidMount(){
    this.loadTwoPictures()
  }

  loadTwoPictures(){
    let potentialPictures = [];
    let pictureOne = {};
    let pictureTwo = {};
    for(let i=0; i<this.state.pictures.length; i++){
      if(this.state.pictures[i].roundsVoted < 10){
        potentialPictures.push(this.state.pictures[i])
      }
    }
    if(potentialPictures.length >= 2){
      this.loadTwoBetaPictures(potentialPictures)
      return
    }
  }

  loadTwoBetaPictures(potentialPictures){
    let i1 = this.randomNumber(0, potentialPictures.length-1);
    let i2 = this.randomNumber(0, potentialPictures.length-1);
    while(i2 === i1){
      i2 = this.randomNumber(0, potentialPictures.length-1);
    };
    this.setState({
      pictureOne:potentialPictures[i1],
      pictureTwo:potentialPictures[i2]
    })
  };

  updatePicturesInRound_and_getTwoNewPictures(winningPicture, losingPicture){
    let winner;
    let loser;
    for(let i=0; i<this.state.pictures.length; i++){
      if(winningPicture.id === this.state.pictures[i].id){
        winner = this.state.pictures[i]
      }
    }
    for(let i=0; i<this.state.pictures.length; i++){
      if(losingPicture.id === this.state.pictures[i].id){
        loser = this.state.pictures[i]
      }
    }
    
  }

  randomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  render() {
    console.log(this.state);
    console.log(this.state.pictureOne)
    console.log(this.state.pictureTwo)
    return (
      <div className="home">
        <div className='pictureToVoteWrapper'>
          <img className='pictureToVotePicture' src={this.state.pictureOne.URL} alt=""/>
          <button onClick={() => (this.updatePicturesInRound_and_getTwoNewPictures(this.state.pictureOne.id, this.state.pictureTwo.id))} className='pictureToVoteButton'>WINNER</button>
        </div>
        <div className='pictureToVoteWrapper'>
          <img className='pictureToVotePicture' src={this.state.pictureTwo.URL} alt=""/>
          <button onClick={() => (this.updatePicturesInRound_and_getTwoNewPictures(this.state.pictureTwo.id, this.state.pictureOne.id))} className='pictureToVoteButton'>WINNER</button>
        </div>

      </div>
    );
  }
}


export default Home;