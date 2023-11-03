import styles from "./FullScreenLoader.module.css"
import PointLoader from "../../Loader/PointLoader/PointLoader"
import React from 'react'

export default function FullScreenLoader() {
  return (
    <div className={styles.loaderContainer}>
        <PointLoader
            pointWidth={"20px"} pointHeight={"20px"} pointColor={"white"}
            loaderHeight={"50px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/>
    </div>
  )
}
