import React, { Component } from 'react';

import './Home.css';
import data from './data.js';


class Home extends Component {
  constructor(props){
    super(props)

    this.state = data
    
    this.loadTwoPictures = this.loadTwoPictures.bind(this);
    this.updatePicturesInRound_and_getTwoNewPictures = this.updatePicturesInRound_and_getTwoNewPictures.bind(this);
  }
  componentDidMount(){
    this.decideOnBetaOrStandard()
  }

  decideOnBetaOrStandard(){
    let potentialBetaPictures = [];
    let potentialStandardPictures = [];
    for(let i=0; i<this.state.pictures.length; i++){
      if(this.state.pictures[i].roundsVoted < 10){
        potentialBetaPictures.push(this.state.pictures[i])
      } else {
        potentialStandardPictures.push(this.state.pictures[i])
      }
    }
    if(this.state.roundOfVoting <= 10){
      this.loadTwoPictures(potentialBetaPictures);
      return
    } else {
      this.loadTwoPictures(potentialStandardPictures);
      return
    }
  }

  loadTwoPictures(potentialPictures){
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
    let winnerIndex;
    let loserIndex;
    let pictures = this.state.pictures;
    let roundOfVoting = this.state.roundOfVoting;
    for(let i=0; i<this.state.pictures.length; i++){
      if(winningPicture.id === pictures[i].id){
        winner = pictures[i];
        winnerIndex = i;
      }
      if(losingPicture.id === pictures[i].id){
        loser = pictures[i]
        loserIndex = i;
      }
      if(winner && loser){
        break;
      }
    }
    console.log(winner, loser);
    winner.wins ++;
    winner.roundsVoted ++;
    loser.losses ++;
    loser.roundsVoted ++;
    pictures[winnerIndex] = winner;
    pictures[loserIndex] = loser;
    roundOfVoting++;
    this.setState({
      pictures: pictures,
      roundOfVoting: roundOfVoting
    }, () => {
      this.decideOnBetaOrStandard();
    });
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
        <h1>Round of Voting: {this.state.roundOfVoting}</h1>
        <div className='pictureToVoteWrapper'>
          <img className='pictureToVotePicture' src={this.state.pictureOne.URL} alt=""/>
          <button onClick={() => (this.updatePicturesInRound_and_getTwoNewPictures(this.state.pictureOne, this.state.pictureTwo))} className='pictureToVoteButton'>WINNER</button>
          <h1>wins:{this.state.pictureOne.wins}</h1>
          <h1>losses:{this.state.pictureOne.losses}</h1>
          <h1>roundsVoted:{this.state.pictureOne.roundsVoted}</h1>
        </div>
        <div className='pictureToVoteWrapper'>
          <img className='pictureToVotePicture' src={this.state.pictureTwo.URL} alt=""/>
          <button onClick={() => (this.updatePicturesInRound_and_getTwoNewPictures(this.state.pictureTwo, this.state.pictureOne))} className='pictureToVoteButton'>WINNER</button>
          <h1>wins:{this.state.pictureTwo.wins}</h1>
          <h1>losses:{this.state.pictureTwo.losses}</h1>
          <h1>roundsVoted:{this.state.pictureTwo.roundsVoted}</h1>
        </div>

      </div>
    );
  }
}


export default Home;