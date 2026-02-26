export type TechCategory = 'all' | 'frontend' | 'backend' | 'database' | 'cloud' | 'tools';

export interface Technology {
    name: string;
    src: string;
    category: TechCategory;
    proficiency?: 'Advanced' | 'Intermediate' | 'Novice'; // Restricting values for better type safety
    description?: string; // Optional: for tooltip or future use
}

export interface CategoryOption {
    key: TechCategory;
    label: string;
}
