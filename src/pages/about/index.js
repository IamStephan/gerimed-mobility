import React from 'react'

// Components
import Layout from '../../components/layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE} from '../../constants/navbar'
import { MODE as FOOTERMODE} from '../../constants/footer'

// SVGS
import Logo from '../../svg/logo_green.svg'

// Styles
import styles from './styles.module.scss'

const About = () => {
  return (
    <Layout
      page={PAGES.about}
      navMode={NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      <Logo />
    </Layout>
  )
}

export default About
