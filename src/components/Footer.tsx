import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>Created by Anastasiia ✨</p>
        <span className={styles.sub}>
          Movie Explorer · React + TypeScript
        </span>
      </div>
    </footer>
  )
}

export default Footer