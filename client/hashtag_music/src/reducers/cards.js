
const defaultState = [
  {
    albumArt:
    {
      width: 300,
      url: 'https://i.scdn.co/image/41ee9f770ffc9c4df6b60fb079613d16417e918c',
      height: 300,
    },
    popularityPoints: 0,
    __v: 0,
    trackId: 'spotify:track:3G6hD9B2ZHOsgf4WfNu7X1',
    previewUrl: 'https://p.scdn.co/mp3-preview/9d13646c2c824ed1673636c4576c47e25c3c41de?cid=null',
    externalUrl: 'https://open.spotify.com/track/3G6hD9B2ZHOsgf4WfNu7X1',
    albumName: 'Pure Heroine',
    artistName: 'Lorde',
    songName: 'Team',
    createdAt: '2016-12-16T13:07:01.105Z',
    updatedAt: '2016-12-16T13:07:01.105Z',
    _id: '5853e6f575167f661238694f',
  },
  {
    albumArt:
    {
      width: 300,
      url: 'https://i.scdn.co/image/57b735fa3e6ff71420c6282c53a3d288037f7f1f',
      height: 300,
    },
    popularityPoints: 0,
    __v: 0,
    trackId: 'spotify:track:5WWBZdpfUsq2Y88M1NFF2R',
    previewUrl: 'https://p.scdn.co/mp3-preview/080bce95033085a1f434f06877dab18eaac5aec7?cid=null',
    externalUrl: 'https://open.spotify.com/track/5WWBZdpfUsq2Y88M1NFF2R',
    albumName: 'Naranja Persa',
    artistName: 'Ciro y los Persas',
    songName: 'Similar',
    createdAt: '2016-12-16T13:07:01.108Z',
    updatedAt: '2016-12-16T13:07:01.108Z',
    _id: '5853e6f575167f6612386951',
  },
  {
    albumArt:
    {
      width: 300,
      url: 'https://i.scdn.co/image/b44032f6314c82611503584b3324b4ee212cd4e9',
      height: 300,
    },
    popularityPoints: 0,
    __v: 0,
    trackId: 'spotify:track:0pBewKk1R251xxQzKIh9jr',
    previewUrl: 'https://p.scdn.co/mp3-preview/622b9c138b14f2bbf6f10241caced2061af2b6d6?cid=null',
    externalUrl: 'https://open.spotify.com/track/0pBewKk1R251xxQzKIh9jr',
    albumName: 'La Dulzura',
    artistName: 'Cultura Profética',
    songName: 'La espera',
    createdAt: '2016-12-16T13:07:01.108Z',
    updatedAt: '2016-12-16T13:07:01.108Z',
    _id: '5853e6f575167f6612386952',
  },
  {
    albumArt:
    {
      width: 300,
      url: 'https://i.scdn.co/image/0d8239c97f02faa1fe0b04cdfd98c50a09e5df10',
      height: 300,
    },
    popularityPoints: 0,
    __v: 0,
    trackId: 'spotify:track:0oSNOJEcBIKNcQzRc5TfyR',
    previewUrl: 'https://p.scdn.co/mp3-preview/00fe3fd2b66d648050087752e10b18adbdda3f15?cid=null',
    externalUrl: 'https://open.spotify.com/track/0oSNOJEcBIKNcQzRc5TfyR',
    albumName: 'WINGS',
    artistName: 'BTS',
    songName: 'Blood Sweat & Tears',
    createdAt: '2016-12-16T13:07:01.106Z',
    updatedAt: '2016-12-16T13:07:01.106Z',
    _id: '5853e6f575167f6612386950',
  },
  
]

const cards = (state = defaultState, action) => {
  switch (action.type) {
  case 'ADD_TRACK':
    return [...state, action.track]
  default:
    return state
  }
}

export default cards

