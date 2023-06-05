import styles from "./LoginForm.module.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "universal-cookie";
import AOS from "aos";
import "aos/dist/aos.css"; // Optional if you haven't imported it globally

export default function LoginForm({ handleSetLoggedIn, toggleForm }) {
  useEffect(() => {
    AOS.init();
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const cookies = new Cookies();
  const errorRef = useRef(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePaaswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://barber-server.cyclic.app/admin/login",
        {
          username: username,
          password: password,
        }
      );
      const token = response.data.token;
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
      cookies.set("token", token, {
        path: "/admin",
        expires: expirationDate,
        secure: true,
        sameSite: "strict",
      });
      handleSetLoggedIn();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  useEffect(() => {
    if (error !== null) {
      errorRef.current.classList.add(`${styles.errorParagAnimation}`);

      setTimeout(() => {
        errorRef.current.classList.remove(`${styles.errorParagAnimation}`);
      }, 1000);
    }
  }, [error]);

  return (
    <form
      data-aos="fade-up"
      data-aos-duration="750"
      className={styles.loginForm}
    >
      <h1 className={styles.loginTitle}>BENTORNATO</h1>
      {error === null ? (
        <p className={styles.loginIntro}>
          Inserisci le tue credenziali per accedere.
        </p>
      ) : (
        <p
          ref={errorRef}
          className={`${styles.loginIntro} ${styles.errorParag}`}
        >
          {error}
        </p>
      )}
      <div className={styles.loginInputBox}>
        <input
          onChange={handleUsernameChange}
          type="text"
          placeholder="Username"
          value={username}
          className={styles.input}
          required
        />
        <div className={styles.passwordBox}>
          <input
            onChange={handlePaaswordChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.input}
            value={password}
            required
          />
          <FontAwesomeIcon
            onClick={() => setShowPassword(!showPassword)}
            icon={showPassword ? faEyeSlash : faEye}
            className={styles.eyeIcon}
          />
        </div>
        <div className={styles.forgotBox}>
          <a
            onClick={() => {
              toggleForm(3);
            }}
            className={styles.forgotLink}
          >
            Password dimenticata
          </a>
        </div>
      </div>
      <button
        type="submit"
        onClick={handleSubmitLogin}
        className={styles.button}
      >
        LOG IN
      </button>
      <p className={styles.loginOutro}>
        Registra un nuovo{" "}
        <b
          onClick={() => {
            toggleForm(2);
          }}
          className={styles.highlight}
        >
          Admin
        </b>
      </p>
    </form>
  );
}
