import { combineReducers } from 'redux'
import playlist from './playlist'
import cards from './cards'
import cardIndex from './cardIndex'
import savedCards from './savedCards'
import { audioReducer as audio } from 'redux-audio'

const rootReducer = combineReducers({
  playlist,
  cards,
  cardIndex,
  audio,
  savedCards,
})

export default rootReducer