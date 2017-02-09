const cardIndex = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT_CARD_INDEX':
    return state+1
  default:
    return state
  }
}

export default cardIndex
