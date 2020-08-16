import React, { useState } from 'react'

// Material
import { Alert, AlertTitle, Pagination } from '@material-ui/lab'
import { Chip, Button } from '@material-ui/core';
import { EventOutlined, InfoOutlined } from '@material-ui/icons'

// Template
import TabTemplate from '../../components/tabTemplate'

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
  const {
    handleChange,
    page,
    count
  } = props

  return (
    <div
      className={styles['timeline']}
    >
      <div
        className={styles['content']}
      >
        {props.children}
      </div>
      
      <div
        className={styles['pagination']}
      >
        <Pagination
          page={page}
          count={count}
          onChange={handleChange}
          color='secondary'
          variant='outlined'  
        />
      </div>
    </div>
  )
}

const PurchasesTab = () => {
  const [page, setPage] = useState(1)

  function _handleChange(e, value) {
    setPage(value)
  }

  return (
    <TabTemplate
      title='Purchase History'
    >
      {
        false ? (
          <Timeline
            handleChange={_handleChange}
            page={page}
            count={10}
          >
            <TimelineItem
              date={Date.now()}
            />
            <TimelineItem
              date={Date.now()}
            />
          </Timeline>
        ) : (
          <Alert
            variant='outlined'
            severity='success'
            icon={<InfoOutlined />}
            action={
              <Button
                color='inherit'
              >
                Shop
              </Button>
            }
          >
            <AlertTitle
              className={styles['alertTitle']}
            >
              No History
            </AlertTitle>
            You do not have a purchase history yet. Take a look at our shop
          </Alert>
        )
      }
      
    </TabTemplate>
  )
}

export default PurchasesTab
