import React from 'react'

// Styles
import styles from './styles.module.scss'

export function omit(object, keysToOmit) {
  const result = {};

  Object.keys(object).forEach(key => {
    if (keysToOmit.indexOf(key) === -1) {
      result[key] = object[key];
    }
  });

  return result;
}

const PROPS_TO_OMIT = [
  'children',
  'contentClassName',
  'ratio',
  'ratioClassName',
  'style',
  'tagName',
];

const AspectView = props => {
  const {
    children,
    className = '',
    contentClassName = '',
    ratio = 1,
    ratioClassName = '',
    style = {},
    tagName = 'div',
  } = props

  const Tag = tagName;

  const paddingTop = ratio === 0 ? 100 : 100 / ratio;

  return (
    <Tag
      {...omit(props, PROPS_TO_OMIT)}
      className={`${styles['aspectView']} ${className}`}
      style={style}
    >
      <div
        className={`${styles['view']} ${ratioClassName}`}
        style={{
          paddingTop: `${paddingTop}%`,
        }}
      >
        <div
          className={`${styles['content']} ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </Tag>
  )
}

export default AspectView
