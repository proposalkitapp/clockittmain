export const SITE_URL = "https://clockitt.app";
export const SITE_NAME = "Clockitt";
export const OG_IMAGE = `${SITE_URL}/og-clockitt.png`;

type MetaEntry = { title?: string; name?: string; property?: string; content?: string };

export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: string;
}): MetaEntry[] {
  const url = `${SITE_URL}${path}`;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: OG_IMAGE },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

export function canonical(path: string) {
  return [{ rel: "canonical" as const, href: `${SITE_URL}${path}` }];
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "Clockitt is an AI-powered goal accountability and alarm software company helping users achieve daily habits and finish tasks through verified photo proof.",
  sameAs: ["https://x.com/clockittapp", "https://tiktok.com/useclockittapp"],
  knowsAbout: [
    "Habit Accountability",
    "Productivity Applications",
    "AI Vision Task Verification",
    "Morning Alarms",
    "Goal Tracking",
  ],
};

export const softwareAppLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: SITE_NAME,
  applicationCategory: "ProductivityApplication",
  applicationSubCategory: "Accountability & Task Management",
  operatingSystem: "iOS, Android, Web",
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  description:
    "Clockitt is an AI-powered accountability app and persistent alarm that requires photo proof verified by Claude Vision AI to silence and complete daily goals.",
  featureList: [
    "AI Photo Proof Verification with Claude Vision",
    "Persistent Un-snoozeable Alarms",
    "Daily Finish Line & Goal Tracking",
    "Accountability Partner Check-ins",
    "Multi-level Streak Momentum Tracking",
    "256-Bit SSL Data Encryption",
  ],
  offers: {
    "@type": "Offer",
    price: "5.00",
    priceCurrency: "USD",
    billingDuration: "P1M",
    description: "Early access founder rate with 3-day free trial ($5/month locked in before public launch).",
  },
};

export const webSiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en-US",
  description:
    "Official website for Clockitt — the AI photo-verified goal accountability and persistent alarm app.",
};

export function webPageLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    datePublished: "2026-09-01",
    dateModified: "2026-09-11",
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function homeGraphLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationLd,
      softwareAppLd,
      webSiteLd,
      webPageLd({
        title: "Clockitt — AI Photo Proof Accountability & Habit Alarm App",
        description:
          "Clockitt is the AI-powered goal accountability app and un-snoozeable alarm that requires verified photo proof to silence. Lock in $5/month founder pricing.",
        path: "/",
      }),
      faqLd(faqs),
    ],
  };
}


