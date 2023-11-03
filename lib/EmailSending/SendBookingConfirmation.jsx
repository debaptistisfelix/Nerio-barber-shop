import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendBookingConfirmationEmail = async (
  email,
  name,
  localDate,
  localTime,
  barber,
  serviceList,
  cancelURL,
  newBookingId
) => {
  const msg = {
    to: email,
    from: "swooshlandcustoms@outlook.com",
    subject: "CONFERMA PRENOTAZIONE",
    templateId: "d-f223d2bbb99c49e3a22edd9fe6888903",
    dynamic_template_data: {
      name,
      barber,
      localDate,
      localTime,
      serviceList,
      cancelURL,
      newBookingId,
    },
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

export default  sendBookingConfirmationEmail;