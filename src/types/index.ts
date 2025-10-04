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

  
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isLink?: boolean;
  linkText?: string;
  linkUrl?: string;
}