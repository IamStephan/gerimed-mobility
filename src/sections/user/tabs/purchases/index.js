import React, { useState, useEffect } from 'react'

// Material
import { Alert, AlertTitle, Pagination } from '@material-ui/lab'
import { Chip, Button } from '@material-ui/core';
import { EventOutlined, InfoOutlined } from '@material-ui/icons'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Hooks
import { useLocalStorage } from 'react-use'
import { useGlobalState } from '../../../../state/profile'

// Constants
import { KEYS } from '../../../../constants/localStorage'

// API
import axios from 'axios'

// Query String
import { stringify } from 'qs'

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
    pages,
    loading,
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
          disabled={loading}
          page={page}
          count={pages}
          onChange={handleChange}
          color='secondary'
          variant='outlined'  
        />
      </div>
    </div>
  )
}

const SKIP_AMOUNT = 10

const PurchasesTab = () => {
  // Meta info
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            server
            port
          }
        }
      }
    `
  )

  // Always subtract one when getting invoices
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState(0)

  // On initial load assume there are invoices
  const [hasInvoices, setHasInvoices] = useState(true)

  const [auth] = useGlobalState('auth')

  const [token] = useLocalStorage(KEYS.jwt)

  useEffect(() => {
    getInvoices()
  }, [])

  async function getInvoices(offset) {
    
  }

  async function getInvoiceCount() {
    const query = stringify({
      _where: { 'user_eq': auth.id }
    })

    try {
      const data = await axios.get(`http://${site.siteMetadata.server}:${site.siteMetadata.port}/invoices/count?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    } catch (e) {

    }
    
    console.log(query)
    axios.get(`http://${site.siteMetadata.server}:${site.siteMetadata.port}/invoices/count?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((v) => {
      
    }).catch((e) => {
      alert('error items')
      console.log(e.response)
    })
  }

  function _handleChange(e, value) {
    setLoading(true)
    setPage(value)
  }

  return (
    <TabTemplate
      title='Purchase History'
    >
      {
        hasInvoices ? (
          <Timeline
            handleChange={_handleChange}
            page={page}
            pages={pages}
            loading={loading}
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
