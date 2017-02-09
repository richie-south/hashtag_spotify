import React, { PropTypes } from 'react'
import Cards, { Card } from 'react-swipe-card'
import MusicCard from './MusicCard'

const Swiper = ({ data, onEnd, onSwipeLeft, onSwipeRight }) => (
  <Cards onEnd={onEnd} className='master-root'>
    {data.map((item, i) => 
      <Card 
        key={i}
        onSwipeLeft={onSwipeLeft} 
        onSwipeRight={onSwipeRight}>
        
        <MusicCard
          title={item.songName}
          subtitle={`${item.artistName} - ${item.albumName}`}
          backgroundimagePath={item.albumArt.url}
          link={item.externalUrl}
        />
      </Card>
    )}
  </Cards>
)

Swiper.propTypes = {
  data: PropTypes.array, 
  onEnd: PropTypes.func,
  onSwipeLeft: PropTypes.func, 
  onSwipeRight: PropTypes.func,
}

export default Swiper