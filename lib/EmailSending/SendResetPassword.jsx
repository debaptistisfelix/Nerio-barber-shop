
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendResetPasswordEmail = async (email, resetURL) => {
  const msg = {
    to: email,
    from: "swooshlandcustoms@outlook.com",
    subject: "Password Reset",
    templateId: "d-e38362ed16b44292bd7980bb1c2ad645",
    dynamic_template_data: {
      resetURL,
    },
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

export default  sendResetPasswordEmail;