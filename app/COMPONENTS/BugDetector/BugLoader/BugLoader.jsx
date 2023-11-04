import styles from './BugLoader.module.css';

export default function BugLoader({circleColor}) {
  return (
    <main  className={styles.wrapperContainer}>
    <section className={styles.wrapper}>
    <div style={{backgroundColor: circleColor}} className={styles.circle}></div>
    <div style={{backgroundColor: circleColor}} className={styles.circle}></div>
    <div style={{backgroundColor: circleColor}} className={styles.circle}></div>
    <div className={styles.shadow}></div>
    <div className={styles.shadow}></div>
    <div className={styles.shadow}></div>
    </section>
</main>
  )
}