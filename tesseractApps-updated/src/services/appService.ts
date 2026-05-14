import apiFetch from "../configs/axiosConfig";

export const sendTextEmail = async (
  email: string,
  subject: string,
  body: string
): Promise<unknown> => {
  try {
    const response = await apiFetch("/send-text-email", {
      method: "POST",
      body: JSON.stringify({ email, subject, body }),
    });
    return response.json();
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
): Promise<unknown> => {
  try {
    const response = await apiFetch("/send-email", {
      method: "POST",
      body: JSON.stringify({ toName, toEmail, subject, textBody, htmlBody }),
    });
    return response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
