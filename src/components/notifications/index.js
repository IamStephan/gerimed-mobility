import React, { useState } from 'react'

// Material
import { Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

// Flip Toolkit
import { Flipper, Flipped, spring } from 'react-flip-toolkit'

// Styles
import styles from './styles.module.scss'

/*
 *const notificationExample = {
 *  message: 'This is a message',
 *  type: 'error',
 *  title: 'some title'
 *}
 */

const Notifications = props => {
  const {
    notifications = [],
    removeNoti
  } = props

  return (
    <Flipper
      flipKey={`${notifications.length}`}
      decisionData={notifications}
    >
      <section
      className={styles['notificationSection']}
    >
      {
        notifications.map(item => (
          <Flipped
            flipId={item.id}
            key={item.id}
          >
            <Alert
              className={`${styles['alert']}`}
              severity='error'
              action={
                <Button
                  color='inherit'
                  size='small'
                  onClick={() => {
                    removeNoti(item.id)
                  }}
                >
                  CLOSE
                </Button>
              }
            >
              <AlertTitle>
                {
                  item.title
                }
              </AlertTitle>
              {
                item.message
              }
            </Alert>
          </Flipped>
        ))
      } 
    </section>
    </Flipper>
    
  )
}

export default Notifications
