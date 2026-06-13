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
type registerTypes = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organisation: string;
  abn: string;
  role: string;
  teamSize: string;
  currentSoftware: string;
  anythingElse: string;
  marketingConsent: boolean;
};

export const registerEmailTemplate = {
  email: "sales@tesseractapps.com",
  subject: "New Support Coordination Early Access Registration — TesseractApps",
  body: ({
    firstName,
    lastName,
    email,
    phone,
    organisation,
    abn,
    role,
    teamSize,
    currentSoftware,
    anythingElse,
    marketingConsent,
  }: registerTypes) => `New support coordination early access registration received.\n
        First Name: ${firstName}\n
        Last Name: ${lastName}\n
        Email: ${email}\n
        Phone: ${phone}\n
        Organisation: ${organisation}\n
        ABN: ${abn || "Not provided"}\n
        Role: ${role}\n
        Team Size: ${teamSize}\n
        Current Software: ${currentSoftware || "Not provided"}\n
        Anything else: ${anythingElse || "Not provided"}\n
        Marketing Consent: ${marketingConsent ? "Yes" : "No"}\n
        \n
        Team TesseractApps\n
        `,
};

export const registerConfirmationEmailTemplate = {
  subject:
    "Congratulations! You're registered - 3 months free when SC launches",
  text: (firstName: string) => `Hi ${firstName},

Thank you so much for registering for your exclusive access to TesseractApps Support Coordination app.

Here's what you've secured:
  - 3 months free access when the platform launches - full features, no restrictions
  - Priority onboarding - our team will set up your organisation before general release
  - Launch notification - you'll be first to know

We're building the support coordination platform that connects everything - caseloads, goals, service agreements, invoicing, claims, and compliance - in one system. No more juggling Xero, spreadsheets, and email.

In the meantime:
  - Want to see our existing platform? Book a demo: https://tesseractapps.com.au/book-a-demo
  - Have questions? Reply to this email or call 1300 252 808

We'll be in touch with progress updates.

The TesseractApps Team
tesseractapps.com.au | 1300 252 808
`,
  html: (firstName: string) => `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:600px">
      <p>Hi ${firstName},</p>
      <p>Thank you so much for registering for your exclusive access to TesseractApps Support Coordination app.</p>
      <p><strong>Here's what you've secured:</strong></p>
      <ul>
        <li><strong>3 months free access</strong> when the platform launches - full features, no restrictions</li>
        <li><strong>Priority onboarding</strong> - our team will set up your organisation before general release</li>
        <li><strong>Launch notification</strong> - you'll be first to know</li>
      </ul>
      <p>We're building the support coordination platform that connects everything - caseloads, goals, service agreements, invoicing, claims, and compliance - in one system. No more juggling Xero, spreadsheets, and email.</p>
      <p><strong>In the meantime:</strong></p>
      <ul>
        <li>Want to see our existing platform? <a href="https://tesseractapps.com.au/book-a-demo">Book a demo</a></li>
        <li>Have questions? Reply to this email or call <a href="tel:1300252808">1300 252 808</a></li>
      </ul>
      <p>We'll be in touch with progress updates.</p>
      <p><strong>The TesseractApps Team</strong><br/>
      <a href="https://tesseractapps.com.au">tesseractapps.com.au</a> | <a href="tel:1300252808">1300 252 808</a></p>
    </div>
  `,
};

type guideAccessTypes = {
  fullName: string;
  email: string;
  organisation: string;
  role: string;
  phone: string;
  providerType: string;
  subscribe: boolean;
  privacyConsent: boolean;
  guideTitle: string;
};

export const guideAccessEmailTemplate = {
  email: "marketing@tesseractapps.com",
  subject: (guideTitle: string) => `Guide Download — ${guideTitle}`,
  body: ({
    fullName,
    email,
    organisation,
    role,
    phone,
    providerType,
    subscribe,
    guideTitle,
  }: guideAccessTypes) =>
    `New guide download request from the website.\n\n` +
    `Guide: ${guideTitle}\n\n` +
    `Full Name: ${fullName}\n` +
    `Email: ${email}\n` +
    `Organisation: ${organisation}\n` +
    `Role / Job Title: ${role || "Not provided"}\n` +
    `Phone: ${phone || "Not provided"}\n` +
    `Provider Type: ${providerType}\n` +
    `Subscribe to updates: ${subscribe ? "Yes" : "No"}\n\n` +
    `Team TesseractApps\n`,
};

