"use client"

import styles from "./LoginForm.module.css";
import { useState, useEffect, useRef } from "react";
import notify from "@/lib/toastNotify";
import { signIn } from "next-auth/react"
import PointLoader from "../../Loader/PointLoader/PointLoader";




export default function LoginForm({logUserIn}) {
    const [loading, setloading] = useState(false)
 const [data, setData] = useState({
    username: "admin",
    password: "admin",
    });

    const handleInputChange = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (event) => {
        setloading(true)
        event.preventDefault()
        if(!data.username || !data.password) return notify('Inserisci tutti i campi', 'error')
       signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback)=>{
            console.log(callback)
            if(callback.error){
                console.log(callback.error)
                notify("Credenziali non corrette", 'error')
                setloading(false)
            } 

            if(callback?.ok && !callback?.error){
                notify('Login effettuato con successo', 'success')
                setloading(false)
                logUserIn()
            }
        })

      
    }


  return (
   <main className={styles.card}>
    {loading === false &&  <form
      className={styles.loginForm}
    >
      <h1 className={styles.loginTitle}>BENTORNATO</h1>
     
      <div className={styles.loginInputBox}>
        <input
        onChange={handleInputChange}
        name="username"
          type="text"
          placeholder="Username"
            value={data?.username}
          className={styles.input}
          required
        />
          <input
            onChange={handleInputChange}
            name="password"
            type="password"
            placeholder="Password"
            className={styles.input}
            value={data?.password}
            required
          />


       
      </div>
      <div
        type="submit"
        className={styles.button}
        onClick={handleSubmit}
      >
        Login
      </div>
    </form>}
    {loading === true && <PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"#191919"}
          loaderHeight={"30px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/>}
   </main>
  );
}