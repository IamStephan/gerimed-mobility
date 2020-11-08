import React from 'react'

// Templates
import { Section } from '../../templates/content_layout'

// Material
import { Typography, Avatar } from '@material-ui/core'
import { LocalOfferOutlined, HelpOutline, StoreOutlined, StarsOutlined } from '@material-ui/icons'

// Styles
import styles from './styles.module.scss'

const BenefitItem = props => {
  return (
    <div className={styles['item']}>
      {
        props.children
      }

      <Typography
        variant='h5'
        className={styles['title']}
      >
        {props.title}
      </Typography>

      <Typography
        className={styles['text']}
      >
        {props.description}
      </Typography>
    </div>
  )
}

const Benefit = () => {
  return (
    <Section
      className={styles['benefitSection']}
    >
        <div
          className={`${styles['explain']}`}
        >
          <div
            className={styles['content']}
          >
            <Typography
              variant='h3'
              color='secondary'
              className={styles['header']}
            >
              Why Choose Us?
            </Typography>
            <Typography
              variant='subtitle1'
              className={styles['subheader']}
            >
              Besides offering the best in its class products, we offer a wide range of benefits. Making sure our clients are always satisfied.
            </Typography>
          </div>
        </div>

        <div
          className={styles['items']}
        >
          <BenefitItem
            title='Exceptional Products'
            description='At the forefront of our priorities is exceptional products. Providing you with the best South Africa has to offer.'
          >
            <Avatar
              className={styles['avatar']}
            >
              <StarsOutlined />
            </Avatar>
          </BenefitItem>

          <BenefitItem
            title='Professional Support'
            description='Trained staff and eager to help with a beaming smile. We are just a phone call away from solving your problem.'
          >
            <Avatar
              className={styles['avatar']}
            >
              <HelpOutline />
            </Avatar>
          </BenefitItem>

          <BenefitItem
            title='Unbeatable Prices'
            description='With exceptional products and unbeatable prices, you can be assured that every cent you spend at Gerimed Mobility will be worth your money.'
          >
            <Avatar
              className={styles['avatar']}
            >
              <LocalOfferOutlined />
            </Avatar>
          </BenefitItem>

          <BenefitItem
            title='Rentals'
            description='Gerimed Mobility not only sells the best medical products, we also rent some of our products out to our customers.'
          >
            <Avatar
              className={styles['avatar']}
            >
              <StoreOutlined />
            </Avatar>
          </BenefitItem>
        </div>
    </Section>
  )
}

export default Benefit
