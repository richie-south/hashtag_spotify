import React from 'react'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

class DrawerMenu extends React.Component {

  state = {
    open: false,
  }

  handleToggle = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    return (
      <div>
        <FlatButton 
          onTouchTap={this.handleToggle}>
            menu
        </FlatButton>
        
        <Drawer 
          width={this.props.width} 
          openSecondary={this.props.openSecondary} 
          open={this.state.open} >

          <AppBar 
            onTouchTap={this.handleToggle}
            title="Saved Tracks" />

            {this.props.children}
        </Drawer>
      </div>
    )
  }
}

export default DrawerMenu