export type Testimonial = {
  id: string;
  name: string;
  role?: string | null;
  comment: string;
  image?: string | null;
  createdAt?: string | Date;
};
