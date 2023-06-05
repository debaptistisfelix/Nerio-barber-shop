import styles from "./ResetPassword.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    AOS.init();
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleResetPasswordSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://barber-server.cyclic.app/admin/resetPassword/${id}`,
        {
          password: password,
          passwordConfirm: passwordConfirm,
        }
      );
      console.log(response);
      setError(null);
      setSuccess(true);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setSuccess(false);
      setIsLoading(false);
      console.log(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <section className={styles.resetPage}>
      <main className={styles.resetCard}>
        <div
          data-aos="fade-up"
          data-aos-duration="750"
          className={styles.resetForm}
        >
          <h1 className={styles.title}>PASSWORD RESET</h1>
          {!success && error !== null && (
            <p className={styles.errorParag}>{error}</p>
          )}
          {success && error === null && (
            <p
              data-aos="fade-up"
              data-aos-duration="750"
              className={styles.intro}
            >
              La tua password è stata modificata.
            </p>
          )}
          {!success && error === null && (
            <p className={styles.intro}>Inserisci la tua nuova Password.</p>
          )}
          {success ? (
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={styles.successIcon}
            />
          ) : (
            <form onSubmit={handleResetPasswordSubmit} className={styles.Form}>
              <div className={styles.inputBox}>
                <input
                  onChange={handlePasswordChange}
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  value={password}
                  required
                  placeholder="Nuova Password"
                />
                <FontAwesomeIcon
                  onClick={toggleShowPassword}
                  className={styles.icon}
                  icon={showPassword ? faEyeSlash : faEye}
                />
              </div>
              <div className={styles.inputBox}>
                <input
                  onChange={handlePasswordConfirmChange}
                  type={showPasswordConfirm ? "text" : "password"}
                  className={styles.input}
                  value={passwordConfirm}
                  required
                  placeholder="Conferma Password"
                />
                <FontAwesomeIcon
                  onClick={toggleShowPasswordConfirm}
                  className={styles.icon}
                  icon={showPasswordConfirm ? faEyeSlash : faEye}
                />
              </div>
              <button className={styles.button} type="submit">
                {isLoading ? (
                  <p className={styles.loadingText}>IN ATTESA</p>
                ) : (
                  "CONFERMA"
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </section>
  );
}
