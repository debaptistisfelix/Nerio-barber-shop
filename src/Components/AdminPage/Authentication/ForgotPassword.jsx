import styles from "./ForgotPassword.module.css";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPassword({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://barber-server.cyclic.app/admin/forgotPassword",
        {
          email: email,
        }
      );
      console.log(response);
      setIsLoading(false);
      setError(null);
      setSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
      setSuccess(false);
      console.log(error);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <>
      {success === false ? (
        <form
          onSubmit={handleSubmit}
          data-aos="fade-up"
          data-aos-duration="750"
          className={styles.forgotForm}
        >
          <h1 className={styles.title}>RECUPERO PASSWORD</h1>
          {error === null ? (
            <p className={styles.intro}>
              Inserisci la tua mail per recuperare la tua password.
            </p>
          ) : (
            <p className={styles.errorMsg}>{error}</p>
          )}
          <input
            type="email"
            required
            className={styles.input}
            value={email}
            onChange={handleEmailChange}
          />
          <button className={styles.button} type="submit">
            {isLoading ? (
              <p className={styles.loadingText}>IN ATTESA</p>
            ) : (
              "CONFERMA"
            )}
          </button>
          <p className={styles.outro}>
            Torna al{" "}
            <b onClick={() => toggleForm(1)} className={styles.highlight}>
              login
            </b>
          </p>
        </form>
      ) : (
        <section className={styles.confirmation}>
          <FontAwesomeIcon
            icon={faEnvelopeCircleCheck}
            className={styles.icon}
            data-aos="fade-down"
            data-aos-duration="750"
          />
          <h1
            className={styles.confTitle}
            data-aos="fade-right"
            data-aos-duration="750"
          >
            EMAIL INVIATA
          </h1>
          <p
            data-aos="fade-left"
            data-aos-duration="750"
            data-aos-delay="250"
            className={styles.confIntro}
          >
            Controlla la tua casella di posta elettronica per recuperare la tua
            password.
          </p>
          <p
            data-aos="flip-down"
            data-aos-duration="750"
            data-aos-delay="450"
            className={styles.confOutro}
          >
            Torna al{" "}
            <b
              className={styles.highlight}
              onClick={() => {
                setSuccess(false);
                toggleForm(1);
              }}
            >
              login
            </b>
          </p>
        </section>
      )}
    </>
  );
}
