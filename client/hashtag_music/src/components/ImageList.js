import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Remove from 'material-ui/svg-icons/navigation/close'

const ImageList = ({data, removeFn}) => (
    <List>
      { data.length <= 0 && <Subheader>Empty</Subheader>}
      {
        data.map((item, i) => (
          <ListItem
            key={i}
            primaryText={`${item.songName} - ${item.artistName}`}
            leftAvatar={<Avatar src={item.albumArt.url} />}
            rightIcon={
              <Remove
                onClick={removeFn.bind(null, item._id)}
               />
            }
          />
        ))
      }
    </List>
)

ImageList.propTypes = {
  data: PropTypes.array,
  removeFn: PropTypes.func,
}

export default ImageList