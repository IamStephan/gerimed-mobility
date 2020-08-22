import React from 'react'

// Material
import {
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core'
import { StorefrontOutlined } from '@material-ui/icons'

// Gatsby
import { Link } from 'gatsby'

// Styles
import styles from './styles.module.scss';

const AuthTitle = props => {
  const {
    title
  } = props
  return (
    <div
      className={styles['titleContainer']}
    >
      <Typography
        variant='h3'
        color='secondary'
        className={styles['title']}
      >
        {title}
      </Typography>

      <Tooltip
        title='Home Page'
        arrow
        placement='top'
      >
        <IconButton
          color='secondary'
          className={styles['iconButton']}
          component={Link}
          to='/'
        >
          <StorefrontOutlined />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default AuthTitle
