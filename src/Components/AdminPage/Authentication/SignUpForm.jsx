import styles from "./SignUpForm.module.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "universal-cookie";
import useInputState from "../../Hooks/useInputState";
import AOS from "aos";
import "aos/dist/aos.css"; // Optional if you haven't imported it globally

export default function SignUpForm({ toggleForm, handleSetLoggedIn }) {
  useEffect(() => {
    AOS.init();
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [username, handleUsernameChange, resetUsername] = useInputState("");
  const [email, handleEmailChange, resetEmail] = useInputState("");
  const [password, handlePasswordChange, resetPassword] = useInputState("");
  const [passwordConfirm, handlePasswordConfirmChange, resetPasswordConfirm] =
    useInputState("");
  const cookies = new Cookies();
  const [error, setError] = useState(null);
  const errorRef = useRef(null);

  useEffect(() => {
    if (error !== null) {
      errorRef.current.classList.add(`${styles.errorParagAnimation}`);

      setTimeout(() => {
        errorRef.current.classList.remove(`${styles.errorParagAnimation}`);
      }, 1000);
    }
  }, [error]);

  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://barber-server.cyclic.app/admin/signup",
        {
          username: username,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
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
      }, 3000);
    }
  };

  return (
    <form
      data-aos="fade-up"
      data-aos-duration="750"
      className={styles.signupForm}
    >
      <h1 className={styles.signupTitle}>BENVENUTO</h1>
      {error !== null && (
        <p
          ref={errorRef}
          className={`${styles.signUpIntro} ${styles.errorParag}`}
        >
          {error}
        </p>
      )}
      <div className={styles.signupInputBox}>
        <input
          onChange={handleUsernameChange}
          type="text"
          placeholder="Username"
          className={styles.input}
          value={username}
          required
        />
        <input
          value={email}
          onChange={handleEmailChange}
          type="email"
          placeholder="Email"
          className={styles.input}
          required
        />
        <div className={styles.passwordBox}>
          <input
            value={password}
            onChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.input}
            required
          />
          <FontAwesomeIcon
            onClick={() => setShowPassword(!showPassword)}
            icon={showPassword ? faEyeSlash : faEye}
            className={styles.eyeIcon}
          />
        </div>
        <div className={styles.passwordBox}>
          <input
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            type={showPasswordConfirm ? "text" : "password"}
            placeholder="Conferma Password"
            className={styles.input}
            required
          />
          <FontAwesomeIcon
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            icon={showPasswordConfirm ? faEyeSlash : faEye}
            className={styles.eyeIcon}
          />
        </div>
      </div>
      <button
        onClick={handleSubmitSignup}
        type="submit"
        className={styles.button}
      >
        REGISTRATI
      </button>
      <p className={styles.signupOutro}>
        Gia Registrato?{" "}
        <b
          onClick={() => {
            toggleForm(1);
          }}
          className={styles.highlight}
        >
          Log in
        </b>
      </p>
    </form>
  );
}
