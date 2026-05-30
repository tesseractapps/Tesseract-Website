// Analytics event helpers — all push to window.dataLayer (GTM)

// ── Tier 1: Conversion events ─────────────────────────────────────────────────

export function trackBookDemoSubmit(data: { email: string; firstName: string; lastName: string }) {
  window.dataLayer?.push({
    event: "book_demo_form_submit",
    user_data: {
      email: data.email,
      address: { first_name: data.firstName, last_name: data.lastName },
    },
  });
}

export function trackBeginJourneySubmit(data: {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}) {
  window.dataLayer?.push({
    event: "begin_journey_form_submit",
    user_data: {
      email: data.email,
      phone_number: data.phone,
      address: { first_name: data.firstName, last_name: data.lastName },
    },
  });
}

export function trackRegisterSCSubmit(data: {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  teamSize: string;
  currentSoftware: string;
}) {
  window.dataLayer?.push({
    event: "register_sc_form_submit",
    user_data: {
      email: data.email,
      address: { first_name: data.firstName, last_name: data.lastName },
    },
    form_data: {
      role: data.role,
      team_size: data.teamSize,
      current_software: data.currentSoftware,
    },
  });
}

export function trackContactFeedbackSubmit(feedbackType: string) {
  window.dataLayer?.push({
    event: "contact_feedback_submit",
    feedback_type: feedbackType,
  });
}

export function trackNewsletterSubscribe() {
  window.dataLayer?.push({
    event: "newsletter_subscribe",
  });
}

// ── Tier 2: CTA click events ──────────────────────────────────────────────────

export type CTAType = "book_demo" | "begin_journey" | "register_interest";
export type CTALocation =
  | "hero"
  | "why_now"
  | "start"
  | "footer_cta"
  | "nav"
  | "pricing"
  | "sc_pricing"
  | "sc_pricing_hero_demo"
  | "sc_pricing_cta"
  | "sc_pricing_esign"
  | "platform_hero"
  | "platform_bottom"
  | "competitor_hero"
  | "competitor_bottom"
  | "contact"
  | "sc_hero"
  | "sc_bottom"
  | "capability"
  | "solution"
  | "blog_cta";

export function trackCTAClick(ctaType: CTAType, location: CTALocation, sourcePage: string) {
  window.dataLayer?.push({
    event: "cta_click",
    cta_type: ctaType,
    cta_location: location,
    source_page: sourcePage,
  });
}

// ── Tier 3: Form funnel events ────────────────────────────────────────────────

export type FormName = "book_demo" | "signup";

const BOOK_DEMO_STEP_NAMES: Record<number, string> = {
  0: "org_type",
  1: "contact_details",
  2: "schedule",
};

const SIGNUP_STEP_NAMES: Record<number, string> = {
  0: "company_details",
  1: "personal_details",
  2: "terms",
};

export function trackFormStepComplete(formName: FormName, step: number) {
  const stepNames = formName === "book_demo" ? BOOK_DEMO_STEP_NAMES : SIGNUP_STEP_NAMES;
  window.dataLayer?.push({
    event: "form_step_complete",
    form_name: formName,
    step: step + 1,
    step_name: stepNames[step] ?? `step_${step + 1}`,
  });
}

export function trackFormStart(formName: FormName) {
  window.dataLayer?.push({
    event: "form_start",
    form_name: formName,
  });
}

// ── Tier 4: Content engagement events ────────────────────────────────────────

export function trackBlogPostView(data: {
  title: string;
  slug: string;
  category?: string;
}) {
  window.dataLayer?.push({
    event: "blog_post_view",
    content_title: data.title,
    content_slug: data.slug,
    content_category: data.category ?? "uncategorised",
  });
}

export function trackCapabilityView(data: { name: string; slug: string }) {
  window.dataLayer?.push({
    event: "capability_page_view",
    content_title: data.name,
    content_slug: data.slug,
  });
}

export function trackSolutionView(data: { name: string; slug: string }) {
  window.dataLayer?.push({
    event: "solution_page_view",
    content_title: data.name,
    content_slug: data.slug,
  });
}

export function trackWhitepaperDownload(title: string) {
  window.dataLayer?.push({
    event: "whitepaper_download",
    content_title: title,
  });
}
