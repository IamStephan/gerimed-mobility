import React from 'react'

// Material
import { Typography, Avatar } from '@material-ui/core'
import { LocalOfferOutlined, HelpOutline, SecurityOutlined, StarsOutlined } from '@material-ui/icons'

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
    <section
      className={styles['benefitSection']}
    >
      <div
        className={styles['benefitContainer']}
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
              Besides offer the best in its class products, we offer a wide range of benefits. Making sure our clients are always happy.
            </Typography>
          </div>
        </div>

        <div
          className={styles['items']}
        >
          <BenefitItem
            title='Exceptional Products'
            description='At the forefront of our proirities is exceptional products. Providing you the best South Africa has to offer.'
          >
            <Avatar
              className={styles['avatar']}
            >
              <StarsOutlined />
            </Avatar>
          </BenefitItem>

          <BenefitItem
            title='Professional Support'
            description='Trained staff and eager to help with a beaming smile. We are just a phone call away from solving your problems.'
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
            title='Secure Payments'
            description='Gerimed Mobility uses secure payment gateways that are PCI complaint. Meaning your payments are completly secure and safe.'
          >
            <Avatar
              className={styles['avatar']}
            >
              <SecurityOutlined />
            </Avatar>
          </BenefitItem>
        </div>
      </div>
    </section>
  )
}

export default Benefit
