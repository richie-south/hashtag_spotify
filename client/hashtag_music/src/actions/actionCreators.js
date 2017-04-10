
import { audioPlay, audioPause, audioSrc } from 'redux-audio/actions'

export const addTrack = (track) => ({
  type: 'ADD_TRACK',
  track,
})

export const incrementCardIndex = () => ({
  type: 'INCREMENT_CARD_INDEX',
})

export const addToSavedTracks = (track) => ({
  type: 'ADD_TO_SAVED_TRACKS',
  track,
})

export const removeFromSavedTracks = (id) => ({
  type: 'REMOVE_FROM_SAVED_TRACKS',
  id,
})

export {
  audioPlay,
  audioPause,
  audioSrc,
}
