import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendBugDetectorMail = async ( email, name, description, path) => {
   
    const msg = {
        to: email,
        from : "swooshlandcustoms@outlook.com",
        subject: "BUG DETECTED",
        templateId: "d-8380e9bd301e40deba7279fc5f4ec780",
        dynamic_template_data: {
            name: name, 
            description: description, 
            website: "Swooshland Customs",
            path: path

        }
    }

    try{
        await sgMail.send(msg);
        console.log("Bug Detector Email sent")
    }
    catch(error){
        console.log(error);
    }
};

export default sendBugDetectorMail;