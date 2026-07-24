import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/messages/types";

type JsonLdProps = {
  locale: Locale;
  messages: Messages;
};

export default function JsonLd({ locale, messages }: JsonLdProps) {
  const { jsonLd } = messages.seo;
  const url = `https://mehmedmuric.com/${locale}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mehmed Muric",
    jobTitle: jsonLd.jobTitle,
    description: jsonLd.personDescription,
    url,
    sameAs: [
      "https://github.com/mehmedmuric",
      "https://linkedin.com/in/mehmed-muric-185297232",
      "https://twitter.com/mehmedmuricc",
    ],
    email: "mehmedmuric22@gmail.com",
    image: "https://mehmedmuric.com/images/logo/mehmed.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Novi Pazar",
      addressCountry: "RS",
    },
    knowsAbout: jsonLd.knowsAbout,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mehmed Muric",
    url,
    description: jsonLd.websiteDescription,
    author: {
      "@type": "Person",
      name: "Mehmed Muric",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
