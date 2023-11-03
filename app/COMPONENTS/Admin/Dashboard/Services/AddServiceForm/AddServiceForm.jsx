"use client"

import styles from "./AddServiceForm.module.css";
import axios from "axios";
import { useState } from "react";

export default function AddServiceForm({ addService }) {
  const [selectedCategory, setSelectedCategory] = useState("nocateg");

  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const service = {
      name: serviceName,
      price: parseInt(servicePrice, 10),
      duration: parseInt(serviceDuration, 10),
      category: selectedCategory,
    };
    addService(service);
    setServiceName("");
    setServicePrice("");
    setServiceDuration("");
    setSelectedCategory("nocateg");
    console.log("resetted inputs");
  };

  return (
    <form
      onSubmit={() => {
        handleSubmit(event);
      }}
      className={styles.form}
    >
      <input
        onChange={() => {
          setServiceName(event.target.value);
        }}
        className={styles.formInput}
        type="text"
        placeholder="Nome Servizio"
        value={serviceName}
      />
      <input
        onChange={() => {
          setServicePrice(event.target.value);
        }}
        className={styles.formInput}
        type="number"
        placeholder="Prezzo"
        value={servicePrice}
      />
      <input
        onChange={() => {
          setServiceDuration(event.target.value);
        }}
        className={styles.formInput}
        type="number"
        placeholder="Durata in minuti"
        value={serviceDuration}
      />
      <select
        onChange={(event) => {
          setSelectedCategory(event.target.value);
        }}
        className={styles.formInput}
        value={selectedCategory}
      >
        <option value="nocateg"></option>
        <option value="capelli">Capelli</option>
        <option value="barba">Barba</option>
        <option value="servizi">Servizi</option>
        <option value="off">Off</option>
      </select>
      <button
        disabled={
          serviceName === "" ||
          servicePrice === "" ||
          serviceDuration === "" ||
          selectedCategory === "nocateg"
        }
        type="submit"
        className={styles.formBtn}
      >
        AGGIUNGI
      </button>
    </form>
  );
}