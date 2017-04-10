import React, {Component} from 'react'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import LinearProgress from 'material-ui/LinearProgress'
import connect from 'react-redux-connectme'
import { Audio } from 'redux-audio'
import ReactDOM from 'react-dom'

const play = (<FontIcon className="material-icons">play_circle_outline</FontIcon>)
const pause = (<FontIcon className="material-icons">pause_circle_outline</FontIcon>)

const playLable = 'Play'
const pauseLable = 'Pause'
const uniqAudioPlayer = 'uniqAudioPlayer'

class MusicBar extends Component {
  state = {
    selectedIndex: 0,
    icon: pause,
    lable: pauseLable,
    duration: 30,
    currentTime: 0
  }

  componentDidMount(){
    const audioSrc = ReactDOM.findDOMNode(this.audioPlayer)

    audioSrc.addEventListener('timeupdate', (event) => {
      this.setState({currentTime: event.target.currentTime})
    })    
  }

  select = (index) => {
    this.setState({selectedIndex: index})
  } 

  doPlay = () => {
    this.setState({ icon: play, lable: playLable })
    this.props.audioPause(uniqAudioPlayer)
  }

  doPause = () => {
    this.setState({ icon: pause, lable: pauseLable })
    this.props.audioPlay(uniqAudioPlayer)
  }

  changeIcon = ()  => {
    this.state.icon === pause ? 
      this.doPlay() :
      this.doPause()    
  }

  getTrackToPlay = () => {
    const cardIndex = this.props.cardIndex;
    const cards = this.props.cards
    return cardIndex <= cards.length -1 ?
      cards[cardIndex].previewUrl :
      null
  }

  render() {
    const trackToPlay = this.getTrackToPlay()
    return (
      <Paper 
        zDepth={1}>
        
        <BottomNavigation 
          selectedIndex={this.state.selectedIndex}>
          
          <BottomNavigationItem
            label={this.state.lable}
            icon={this.state.icon}
            onTouchTap={this.changeIcon}
          />
        
        </BottomNavigation>
        
        <Audio 
          ref={(a) => this.audioPlayer = a}
          src={trackToPlay} 
          autoPlay 
          uniqueId={uniqAudioPlayer} 
          loop
        />

        <LinearProgress 
          mode="determinate" 
          value={this.state.currentTime} 
          max={this.state.duration}
        />

      </Paper>
    )
  }
}

export default connect(MusicBar, (state) => ({
  cards: state.cards,
  cardIndex: state.cardIndex,
  audio: state.audio,
  audioPause: state.audioPause,
  audioPlay: state.audioPlay,
}))
