import React from 'react'

// Material
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, ButtonGroup, Button } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const Summary = props => {
  const {
    handleNext,
    handlePrev,
    cart
  } = props

  const [currentCart] = cart

  return (
    <div
      className={styles['summary']}
    >
      <TableContainer
        className={styles['table']}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>

              <TableCell align='right'>
                <b>Price</b>
              </TableCell>

              <TableCell align='right'>
                <b>Discount</b>
              </TableCell>

              <TableCell align='center'>
                <b>Quantity</b>
              </TableCell>

              <TableCell align='right'>
                <b>Total</b>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <div
        className={styles['actions']}
      >
        <ButtonGroup
          color='secondary'
          disableElevation
          variant='outlined'
        >
          <Button
            onClick={handlePrev}
          >
            Prev
          </Button>

          <Button
            onClick={handleNext}
            variant='contained'
          >
            Next
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Summary
