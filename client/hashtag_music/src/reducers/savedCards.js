
const savedCards = (state = [], action) => {
  switch (action.type) {
  case 'ADD_TO_SAVED_TRACKS':
    return [...state, action.track]
  case 'REMOVE_FROM_SAVED_TRACKS':
    return state.filter((card) => card._id !== action.id)
  default:
    return state
  }
}

export default savedCards

