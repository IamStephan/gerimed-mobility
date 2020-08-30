import React from 'react'

// Templates
import { Section } from '../../templates/content_layout'

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
    <Section
      className={styles['testimonialSection']}
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
    </Section>
  )
}

export default Testimonials
