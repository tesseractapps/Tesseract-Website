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
    email: string
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
  subject: "TesseractApps request for Demo",
  text: (fullName: string) => `Dear ${fullName},\n
      \n
      Thank you for your request.\n
        We have received your request for a demo and will be in touch within one business day.
      \n
      Best regards,\n
      Team TesseractApps\n
      [Our Website: www.tesseractapps.com.au]\n
      [+61261332819,02 6133 2800] | [sales@tesseractapps.com]`,
  html: (fullName: string) => `
    <div>Dear ${fullName},</div>
    <p>Thank you for your request.</p>
    <p>We have received your request for a demo and will be in touch within one business day.</p>
    <div>
    <p>Warm regards,</p>
        <p>Team TesseractApps</p>
        <div>[Our Website: <a href="https://www.tesseractapps.com.au">TesseractApps</a>]</div>
        <div>✆;[<a href="tel:+61261332819">+61261332819</a>,<a href="tel:+61261332800">02 6133 2800</a>] 📧 [<a href="mailto:sales@tesseractapps.com?subject=Inquiry">sales@tesseractapps.com</a>]</div>
    </div>
  `,
};

export const expertTalkEmailTemplate = {
  email: "sales@tesseractapps.com",
  subject: "Request for talk to an expert",
  body: ({
    fullName,
    email,
    phone,
    organisation,
    role,
    areas,
    preferredTime,
  }: requestTypes) => `${fullName} has made a request to talk to an expert.\n
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

export const expertTalkConfirmationEmailTemplate = {
  subject: "TesseractApps request to talk to an expert",
  text: (fullName: string) => `Dear ${fullName},\n
      \n
      Thank you for your request.\n
        We have received your request. Our Expert will be in touch within one business day.
      \n
      Best regards,\n
      Team TesseractApps\n
      [Our Website: www.tesseractapps.com.au]\n
      [+61261332819,02 6133 2800] | [sales@tesseractapps.com]`,
  html: (fullName: string) => `
    <div>Dear ${fullName},</div>
    <p>Thank you for your request.</p>
    <p>We have received your request. Our Expert will be in touch within one business day.</p>
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
type expoRegisterTypes = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organisation: string;
  role: string;
  consent: string;
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
      Thank you for signing up with Tesseract Apps!\n
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
    <p>Thank you for signing up with Tesseract Apps!</p>
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

export const expoRegistrationEmailTemplate = {
  subject: "You’re Registered: Melbourne NDIS Expo with TesseractApps",
  text: (firstName: string) => `
Hi ${firstName},\n
Thank you for registering your interest in the Melbourne NDIS Expo 2025. We’re excited to connect with you at Australia’s leading event for NDIS providers, participants, and support professionals.\n
Here’s what you can look forward to:\n
- Exclusive Expo Offer – available only to registered attendees.\n
- Live Demos – experience TesseractApps in action.\n
- Insights & Networking – discover how technology can simplify NDIS compliance, payroll, rosters, and participant management.\n
- Event Updates – we’ll keep you informed as the expo date approaches.\n
Event Details:\n
Location: Melbourne Convention & Exhibition Centre\n
Date: 21st – 22nd November 2025\n
Time: 9am – 3pm\n
Actions:\n
- View Event Details: [Insert link here]\n
- Save to Calendar: [Insert link here]\n
We’ll be in touch soon with more details about your exclusive offer and how to make the most of your expo experience.\n
Warm regards,\n
The TesseractApps Team\n
Website: https://www.tesseractapps.com.au\n
Contact: marketing@tesseractapps.com
`,
  html: (firstName: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Melbourne NDIS Expo Registration</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #f5f5f5;
        padding: 15px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #004aad;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-top: none;
        border-radius: 0 0 8px 8px;
      }
      .cta-button {
        display: inline-block;
        background-color: #004aad;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 6px;
        margin-top: 20px;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Hi ${firstName},</div>
      <div class="content">
        <p>Thank you for registering your interest in the <strong>Melbourne NDIS Expo 2025</strong>. We’re excited to connect with you at Australia’s leading event for NDIS providers, participants, and support professionals.</p>

        <p>Here’s what you can look forward to:</p>
        <ul>
          <li><strong>Exclusive Expo Offer</strong> – available only to registered attendees.</li>
          <li><strong>Live Demos</strong> – experience TesseractApps in action.</li>
          <li><strong>Insights & Networking</strong> – discover how technology can simplify NDIS compliance, payroll, rosters, and participant management.</li>
          <li><strong>Event Updates</strong> – we’ll keep you informed as the expo date approaches.</li>
        </ul>

        <p><strong>Event Details:</strong></p>
        <p>
          Location: Melbourne Convention & Exhibition Centre<br>
          Date: 21st – 22nd November 2025<br>
          Time: 9am – 3pm
        </p>

        <p>
          <a href="#" class="cta-button">View Event Details</a>
          &nbsp;
          <a href="#" class="cta-button">Save to Calendar</a>
        </p>

        <p>We’ll be in touch soon with more details about your exclusive offer and how to make the most of your expo experience.</p>

        <p>Warm regards,<br>
        The TesseractApps Team<br>
        <a href="https://www.tesseractapps.com.au">Website</a> | <a href="mailto:marketing@tesseractapps.com?subject=Inquiry">Contact Us</a></p>
      </div>
      
    </div>
  </body>
</html>
`,
};

export const expoSalesEmailTemplate = {
  email: "marketing@tesseractapps.com",
  subject: "Registered: Melbourne NDIS Expo 21st – 22nd November 2025",
  body: ({
    firstName,
    lastName,
    phone,
    email,
    organisation,
    role,
    consent,
  }: expoRegisterTypes) => `${firstName} has made a registered for Melbourne NDIS Expo 21st – 22nd November 2025.\n\n
                First Name: ${firstName}\n
                Last Name: ${lastName}\n
                Phone: ${phone}\n
                Email: ${email}\n
                Organisation: ${organisation}\n
                Role: ${role}\n
                Consent: ${consent}\n\n
                Team TesseractApps\n
                `,
};
