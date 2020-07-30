import React from 'react'

// Material
import { Avatar, Typography } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const CustomerItem = props => {
  return (
    <div
      className={styles['customer']}
    >
      {
        props.children
      }

      <Typography
        className={styles['text']}
      >
        {props.testimonial}
      </Typography>

      <Typography
        className={styles['person']}
        variant='caption'
      >
        {props.person}
      </Typography>
    </div>
  )
}

const Testimonials = () => {
  return (
    <section
      className={styles['testimonialSection']}
    >
      <div
        className={styles['testimonialContainer']}
      >
        <Typography
          className={styles['title']}
          variant='h3'
          color='secondary'
        >
          Customer Satisfaction
        </Typography>
        <div className={styles['items']}>
          <CustomerItem
            testimonial='Gerimed Mobility, provided me with all my mobility needs at the fraction of the price. The staff members are alsways there to help and very friendly.'
            person='Stephan Burger, Avvent Studio'
          >
            <Avatar
              className={styles['avatar']}
            />
          </CustomerItem>

          <CustomerItem
            testimonial='Once you buy from them you can fully relax. They handle everything and make sure the product gets to you. They are the only place I buy medical supplies from'
            person='Armin Nel, Avvent Studio'
          >
            <Avatar
              className={styles['avatar']}
            />
          </CustomerItem>

          <CustomerItem
            testimonial='Once you buy from them you can fully relax. They handle everything and make sure the product gets to you. They are the only place I buy medical supplies from'
            person='John Doe, LifeWorx'
          >
            <Avatar
              className={styles['avatar']}
            />
          </CustomerItem>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
