import { ReactElement, ReactNode } from 'react';

// ==============================|| TYPES - LAWYERS  ||============================== //

// types/lawyer.ts

export type Lawyer = {
  _id: string | number | undefined;
  id: string | number | undefined;
  profilePicture: string;
  name: string;    
  firstname?: string; 
  lastname?: string;
  firm: string;
  address: string;
  specialties?: string[];
  description?: string;
  experience?: string;
  rating?: number;
  hourlyRate?: number;
  location?: string;
  languages?: string[];
  details?: string; // Additional details about the lawyer
  created: Date;
  active: boolean; // Whether the lawyer is currently accepting clients
  designation?: string; // Add this line
  specialty?: string; // Add this line
  degree?: string; // Add this line
};


// review for lawyers
export type LawyerReview = {
  id: string | number | undefined;
  rating: number;
  comment: string;
  date: Date | string;
  reviewer: {
    avatar: string;
    name: string;
    status: boolean; // Verified reviewer status
  };
};

// lawyer directory filter
export type LawyerFilter = {
  search: string;
  sort: string;
  specialties: string[];
  locations: string[];
  hourlyRate: string;  // Use a string to represent range like '100-300'
  rating: number;
  firstName?: string; 
  lastName?: string; 
  address?: string; 
  designation?: string; 
  specialty?: string;  
  degree?: string; 
};



// lawyer filter - sort options
export type SortOptionsProps = {
  value: string;
  label: string;
};

// lawyer filter - languages options
export type LanguageOptionsProps = {
  label: string;
  value: string;
};

// payment options for lawyer services
export type PaymentOptionsProps = {
  id: number;
  value: string;
  title: string;
  caption: string;
  image?: string;
  size: {
    width: number;
    height: number;
  };
};

export interface LawyerStateProps {
  lawyers: Lawyer[];
  lawyer: Lawyer | null;
  relatedLawyers: Lawyer[];
  reviews: LawyerReview[];
  specialties: string[]; // Add this line
  error: object | string | null;
  loading: boolean;
}

export interface TabsProps {
  children?: ReactElement | ReactNode | string;
  value: string | number;
  index: number;
}

export interface Address {
  name: string | number;
  id: number;
}
