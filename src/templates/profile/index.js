import React from 'react'

// Hooks
import { useInView } from 'react-intersection-observer'

// Components
import Layout from '../../components/layout'

// Constants
import { PAGES } from '../../constants/pages'
import { MODE as NAVMODE} from '../../constants/navbar'
import { MODE as FOOTERMODE} from '../../constants/footer'

// Sections
import User from '../../sections/user'
import Showcase from '../../sections/userShowcase'

// Styles
import styles from './styles.module.scss'

const ProfileTemplate = () => {
  /**
   * NOTE:
   * ======
   * Used for switching navbar style
   */
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.45,
  })

  return (
    <Layout
      page={PAGES.profile}
      navMode={inView ? NAVMODE.trans : NAVMODE.normal}
      footerMode={FOOTERMODE.curve}
    >
      <div
        ref={ref}
        className={styles['transDetecter']}
      />
      <Showcase />
      <User />
    </Layout>
  )
}

export default ProfileTemplate
