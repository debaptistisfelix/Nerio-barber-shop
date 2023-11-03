import styles from "./Terms.module.css";

export default function Terms() {
  return (
    <section className={styles.termsContainer}>
      <div className={styles.shader}></div>
      <main className={styles.content}>
        <h1 className={styles.title}>Termini e Condizioni d'uso</h1>
        <div className={styles.scrollableContent}>
          <p className={styles.parag}>
          Grazie per aver scelto il nostro servizio di prenotazione online presso il nostro barber-shop. Desideriamo informarti in modo chiaro e trasparente sulla raccolta e la cancellazione dei tuoi dati personali, che includono l'identità e i dati di contatto del titolare del trattamento e, ove applicabile, del suo rappresentante. Ti preghiamo di leggere attentamente i seguenti termini e condizioni che disciplinano l'utilizzo dei tuoi dati personali da parte nostra:
          </p>
          <h3 className={styles.subtitle}>1. Raccolta dei dati personali

</h3>
          <p className={styles.parag}>
          1.1. Quando effettui una prenotazione tramite il nostro servizio online, ti chiederemo di fornire il tuo nome e indirizzo email. Questi dati sono necessari per inviarti la conferma della prenotazione e per comunicare eventuali modifiche o informazioni importanti relative al tuo appuntamento presso il nostro salone di barbiere.
          </p>

          <p className={styles.parag}>1.2. La raccolta di questi dati personali avviene esclusivamente con il tuo consenso esplicito. Accedendo al nostro servizio di prenotazione online e fornendo le informazioni richieste, acconsenti alla raccolta e all'utilizzo dei tuoi dati personali come descritto in questi Termini e Condizioni.</p>

          <h3 className={styles.subtitle}>2. Utilizzo dei dati personali

</h3> 

<p className={styles.parag}>
2.1. I tuoi dati personali verranno utilizzati esclusivamente per le seguenti finalità:
</p>

<ul className={styles.list}>
  <li>Inviarti la conferma della prenotazione e comunicazioni relative al tuo appuntamento presso il nostro salone di barbiere.</li>
  <li>Comunicare eventuali modifiche o informazioni importanti riguardanti i nostri servizi o orari di apertura.</li>
  <li>Garantire un servizio di prenotazione efficiente e personalizzato.</li>

</ul>
<p className={styles.parag}>
2.2. I tuoi dati personali non verranno utilizzati per scopi di marketing o condivisi con terze parti senza il tuo consenso esplicito.
</p>

<h3 className={styles.subtitle}>3. Cancellazione dei dati personali</h3>
<p className={styles.parag}>
3.1. Per garantire la tua privacy e la sicurezza dei tuoi dati personali, ci impegniamo a cancellare definitivamente i tuoi dati dal nostro database entro 24 ore dal tuo appuntamento presso il nostro barber-shop.
</p>

<p className={styles.parag}>3.2. Una volta cancellati, i tuoi dati personali non saranno più accessibili o ripristinabili. Ti preghiamo di notare che ciò significa che non saremo in grado di fornirti una copia dei tuoi dati personali dopo la cancellazione.</p>
<h3 className={styles.subtitle}>4. Sicurezza dei dati personali</h3>
<p className={styles.parag}>4.1. Ci impegniamo a proteggere i tuoi dati personali da accessi non autorizzati, modifiche o divulgazioni mediante l'adozione di adeguate misure di sicurezza.</p>
<p className={styles.parag}>4.2. Nonostante le misure di sicurezza adottate, desideriamo sottolineare che nessuna trasmissione di dati su Internet o archiviazione elettronica è completamente sicura. Pertanto, non possiamo garantire la sicurezza assoluta dei tuoi dati personali durante la trasmissione o l'archiviazione.</p>

<p className={styles.parag}>
Come interessato del trattamento dei tuoi dati personali hai il diritto di chiederci:
</p>

<ul className={styles.list}>
  <li>la conferma che sia o meno in corso un trattamento dei tuoi dati personali e, in tal caso, di ottenerne
l’accesso (diritto di accesso);
</li>
<li>la rettifica dei tuoi dati personali inesatti, o l’integrazione dei tuoi dati personali incompleti (diritto di
rettifica);</li>
<li>
la cancellazione dei tuoi dati, se sussiste uno dei motivi previsti dal Regolamento (diritto all'oblio);
</li>
<li>
la
limitazione del trattamento dei tuoi dati quando ricorre una delle ipotesi previste dal Regolamento
(diritto di limitazione);
</li>
<li>
di ricevere in un formato strutturato, di uso comune e leggibile da dispositivo automatico i tuoi dati e
di trasmettere, ove tecnicamente possibile, tali dati a un altro titolare del trattamento (diritto alla
portabilità).
</li>
<li>
il diritto di revocare il consenso al trattamento dei tuoi dati, in qualsiasi momento, senza pregiudicare
la liceità del trattamento basata sul consenso prestato prima della revoca e di opporti in qualsiasi
momento al trattamento per finalità di marketing o diversa finalità ulteriori (diritto di opposizione);
</li>
<li>
il diritto di opporti, per motivi legittimi, al trattamento dei tuoi dati anche qualora pertinenti allo scopo
della raccolta;
</li>
<li>
il diritto di opporti al trattamento dei tuoi dati ai fini di invio di materiale pubblicitario o di vendita
diretta o per il compimento di ricerche di mercato o di comunicazioni commerciali.
</li>
</ul>

<p className={styles.parag}>Accettando questi Termini e Condizioni, riconosci di aver letto e compreso le nostre politiche sulla raccolta e cancellazione dei dati personali e acconsenti al loro utilizzo come descritto. In caso di domande o dubbi riguardo alla nostra politica sulla privacy, ti invitiamo a contattarci.</p>


        </div>
      </main>
    </section>
  );
}