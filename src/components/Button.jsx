import React from 'react'
import styles from './Button.module.css'
function Button({type,children,action}) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={action}>
      {children}
    </button>
  )
}

export default Button