export interface Link {
    id: string;
    title: string;
    href: string;
    brand: string;
    src: string;
  }

  export interface SelectedLink {
    isActive: boolean;
    index: number;
    src: string;
  }