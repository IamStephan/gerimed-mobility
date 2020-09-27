import React from 'react'

// Material
import { Button, Typography, Link as Btn } from '@material-ui/core'

// Gatsby
import { Link } from 'gatsby'

// Constants
import { MODE } from '../../constants/footer'

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

const Footer = props => {
  const {
    footerMode = MODE.curve
  } = props

  return (
    <footer
      className={`${styles['footer']} ${styles[footerMode]}`}
    >
      {
        footerMode === MODE.curve ? (
          <div
            className={styles['topDivider']}
          >
            <svg
              data-name="Layer 1" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
            >
                <path
                  d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
                  class={styles['shapeFill']}/>
            </svg>
          </div>
        ) : null
      }

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
          className={styles['legal']}
        >
          <section
            className={styles['section']}
          >
            <Typography
              color='primary'
            >
              <Btn
                component={Link}
                to='/terms'
              >
                Terms and Conditions
              </Btn>
            </Typography>
          </section>

          <section
            className={styles['section']}
          >
            <Typography
              color='primary'
            >
              <Btn
                component={Link}
                to='/policies'
              >
                Privacy Policies
              </Btn>
            </Typography>
          </section>

          <section
            className={styles['section']}
          >
            <Typography
              color='primary'
            >
              <Btn
                component={Link}
                to='/return'
              >
                Return Policy
              </Btn>
            </Typography>
          </section>
        </div>

        <div
          className={styles['meta']}
        >
          <section
            className={styles['section']}
          >
            <Typography>
              ©2020 - Gerimed Mobility | All right reserved
            </Typography>
          </section>
        </div>
      </div>
    </footer>
  )
}

Footer.default = {
  footerMode: MODE.normal
}

export default Footer
