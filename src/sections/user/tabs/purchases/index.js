import React, { useState, useEffect } from 'react'

// Material
import { Alert, AlertTitle } from '@material-ui/lab'
import { Button, CircularProgress } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons'

// Hooks
import { useSnackbar } from 'notistack'

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

  // function View() {
  //   switch(currentView) {
  //     case INVOICE_VIEW_STATE.loading: {
  //       return (
  //         <div
  //           className={styles['loading']}
  //         >
  //           <CircularProgress
  //             color='secondary'
  //           />
  //         </div>
  //       )
  //     }

  //     case INVOICE_VIEW_STATE.empty: {
  //       return (
  //         <Alert
  //           variant='outlined'
  //           severity='success'
  //           icon={<InfoOutlined />}
  //           action={
  //             <Button
  //               color='inherit'
  //             >
  //               Shop
  //             </Button>
  //           }
  //         >
  //           <AlertTitle
  //             className={styles['alertTitle']}
  //           >
  //             No History
  //           </AlertTitle>
  //           You do not have a purchase history yet.
  //         </Alert>
  //       )
  //     }

  //     case INVOICE_VIEW_STATE.error: {
  //       return (
  //         <Alert
  //           variant='outlined'
  //           severity='error'
  //           icon={<InfoOutlined />}
  //           className={styles['alertError']}
  //           action={
  //             <Button
  //               color='inherit'
  //             >
  //               Retry
  //             </Button>
  //           }
  //         >
  //           <AlertTitle
  //             className={styles['alertTitle']}
  //           >
  //             Something went wrong
  //           </AlertTitle>
  //           Your invoice history could not be displayed.
  //         </Alert>
  //       )
  //     }

  //     case INVOICE_VIEW_STATE.show: {
  //       return (
  //         <Timeline
  //           invoices={invoices}
  //           totalPages={totalPages}
  //           currentPage={currentPage}

  //           handlePageChange={handlePageChange}
  //           site={site}
  //         />
  //       )
  //     }
  //   }
  // }

  return (
    <TabTemplate
      title='Purchase History'
    >
      {/* <View /> */}
      <div>
        sd
      </div>
    </TabTemplate>
  )
}

export default PurchasesTab
