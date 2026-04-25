type feedbackTypes = {
  name: string;
  email: string;
  type: string;
  message: string;
};

export const feedbackEmailTemplate = {
  email: "marketing@tesseractapps.com",
  subject: "Website Feedback – TesseractApps",
  body: ({ name, email, type, message }: feedbackTypes) =>
    `New feedback received from the website.\n\nName: ${name}\nEmail: ${email}\nType: ${type}\n\nMessage:\n${message}\n\nTeam TesseractApps\n`,
};

export const feedbackConfirmationEmailTemplate = {
  subject: "We've Received Your Feedback — TesseractApps",
  text: (name: string) => `Hi ${name},

Thank you for reaching out! We've received your feedback and our team will review it shortly.

If you have any urgent questions, feel free to contact us at:
  Phone: 1300 252 808
  Email: marketing@tesseractapps.com

Warm regards,
Team TesseractApps
Website: www.tesseractapps.com.au
Phone: 1300 252 808 | Email: marketing@tesseractapps.com`,
  html: (name: string) => `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:600px">
      <p>Hi ${name},</p>
      <p>Thank you for reaching out! We've received your feedback and our team will review it shortly.</p>
      <p>If you have any urgent questions, feel free to contact us at <a href="mailto:marketing@tesseractapps.com">marketing@tesseractapps.com</a> or call <a href="tel:1300252808">1300 252 808</a>.</p>
      <p>Warm regards,<br/><strong>Team TesseractApps</strong></p>
      <p>Website: <a href="https://www.tesseractapps.com.au">www.tesseractapps.com.au</a><br/>
      Phone: <a href="tel:1300252808">1300 252 808</a> | Email: <a href="mailto:marketing@tesseractapps.com">marketing@tesseractapps.com</a></p>
    </div>`,
};

export const newsletterConfirmationEmailTemplate = {
  subject: "Thank You for Subscribing to TesseractApps!",
  text: () => `Hi there,

Thank you for subscribing to the TesseractApps newsletter! We’re excited to keep you updated with the latest news, insights, and updates about NDIS software solutions and best practices.

You can expect to receive regular updates directly in your inbox, including tips to optimise your services, new feature announcements, and exclusive offers.

If you have any questions or suggestions, feel free to reach out to us at marketing@tesseractapps.com.

Welcome to the TesseractApps community!

Best regards,
Team TesseractApps
Website: tesseractapps.com.au
Phone: 1300 252 808 | Email: marketing@tesseractapps.com
`,
  html: () => `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:600px">
      <p>Hi there,</p>
      <p>Thank you for subscribing to the TesseractApps newsletter! We’re excited to keep you updated with the latest news, insights, and updates about NDIS software solutions and best practices.</p>
      <p>You can expect to receive regular updates directly in your inbox, including tips to optimise your services, new feature announcements, and exclusive offers.</p>
      <p>If you have any questions or suggestions, feel free to reach out to us at <a href="mailto:marketing@tesseractapps.com">marketing@tesseractapps.com</a>.</p>
      <p>Welcome to the TesseractApps community!</p>
      <p>Best regards,<br/><strong>Team TesseractApps</strong></p>
      <p>Website: <a href="https://tesseractapps.com.au">tesseractapps.com.au</a><br/>
      Phone: <a href="tel:1300252808">1300 252 808</a> | Email: <a href="mailto:marketing@tesseractapps.com">marketing@tesseractapps.com</a></p>
    </div>`,
};

export const newsletterSubscriptionEmailTemplate = {
  email: "sales@tesseractapps.com",
  subject: "Request for newsletter subscription",
  body: (
    email: string,
  ) => `${email} has requested a subscription for our newsletter.\n
        Email: ${email}\n
        \n
        Team TesseractApps\n`,
};

type requestTypes = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  areas: string;
  preferredTime: string;
};

export const bookDemoEmailTemplate = {
  email: "sales@tesseractapps.com",
  subject: "Request for Demo",
  body: ({
    fullName,
    email,
    phone,
    organisation,
    role,
    areas,
    preferredTime,
  }: requestTypes) => `${fullName} has requested a demo.\n
        Full Name: ${fullName}\n
        Email: ${email}\n
        Phone: ${phone}\n
        Organisation: ${organisation}\n
        Role: ${role}\n
        Areas of Interest: ${areas}\n
        Preferred Time: ${preferredTime}\n
        \n
        Team TesseractApps\n
        `,
};

