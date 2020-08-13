import React from 'react'

// Material
import { Chip } from '@material-ui/core';
import { EventOutlined } from '@material-ui/icons'

// Template
import TabTemplate from '../tabTemplate'

// Styles
import styles from './styles.module.scss';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(date) {
  const dateObj = new Date(date)

  const day = dateObj.getDate()
  const month = MONTHS[dateObj.getMonth()]
  const year = dateObj.getFullYear()

  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()

  return `${day > 9 ? day : '0' + day} ${month} ${year}, ${hours}:${minutes}`
}

const TimelineItem = props => {
  return (
    <div
      className={styles['timelineItem']}
    >
      <div
        className={styles['visual']}
      >
        <div className={styles['dot']} />
        <div className={styles['line']} />
      </div>

      <div
        className={styles['info']}
      >
        <Chip
          icon={<EventOutlined />}
          label={formatDate(props.date)}
          variant='outlined'
          color='secondary'
        />

        
      </div>
    </div>
  )
}

const Timeline = props => {
  return (
    <div
      className={styles['timeline']}
    >
      {props.children}
    </div>
  )
}

const PurchasesTab = () => {
  return (
    <TabTemplate
      title='Purchase History'
    >
      <Timeline>
        <TimelineItem
          date={Date.now()}
        />
        <TimelineItem
          date={Date.now()}
        />
      </Timeline>
    </TabTemplate>
  )
}

export default PurchasesTab
