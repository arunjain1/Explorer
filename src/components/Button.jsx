import React from 'react'
import styles from './Button.module.css'
function Button({type,children,action}) {
  return (
    <div className={`${styles.btn} ${styles[type]}`} onClick={action}>
      {children}
    </div>
  )
}

export default Button