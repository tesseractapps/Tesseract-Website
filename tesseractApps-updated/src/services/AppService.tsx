import API from "../configs/AxiosConfig";

export const sendTextEmail = async (
  email: string,
  subject: string,
  body: string
) => {
  try {
    const response = await API.post("/send-text-email", {
      email,
      subject,
      body,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendEmail = async (
  toName: string,
  toEmail: string,
  subject: string,
  textBody: string,
  htmlBody: string
) => {
  try {
    const response = await API.post("/send-email", {
      toName,
      toEmail,
      subject,
      textBody,
      htmlBody,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
