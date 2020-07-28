import React, { useState } from 'react'

// Gatsby
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

// Styles
import styles from './styles.module.scss'

const testimonialData = [
  {
    logoRelativePath: '',
    name: '',
    date: '',
    qoute: ''
  }
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  //const images = useStaticQuery(graphql``)

  return (
    <section>
      <div>
        <div>

        </div>

        <div>

        </div>
      </div>
    </section>
  )
}

export default Testimonials
