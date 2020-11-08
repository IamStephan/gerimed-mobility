import React from 'react'

// Material
import { Typography, Avatar } from '@material-ui/core'
import { Storefront, PhoneOutlined, EmailOutlined, StoreOutlined } from '@material-ui/icons'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss'

const Info = props => {
  return (
    <div
      className={styles['item']}
    >
      <div
        className={styles['icon']}
      >
        <Avatar
          className={styles['avatar']}
        >
          {props.icon}
        </Avatar>
      </div>

      <div
        className={styles['info']}
      >
        {props.info}
      </div>
    </div>
  )
}

const ContactSection = () => {
  return (
    <Section
      className={styles['contactSection']}
      gutter='both'
    >
      <div
        className={styles['left']}
      >
        <Typography
          variant='h3'
          color='secondary'
          className={styles['title']}
        >
          Feel free to contact us. We are excited to hear from you!
        </Typography>
      </div>

      <div
        className={styles['right']}
      >
        <Info
          icon={( <Storefront /> )}

          info={(
            <>
              <Typography>
                844@Oostewal Building,
              </Typography>
              <Typography>
                Oostewal Rd, Langebaan
              </Typography>
            </>
          )}
        />

        <Info
          icon={( <StoreOutlined /> )}

          info={(
            <>
              <Typography>
                Mon to Fri: 09:00 - 17:00
              </Typography>
              <Typography>
                Sat: 09:00 - 13:00
              </Typography>
            </>
          )}
        />

        <Info
          icon={( <PhoneOutlined /> )}

          info={(
            <>
              <Typography>
                Tel: 022 772 1273
              </Typography>
              <Typography>
                Cell: 082 079 4173
              </Typography>
            </>
          )}
        />

        <Info
          icon={( <EmailOutlined /> )}

          info={(
            <>
              <Typography>
                info@gerimedmobility.co.za
              </Typography>
              <Typography>
                carel@gerimed.co.za
              </Typography>
            </>
          )}
        />
      </div>
    </Section>
  )
}

export default ContactSection
