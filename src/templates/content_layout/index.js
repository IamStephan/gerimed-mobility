import React, { useRef, createContext, useState, useEffect } from 'react'

// Orgnisms
import Navbar from '../../organisms/navbar'
import Footer from '../../organisms/footer'

// Hooks
import { useLayout } from '../../hooks/useLayout'
import { useInView } from 'react-intersection-observer'

// Constants
import { MODE as NAVMODES } from '../../constants/navbar'

// Styles
import styles from './styles.module.scss'

// Context
export const LayoutContext = createContext()

export const Section = props => {
  const {
    children,
    className,
    gutter = 'bottom',
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
      className={`${styles['section']} ${addedStyles} ${styles['gutter_' + gutter]}`}
    >
      { children }
    </section>
  )
}

export const NavbarDetector = () => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.45,
  })

  const {
    navMode,
    setNavMode
  } = useLayout()

  useEffect(() => {
    if(navMode === NAVMODES.trans && !inView) {
      setNavMode(NAVMODES.normal)
    } else if(navMode === NAVMODES.normal && inView) {
      setNavMode(NAVMODES.trans)
    }
    
  }, [inView])

  return (
    <div
      ref={ref}
      className={styles['detector']}
    />
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
    isNavNormal = true, // <== Assume that the navbar is in normal mode
    footerMode
  } = props

  // Nav State
  const [peek, setPeek] = useState(true)
  const [navMode, setNavMode] = useState(() => isNavNormal ? NAVMODES.normal : NAVMODES.trans) // <== initial render (TEST)

  let addedStyles = ''

  // Builder
  if(isNavNormal) addedStyles += ' ' + styles['navNormal']

  return (
    <LayoutContext.Provider
      value={{
        peek,
        setPeek,
        navMode,
        setNavMode
      }}
    >
      <div
        className={styles['layout']}
      >
        <Navbar
          page={page}
          navMode={navMode}
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
    </LayoutContext.Provider>
  )
}

export default ContentLayout
