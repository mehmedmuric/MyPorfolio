// Utility functions for generating structured data (JSON-LD)

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";

export interface PersonStructuredData {
  name: string;
  image?: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

export function generatePersonStructuredData(person: PersonStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    ...(person.url && { url: person.url }),
    ...(person.image && { image: person.image.startsWith('http') ? person.image : `${baseUrl}${person.image.startsWith('/') ? '' : '/'}${person.image}` }),
    ...(person.jobTitle && { jobTitle: person.jobTitle }),
    ...(person.sameAs && person.sameAs.length > 0 && { sameAs: person.sameAs }),
    ...(person.knowsAbout && person.knowsAbout.length > 0 && { knowsAbout: person.knowsAbout }),
  };
}

export interface ArticleStructuredData {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    image?: string;
    jobTitle?: string;
  };
  url: string;
  keywords?: string[];
}

export function generateArticleStructuredData(article: ArticleStructuredData) {
  const fullImageUrl = article.image.startsWith('http') 
    ? article.image 
    : `${baseUrl}${article.image.startsWith('/') ? '' : '/'}${article.image}`;
  
  const authorImageUrl = article.author.image 
    ? (article.author.image.startsWith('http')
        ? article.author.image
        : `${baseUrl}${article.author.image.startsWith('/') ? '' : '/'}${article.author.image}`)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    image: fullImageUrl,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author.name,
      ...(authorImageUrl && { image: authorImageUrl }),
      ...(article.author.jobTitle && { jobTitle: article.author.jobTitle }),
    },
    publisher: {
      "@type": "Person",
      name: "Mehmed Muric",
      image: `${baseUrl}/images/logo/mehmed.jpg`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    ...(article.keywords && article.keywords.length > 0 && { keywords: article.keywords.join(", ") }),
    articleSection: "Portfolio Projects",
    inLanguage: "en-US",
  };
}

export interface BreadcrumbStructuredData {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function generateBreadcrumbStructuredData(breadcrumb: BreadcrumbStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface WebSiteStructuredData {
  name: string;
  url: string;
  description: string;
  authorName: string;
}

export function generateWebSiteStructuredData(site: WebSiteStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    author: {
      "@type": "Person",
      name: site.authorName,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/projects?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface CollectionPageStructuredData {
  name: string;
  url: string;
  description: string;
  items: Array<{
    name: string;
    url: string;
    image?: string;
    description?: string;
  }>;
}

export function generateCollectionPageStructuredData(collection: CollectionPageStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    url: collection.url,
    description: collection.description,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: collection.items.length,
      itemListElement: collection.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: item.name,
          url: item.url,
          ...(item.image && { 
            image: item.image.startsWith('http') 
              ? item.image 
              : `${baseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`
          }),
          ...(item.description && { description: item.description }),
        },
      })),
    },
  };
}

