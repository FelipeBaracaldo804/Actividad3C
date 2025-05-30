export interface FormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
}

export interface FileWithPreview extends File {
  preview?: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}