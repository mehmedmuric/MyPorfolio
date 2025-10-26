export type Brand = {
  id: number;
  name: string;
  href: string;
  image: string;
  imageLight?: string;
  issued?: string;      // datum izdavanja
  platform?: string;    // gde je kurs završen
  description?: string; // kratak opis kursa
};
