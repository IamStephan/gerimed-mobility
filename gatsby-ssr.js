import React from 'react'

// Components
import Provider from './src/components/provider'

// Styles
import 'sanitize.css'
import './src/utils/reset.scss'

function wrapRootElement ({ element, props }) {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <Provider {...props}>
      {element}
    </Provider>
  )
}

export {
  wrapRootElement
}