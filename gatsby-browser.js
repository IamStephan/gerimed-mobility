import React from 'react'

// Components
import Provider from './src/organisms/provider'

// Styles
import 'sanitize.css'
import './src/utils/reset.scss'

/**
 * NOTE TO SELF:
 * =============
 * This runs in the browser on initial load of the page
 * And can lead to some unexpected bugs if the component
 * state is required immediately
 */

/**
* TODO
* =====
* - Remove duplicates that are not needed
*/

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