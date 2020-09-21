import React from 'react'

// Orgnisms
import Navbar from '../../organisms/navbar'
import Footer from '../../organisms/footer'

// Styles
import styles from './styles.module.scss'

export const Section = props => {
  const {
    children,
    className,
    gutter = 'bottom',
    gutterSize = 'md',
    isClamped = true,
    isPadded = true,
  } = props

  let addedStyles = ''

  // Builder
  if(className) addedStyles += ' ' + className
  if(isClamped) addedStyles += ' ' + styles['clamped']
  if(isPadded) addedStyles += ' ' + styles['padded']

  return (
    <section
      className={`${styles['section']} ${addedStyles} ${styles['gutter_' + gutter]} ${styles['gutter_' + gutterSize]}`}
    >
      { children }
    </section>
  )
}

/**
 * Content Layout
 * ===============
 * This template is for pages that have a vertical
 * scroll of content and sections
 */
const ContentLayout = props => {
  const {
    children,
    page,
    enableTransMode = false,
    footerMode
  } = props

  let addedStyles = ''

  // Builder
  if(!enableTransMode) addedStyles += ' ' + styles['navNormal']

  return (
    <div
      className={styles['layout']}
    >
      <Navbar
        page={page}
        enableTransMode={enableTransMode}
      />

      <main
        className={`${styles['main']} ${addedStyles}`}
      >
        { children }
      </main>

      <Footer
        footerMode={footerMode}
      />
    </div>
  )
}

export default ContentLayout
