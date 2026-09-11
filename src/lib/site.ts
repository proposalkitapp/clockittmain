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
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "Clockitt is a productivity and accountability app that helps you wake up, set daily goals, stay accountable, and finish what you start.",
  sameAs: ["https://x.com/clockittapp", "https://tiktok.com/useclockittapp"],
};

export const softwareAppLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "iOS, Android",
  url: SITE_URL,
  description:
    "Accountability app for daily goals, shared check-ins and finishing what you start.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export const webSiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Clockitt is an accountability app that turns a morning alarm into photo-verified goal completions.",
};

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}


