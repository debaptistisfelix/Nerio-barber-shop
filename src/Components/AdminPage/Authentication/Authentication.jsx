import styles from "./Authentication.module.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";

export default function Authentication({ handleSetLoggedIn }) {
  const [displayedForm, setDisplayedForm] = useState(1);

  const toggleForm = (num) => {
    setDisplayedForm(num);
  };
  return (
    <section className={styles.authContainer}>
      <main className={styles.authCard}>
        {displayedForm === 1 && (
          <LoginForm
            handleSetLoggedIn={handleSetLoggedIn}
            toggleForm={toggleForm}
          />
        )}

        {displayedForm === 2 && (
          <SignUpForm
            toggleForm={toggleForm}
            handleSetLoggedIn={handleSetLoggedIn}
          />
        )}
        {displayedForm === 3 && <ForgotPassword toggleForm={toggleForm} />}
      </main>
    </section>
  );
}
