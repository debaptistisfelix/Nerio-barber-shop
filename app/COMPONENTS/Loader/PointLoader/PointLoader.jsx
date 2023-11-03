import styles from "./PointLoader.module.css"

export default function PointLoader({loaderWidth, loaderHeight, pointWidth, pointHeight, pointColor, loaderMargin}) {

    

    return (
        <main
        style={{width: loaderWidth, height: loaderHeight, margin: loaderMargin }}
        className={styles.loader}>
            <div
            style={{width: pointWidth, height: pointHeight, backgroundColor: pointColor }}
            className={`${styles.point} ${styles.point1}`}></div>
            <div 
            style={{width: pointWidth, height: pointHeight, backgroundColor: pointColor }}
            className={`${styles.point} ${styles.point2}`}></div>
            <div
            style={{width: pointWidth, height: pointHeight, backgroundColor: pointColor }}
            className={`${styles.point} ${styles.point3}`}></div>
        </main>
    )
}
