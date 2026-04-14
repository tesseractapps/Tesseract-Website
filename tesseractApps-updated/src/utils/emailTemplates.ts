export const newsletterConfirmationEmailTemplate = {
  subject: "Thank You for Subscribing!",
  text: (name: string) => `Hi ${name},\n
        \n
         Thank you for subscribing to the TesseractApps newsletter! We’re excited to\n   
keep you updated with the latest news, insights, and updates about NDIS\n   
software solutions and best practices.\n
        \n
        You can expect to receive regular updates directly in your inbox, including tips \n 
to optimise your services, new feature announcements, and exclusive offers.\n
\n
If you have any questions or suggestions, feel free to reach out to us at  \n
marketing@tesseractapps.com  \n
\n 
Welcome to the TesseractApps community! \n
\n
        Team TesseractApps\n
        [Our Website: www.tesseractapps.com.au]\n
        [+61261332819,02 6133 2800] | [marketing@tesseractapps.com]\n
        \n
        `,
  html: (name: string) => `
    <div>
    <div>Hi ${name},</div>
    <p>Thank you for subscribing to the TesseractApps newsletter! We’re excited to   
keep you updated with the latest news, insights, and updates about NDIS   
software solutions and best practices.</p>
    <p>You can expect to receive regular updates directly in your inbox, including tips   
to optimise your services, new feature announcements, and exclusive offers.  </p>
<p>If you have any questions or suggestions, feel free to reach out to us at   
marketing@tesseractapps.com  </p>
<p>Welcome to the TesseractApps community!  </p>
    <div>
    <p>Best regards,</p>
        <p>Team TesseractApps</p>
        <div>[Our Website: <a href="https://www.tesseractapps.com.au">TesseractApps</a>]</div>
        <div>✆;[<a href="tel:+61261332819">+61261332819</a>,<a href="tel:+61261332800">02 6133 2800</a>] 📧 [<a href="mailto:marketing@tesseractapps.com?subject=Inquiry">marketing@tesseractapps.com</a>]</div>
    </div>
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
  text: (fullName: string,date: string,time: string) => `Dear ${fullName},\n
      \n
      Thank you for booking a demo with TesseractApps! We’re excited to show you how our platform can help you save time, reduce audit risks, and simplify your processes
      \n
      Demo Details:\n
      •	Date: ${date}\n
      •	Time: ${time}\n
      If you have any questions or need to reschedule, simply reply to this email or contact us at:\n
      •	Phone: 1300 252 808 \n
      •	Email: sales@tesseractapps.com\n
      We look forward to demonstrating how TesseractApps can support your organisation.\n
      Best regards,\n
      Team TesseractApps\n
      [Our Website: www.tesseractapps.com.au]\n
      [+61261332819,02 6133 2800] | [sales@tesseractapps.com]`,
  html: (fullName: string,date: string,time: string) => `
    <div>Dear ${fullName},</div>
    <p>Thank you for booking a demo with TesseractApps! We’re excited to show you how our platform can help you save time, reduce audit risks, and simplify your processes.</p>
    <p><strong>Demo Details:</strong></p>
    <ul>
      <li><strong>Date: ${date}</strong></li>
      <li><strong>Time: ${time}</strong></li>
    </ul>
    <p>If you have any questions or need to reschedule, simply reply to this email or contact us at:</p>
    <ul>
      <li><strong>Phone: 1300 252 808</strong></li>
      <li><strong>Email: sales@tesseractapps.com</strong></li>
    </ul>
    <p>We look forward to demonstrating how TesseractApps can support your organisation.</p>
    <div>
    <p>Warm regards,</p>
        <p>Team TesseractApps</p>
        <div>[Our Website: <a href="https://www.tesseractapps.com.au">TesseractApps</a>]</div>
        <div>✆;[<a href="tel:+61261332819">+61261332819</a>,<a href="tel:+61261332800">02 6133 2800</a>] 📧 [<a href="mailto:sales@tesseractapps.com?subject=Inquiry">sales@tesseractapps.com</a>]</div>
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
  subject: "Thank You for Signing Up! We've Received Your Details",
  text: (firstName: string) => `Hi ${firstName},\n
    \n
      Thank you for signing up with TesseractApps!\n
      We've received your details and our team is currently reviewing them. One of our representatives will get in touch with you soon to guide you through the next steps.\n
      If you have any immediate questions, feel free to reach out to us at [sales@tesseractapps.com] or call us at [+61261332819, 1300 252 808].\n
      We're excited to connect with you soon!\n
      \n
      Warm regards,\n
      Team TesseractApps\n
      [Our Website: www.tesseractapps.com.au]\n
      [+61261332819,02 6133 2800] | [sales@tesseractapps.com]\n
      `,

  html: (firstName: string) => `
    <div>Hi ${firstName},</div>
    <p>Thank you for signing up with TesseractApps!</p>
    <p>We've received your details and our team is currently reviewing them. One of our representatives will get in touch with you soon to guide you through the next steps.
      If you have any immediate questions, feel free to reach out to us at [sales@tesseractapps.com] or call us at [+61261332819, 1300 252 808].
      We're excited to connect with you soon!
      Warm regards</p>
    <div>
    <p>Warm regards,</p>
        <p>Team TesseractApps</p>
        <div>[Our Website: <a href="https://www.tesseractapps.com.au">TesseractApps</a>]</div>
        <div>✆;[<a href="tel:+61261332819">+61261332819</a>,<a href="tel:+61261332800">02 6133 2800</a>] 📧 [<a href="mailto:sales@tesseractapps.com?subject=Inquiry">sales@tesseractapps.com</a>]</div>
    </div>
    `,
};
