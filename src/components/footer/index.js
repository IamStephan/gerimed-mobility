import React from 'react'

// Material
import { Button, Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const Title = props => (
  <Typography
    variant='h5'
    color='primary'
  >
    {props.children}
  </Typography>
)

const Text = props => (
  <Typography
    variant='body1'
    color='inherit'
  >
    {props.children}
  </Typography>
)

const Footer = () => {
  return (
    <footer
      className={styles['footer']}
    >
      <div
        className={styles['container']}
      >
        <div
          className={styles['address']}
        >
          <section
            className={styles['section']}
          >
            <Title>
              Gerimed Mobility
            </Title>

            <Text>
              844@Oostewal Building, 
            </Text>
            <Text>
              Oostewal Rd, Langebaan
            </Text>
            <br />
            <Text>
              Tel: 022 772 1273
            </Text>
            <Text>
              Cell: 082 079 4173 
            </Text>
            <br />

            <Button
              disableElevation
              variant='contained'
              color='primary'
            >
              Learn More
            </Button>
          </section>
          <section
            className={styles['section']}
          >
            <Title>
              Gerimed Langebaan
            </Title>
            
            <Text>
              Langebaan Retirement 
            </Text>
            <Text>
              Village, Aftree-Oord
            </Text>
            <br />
            <Text>
              Tel: 022 772 1252 / 2385
            </Text>
            <Text>
              Fax: 022 772 2061 
            </Text>
            <br />

            <Button
              disableElevation
              variant='contained'
              color='primary'
            >
              Visit Gerimed
            </Button>
          </section>
          <section
            className={styles['section']}
          >
            <Title>
              Gerimed Kleinmond
            </Title>

            <Text>
              Kogelpark Retirement
            </Text>
            <Text>
              Village, Botrivier Road
            </Text>
            <br />
            <Text>
              Tel: 028 271 3994
            </Text>
            <Text>
              Fax: 028 271 3488
            </Text>
            <br />

            <Button
              disableElevation
              variant='contained'
              color='primary'
            >
              Visit Gerimed
            </Button>
          </section>
        </div>
        <div
          className={styles['meta']}
        >
          <section
            className={styles['section']}
          >
            <Button
              disableElevation
              color='primary'
            >
              Policies
            </Button>
          </section>

          <section
            className={styles['section']}
          >
            <Typography
              color='primary'
            >
              ©2020 - Gerimed Mobility | All right reserved
            </Typography>
          </section>
        </div>
      </div>
    </footer>
  )
}

export default Footer