export const guideAccessConfirmationEmailTemplate = {
  subject: (guideTitle: string) => `Your TesseractApps Guide — ${guideTitle}`,
  text: (
    firstName: string,
    guideTitle: string,
    pdfUrl: string,
  ) => `Hi ${firstName},

Thank you for downloading "${guideTitle}" from TesseractApps.

Your download should have started automatically. If it didn't, use the link below:
${pdfUrl}

If you have any questions, reach us at marketing@tesseractapps.com or call 1300 252 808.

Warm regards,
Team TesseractApps
Website: tesseractapps.com.au`,
  html: (firstName: string, guideTitle: string, pdfUrl: string) => `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:600px">
      <p>Hi ${firstName},</p>
      <p>Thank you for downloading <strong>"${guideTitle}"</strong> from TesseractApps.</p>
      <p>Your download should have started automatically. If it didn't, <a href="${pdfUrl}" style="color:#0c78ba;font-weight:600;">click here to download</a>.</p>
      <p>If you have any questions, feel free to reach us at <a href="mailto:marketing@tesseractapps.com">marketing@tesseractapps.com</a> or call <a href="tel:1300252808">1300 252 808</a>.</p>
      <p>Warm regards,<br/><strong>Team TesseractApps</strong></p>
      <p><a href="https://tesseractapps.com.au">tesseractapps.com.au</a></p>
    </div>`,
};

// ── Adelaide Expo 2026 ────────────────────────────────────────────────────────

type adelaideExpoTypes = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  teamSize: string;
  providerType: string;
  attendDays: string[];
  currentSystems: string;
  hearAbout: string;
  commsConsent: boolean;
};

export const adelaideExpoEmailTemplate = {
  email: "marketing@tesseractapps.com",
  subject:
    "New Expo Registration — Adelaide Disability & WorkAbility Expo 2026",
  body: ({
    fullName,
    email,
    phone,
    organisation,
    role,
    teamSize,
    providerType,
    attendDays,
    currentSystems,
    hearAbout,
    commsConsent,
  }: adelaideExpoTypes) =>
    `New registration for the Adelaide Disability & WorkAbility Expo 2026.\n\n` +
    `Full Name: ${fullName}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone || "Not provided"}\n` +
    `Organisation: ${organisation}\n` +
    `Role: ${role}\n` +
    `Team Size: ${teamSize}\n` +
    `Provider Type: ${providerType || "Not provided"}\n` +
    `Days Attending: ${attendDays.join(", ") || "Not specified"}\n` +
    `Current Systems: ${currentSystems || "Not provided"}\n` +
    `How they heard about us: ${hearAbout || "Not provided"}\n` +
    `Comms Consent: ${commsConsent ? "Yes" : "No"}\n\n` +
    `Team TesseractApps\n`,
};