export const bookDemoConfirmationEmailTemplate = {
  subject: "Your TesseractApps Demo Is Confirmed",
  text: (fullName: string, date: string, time: string) => `Dear ${fullName},

Thank you for booking a demo with TesseractApps! We’re excited to show you how our platform can help you save time, reduce audit risks, and simplify your processes.

Demo Details:
  Date: ${date}
  Time: ${time} (AEST)

If you have any questions or need to reschedule, simply reply to this email or contact us at:
  Phone: 1300 252 808
  Email: sales@tesseractapps.com

We look forward to demonstrating how TesseractApps can support your organisation.

Warm regards,
Team TesseractApps
Website: tesseractapps.com.au
Phone: 1300 252 808 | Email: sales@tesseractapps.com`,
  html: (fullName: string, date: string, time: string) => `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:600px">
      <p>Dear ${fullName},</p>
      <p>Thank you for booking a demo with TesseractApps! We’re excited to show you how our platform can help you save time, reduce audit risks, and simplify your processes.</p>
      <p><strong>Demo Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time} (AEST)</li>
      </ul>
      <p>If you have any questions or need to reschedule, simply reply to this email or contact us at:</p>
      <ul>
        <li><strong>Phone:</strong> <a href="tel:1300252808">1300 252 808</a></li>
        <li><strong>Email:</strong> <a href="mailto:sales@tesseractapps.com">sales@tesseractapps.com</a></li>
      </ul>
      <p>We look forward to demonstrating how TesseractApps can support your organisation.</p>
      <p>Warm regards,<br/><strong>Team TesseractApps</strong></p>
      <p>Website: <a href="https://tesseractapps.com.au">tesseractapps.com.au</a><br/>
      Phone: <a href="tel:1300252808">1300 252 808</a> | Email: <a href="mailto:sales@tesseractapps.com">sales@tesseractapps.com</a></p>
    </div>
  `,
};

type signupTypes = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  abn: string;
  industry: string;
  features: string;
  otherFeature: string;
  preference: string;
};
export const signupEmaiTemplate = {
  email: "sales@tesseractapps.com",
  subject: "Request for free trial signup",
  body: ({
    firstName,
    lastName,
    phone,
    email,
    company,
    abn,
    industry,
    features,
    otherFeature,
    preference,
  }: signupTypes) => `${firstName} has made a request for free trial signup.\n
                First Name: ${firstName}\n
                Last Name: ${lastName}\n
                Phone: ${phone}\n
                Email: ${email}\n
                
                Company: ${company}\n
                ABN: ${abn}\n
                
                Industry: ${industry}\n
                Features: ${features}\n
                Other Features: ${otherFeature}\n
                Preference: ${preference}
                \n
                Team TesseractApps\n
                `,
};
export const signupConfirmationEmailTemplate = {
  subject: "We've Received Your Details — TesseractApps",
  text: (firstName: string) => `Hi ${firstName},

Thank you for signing up with TesseractApps!

We've received your details and our team is currently reviewing them. One of our representatives will get in touch with you soon to guide you through the next steps.

If you have any immediate questions, feel free to reach out to us at sales@tesseractapps.com or call us at 1300 252 808.

We're excited to connect with you soon!

Warm regards,
Team TesseractApps
Website: tesseractapps.com.au
Phone: 1300 252 808 | Email: sales@tesseractapps.com
`,

  html: (firstName: string) => `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:600px">
      <p>Hi ${firstName},</p>
      <p>Thank you for signing up with TesseractApps!</p>
      <p>We've received your details and our team is currently reviewing them. One of our representatives will get in touch with you soon to guide you through the next steps.</p>
      <p>If you have any immediate questions, feel free to reach out to us at <a href="mailto:sales@tesseractapps.com">sales@tesseractapps.com</a> or call us at <a href="tel:1300252808">1300 252 808</a>.</p>
      <p>We're excited to connect with you soon!</p>
      <p>Warm regards,<br/><strong>Team TesseractApps</strong></p>
      <p>Website: <a href="https://tesseractapps.com.au">tesseractapps.com.au</a><br/>
      Phone: <a href="tel:1300252808">1300 252 808</a> | Email: <a href="mailto:sales@tesseractapps.com">sales@tesseractapps.com</a></p>
    </div>
    `,
};
