import React, { useState, useEffect } from 'react'

// Material
import { Alert, AlertTitle } from '@material-ui/lab'
import { Button, CircularProgress } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons'

// Hooks
import { useLocalStorage } from 'react-use'
import { useSnackbar } from 'notistack'

// Constants
import { KEYS } from '../../../../constants/localStorage'
import { INVOICE_VIEW_STATE } from '../../../../constants/profile'

// API
import { GetPurchaseHistoryCount, GetPurchaseHistory } from '../../../../api/user'

// Components
import Timeline from './components/timeline'

// Template
import TabTemplate from '../../components/tabTemplate'

// Styles
import styles from './styles.module.scss'

const OFFSET_AMOUNT = 5

const PurchasesTab = props => {
  const {
    site
  } = props

  const { enqueueSnackbar } = useSnackbar()

  // Always subtract one when getting invoices
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [invoices, setInvoices] = useState([])

  const [currentView, setCurrentView] = useState(INVOICE_VIEW_STATE.loading)

  const [token] = useLocalStorage(KEYS.jwt)


  useEffect(() => {
    // Count the total invoices
    countMyInvoices()
  }, [])

  async function countMyInvoices() {
    const results = await GetPurchaseHistoryCount({
      server: site.siteMetadata.server,
      protocol: site.siteMetadata.protocol,
      port: site.siteMetadata.port
    }, {
      token
    })

    results.notis.forEach(({ message }) => {
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    if(results.type === 'success') {
      const { data: { data: amount } } = results

      if(amount > 0) {
        const totalPages = Math.ceil(amount / OFFSET_AMOUNT)

        setTotalPages(totalPages)
        loadInvoices(currentPage - 1)
      } else {
        setCurrentView(INVOICE_VIEW_STATE.empty)
      }
    } else {
      setCurrentView(INVOICE_VIEW_STATE.error)
    }
  }

  async function loadInvoices(offset) {
    const results = await GetPurchaseHistory({
      server: site.siteMetadata.server,
      protocol: site.siteMetadata.protocol,
      port: site.siteMetadata.port
    }, {
      offset,
      limit: OFFSET_AMOUNT,
      token
    })

    results.notis.forEach(({ message }) => {
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    if(results.type === 'success') {
      const {data: {data: loadedInvoices}} = results

      setInvoices(loadedInvoices)

      setCurrentView(INVOICE_VIEW_STATE.show)
    } else {
      setCurrentView(INVOICE_VIEW_STATE.error)
    }
  }

  async function handlePageChange(e, page) {
    // Prevent unnecessary api calls
    if(currentPage === page) return

    setCurrentView(INVOICE_VIEW_STATE.loading)

    const newCurrentPage = page

    // Load new set of invoices and wait
    await loadInvoices((newCurrentPage - 1) * OFFSET_AMOUNT)
    setCurrentPage(newCurrentPage)
  }

  function View() {
    switch(currentView) {
      case INVOICE_VIEW_STATE.loading: {
        return (
          <div
            className={styles['loading']}
          >
            <CircularProgress
              color='secondary'
            />
          </div>
        )
      }

      case INVOICE_VIEW_STATE.empty: {
        return (
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
            You do not have a purchase history yet.
          </Alert>
        )
      }

      case INVOICE_VIEW_STATE.error: {
        return (
          <Alert
            variant='outlined'
            severity='error'
            icon={<InfoOutlined />}
            action={
              <Button
                color='inherit'
              >
                Retry
              </Button>
            }
          >
            <AlertTitle
              className={styles['alertTitle']}
            >
              Something went wrong
            </AlertTitle>
            Your invoice history could not be displayed.
          </Alert>
        )
      }

      case INVOICE_VIEW_STATE.show: {
        return (
          <Timeline
            invoices={invoices}
            totalPages={totalPages}
            currentPage={currentPage}

            handlePageChange={handlePageChange}
            site={site}
          />
        )
      }
    }
  }

  return (
    <TabTemplate
      title='Purchase History'
    >
      <View />    
    </TabTemplate>
  )
}

export default PurchasesTab
