import React, { PropTypes } from 'react'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card'

const MusicCard = ({ title, subtitle, backgroundimagePath, link }) => (
  <Card>
    <CardMedia>
      <img src={backgroundimagePath} role="presentation" />
    </CardMedia>
    <CardTitle title={title} subtitle={subtitle} />
    <CardText>
    <a href={link}>Open on spotify </a>
    </CardText>
  </Card>
)

MusicCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  backgroundimagePath: PropTypes.string,
  isPlay: PropTypes.bool,
  playFn: PropTypes.func,
  pauseFn: PropTypes.func,
  link: PropTypes.string,
  previewUrl: PropTypes.string,
}

export default MusicCard