import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import Swiper from './components/Swiper'
import MusicBar from './components/MusicBar'
import DrawerMenu from './components/DrawerMenu'
import ImageList from './components/ImageList'
import connect from 'react-redux-connectme'
import './App.css'

class App extends Component {

  onSwipeLeft = () => {
    this.props.incrementCardIndex()
  }

  onSwipeRight = () => {
    const index = this.props.cardIndex;
    const card = this.props.cards[index]

    this.props.addToSavedTracks(card)
    this.props.incrementCardIndex()
  }

  onEnd = () => {
    console.log('CardIndex', this.props.cardIndex)
  }

  savePlaylist = () => {
    console.log('Saving playlist') 
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar 
            title='#Spotify'
            iconElementRight={
              <DrawerMenu
                width={300}
                openSecondary={true}
              >
                
                <ImageList
                  data={this.props.savedCards}
                  removeFn={this.props.removeFromSavedTracks}
                />

                <RaisedButton 
                  label="Save as playlist" 
                  onClick={this.savePlaylist}
                  fullWidth={true}
                />
              </DrawerMenu>
            }
            showMenuIconButton={false} 
          />
            
          <div className='master-root'>
            <Swiper 
              data={this.props.cards}
              onEnd={this.onEnd}
              onSwipeLeft={this.onSwipeLeft}
              onSwipeRight={this.onSwipeRight} 
            />

          </div>
          <MusicBar/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(App, (state) => ({
  cards: state.cards,
  savedCards: state.savedCards,
  removeFromSavedTracks: state.removeFromSavedTracks,
  addToSavedTracks: state.addToSavedTracks,
  cardIndex: state.cardIndex,
  incrementCardIndex: state.incrementCardIndex,
}))
