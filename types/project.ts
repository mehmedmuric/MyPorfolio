export type ProjectAuthor = {
  name: string;
  image: string;
  designation: string;
};

export type Project = {
  id: number;
  title: string;
  paragraph: string;
  paragraph2?: string;
  image: string;
  author: ProjectAuthor;
  tags: string[];
  publishDate: string;
  gitlink?: string;
  livedemo?: string;
  coverImage?: string;
  excerpt?: string;
  description?: string;
  /** Short value proposition shown on cards and featured sections */
  valueProposition?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  /** Bullet points for case study key features */
  keyFeatures?: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  featured?: boolean;
};

/** @deprecated Prefer `Project` — kept for gradual migration of Blog-named UI */
export type Blog = Project;
