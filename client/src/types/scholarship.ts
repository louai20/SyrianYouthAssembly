// types/scholarship.ts
export interface Media {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface FormFieldOption {
  label: string;
  value: string;
}

export type FormFieldType = "text" | "textarea" | "email" | "number" | "date" | "select" | "radio" | "checkbox" | "file";

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
  prefillFrom?: "none" | "fullName" | "email" | "phone";
}

export interface Scholarship {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  deadline: string; // or Date if parsed
  amount?: number;
  coverImage?: Media;
  applyLink?: string;
  formFields?: FormField[];
}
