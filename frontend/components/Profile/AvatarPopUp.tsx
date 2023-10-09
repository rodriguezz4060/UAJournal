import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/styles/makeStyles'
import AvatarUploader from './AvatarUploader'

const useStyles = makeStyles({
  popOverRoot: {
    pointerEvents: 'none',
  },
})

function AvatarPopUp({ avatarUrl, fullName }) {
  let currentlyHovering = false
  const styles = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget)
    }
  }

  function handleHover() {
    currentlyHovering = true
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleCloseHover() {
    currentlyHovering = false
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose()
      }
    }, 50)
  }

  return (
    <div>
      <div
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        onMouseOver={handleClick}
        onMouseLeave={handleCloseHover}
      >
        <AvatarUploader avatarUrl={avatarUrl} fullName={fullName} />
      </div>
      <Menu
        id='simple-menu'
        disableScrollLock={true}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          onMouseEnter: handleHover,
          onMouseLeave: handleCloseHover,
          style: { pointerEvents: 'auto' },
        }}
        getContentAnchorEl={null}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        PopoverClasses={{
          root: styles.popOverRoot,
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
      </Menu>
    </div>
  )
}

export default AvatarPopUp