export const adelaideExpoConfirmationEmailTemplate = {
  subject: (_firstName: string) =>
    `You're registered — TesseractApps, Adelaide Expo 2026`,
  text: (firstName: string) => `Hi ${firstName},

Thank you for registering. Your place is confirmed — all the details you need are below.

Event details

Date: Friday 26 June & Saturday 27 June 2026
Time: 9am – 3pm
Location: Adelaide Showground, Leader Street, Wayville SA 5034
Booth: 8

You're entered into the prize draw

Your registration automatically includes one entry.

Add this event to your calendar:
Download .ics file: https://tesseractapps.com.au/events/adelaide-expo-2026
Add to Google Calendar: https://calendar.google.com/calendar/render?action=TEMPLATE&text=Adelaide+Disability+%26+WorkAbility+Expo+2026&dates=20260626T090000/20260627T150000&details=TesseractApps+Booth+8&location=Adelaide+Showground%2C+Leader+Street%2C+Wayville+SA+5034

If you have any questions prior to the event, please contact us at marketing@tesseractapps.com

We look forward to seeing you there.

Kind regards,
The Marketing Team
TesseractApps

This email was sent to you because you registered for the Adelaide Disability & WorkAbility Expo 2026. If you believe this is an error, please contact us at marketing@tesseractapps.com`,

  html: (firstName: string) => {
    const gcalUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=Adelaide+Disability+%26+WorkAbility+Expo+2026" +
      "&dates=20260626T090000/20260627T150000" +
      "&details=TesseractApps+Booth+8+-+Adelaide+Expo+2026" +
      "&location=Adelaide+Showground%2C+Leader+Street%2C+Wayville+SA+5034";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TesseractApps//AdelaideExpo2026//EN",
      "BEGIN:VEVENT",
      "UID:adelaide-expo-2026@tesseractapps.com.au",
      "SUMMARY:Adelaide Disability & WorkAbility Expo 2026 — TesseractApps Booth 8",
      "DTSTART:20260626T090000",
      "DTEND:20260627T150000",
      "LOCATION:Adelaide Showground, Leader Street, Wayville SA 5034",
      "DESCRIPTION:TesseractApps Booth 8. Register & Win 12 Months Free. See our NDIS platform in action.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const icsDataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

    return `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:600px">
      <p>Hi ${firstName},</p>
      <p>Thank you for registering. Your place is confirmed — all the details you need are below.</p>

      <table style="width:100%;border-collapse:collapse;margin:24px 0;background:#f8fafc;border-radius:8px;overflow:hidden">
        <tr>
          <td style="padding:16px 20px;border-bottom:1px solid #e8edf4">
            <strong style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#a0aec0">Date</strong><br/>
            <span style="color:#002a52;font-weight:600">Friday 26 June &amp; Saturday 27 June 2026</span>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 20px;border-bottom:1px solid #e8edf4">
            <strong style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#a0aec0">Time</strong><br/>
            <span style="color:#002a52;font-weight:600">9am – 3pm</span>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 20px;border-bottom:1px solid #e8edf4">
            <strong style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#a0aec0">Location</strong><br/>
            <span style="color:#002a52;font-weight:600">Adelaide Showground</span><br/>
            <span style="color:#718096;font-size:14px">Leader Street, Wayville SA 5034</span>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 20px">
            <strong style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#a0aec0">Our Booth</strong><br/>
            <span style="color:#002a52;font-weight:600">Booth 8</span>
          </td>
        </tr>
      </table>

      <p style="background:#f0f7ff;border:1px solid #bce0f5;border-radius:8px;padding:14px 18px;color:#002a52;font-size:14px">
        🏆 <strong>You're entered into the prize draw.</strong> Your registration automatically includes one entry.
      </p>

      <p><strong>Add this event to your calendar:</strong></p>
      <p>
        <a href="${icsDataUri}" style="display:inline-block;background:#0c78ba;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:14px;margin-right:8px">
          Download .ics file
        </a>
        <a href="${gcalUrl}" target="_blank" style="display:inline-block;background:#fff;color:#0c78ba;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:14px;border:1.5px solid #0c78ba">
          Add to Google Calendar
        </a>
      </p>

      <p style="font-size:14px;color:#718096;margin-top:32px">
        If you have any questions prior to the event, please contact us at
        <a href="mailto:marketing@tesseractapps.com" style="color:#0c78ba">marketing@tesseractapps.com</a>
      </p>
      <p>We look forward to seeing you there.</p>
      <p>
        Kind regards,<br/>
        <strong>The Marketing Team</strong><br/>
        TesseractApps<br/>
        <a href="https://tesseractapps.com.au" style="color:#0c78ba">tesseractapps.com.au</a>
      </p>
      <hr style="border:none;border-top:1px solid #e8edf4;margin:32px 0"/>
      <p style="font-size:11px;color:#a0aec0;line-height:1.6">
        This email was sent to you because you registered for the Adelaide Disability &amp; WorkAbility Expo 2026.
        If you believe this is an error, please contact us at
        <a href="mailto:marketing@tesseractapps.com" style="color:#a0aec0">marketing@tesseractapps.com</a>
      </p>
    </div>`;
  },
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
