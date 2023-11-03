"use client"
import {useSession} from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from './AdminSection.module.css'
import PointLoader from '../Loader/PointLoader/PointLoader';
import LoginForm from './LoginForm/LoginForm';
import Dashboard from './Dashboard/Dashboard';
import React from 'react'

export default function AdminSection() {
    const { data: session, status } = useSession();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logUserIn = () => {
      setIsLoggedIn(true);
    }

    useEffect(() => {
      if(session && session.user){
        setIsLoggedIn(true);
      }
    },[session])
    
  return (
    <section className={styles.adminSection}>
        {status === "loading" && <PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"#191919"}
          loaderHeight={"30px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/>}
        {status === "unauthenticated" && isLoggedIn === false  && <LoginForm logUserIn={logUserIn}/>}
        {isLoggedIn === true &&  <Dashboard/>}
    </section>
  )
}
