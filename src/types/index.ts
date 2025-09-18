// Common TypeScript interfaces for the application

export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: number;
  agency_profile?: any;
}

export interface Agency {
  _id: string;
  agency_name: string;
  description?: string;
  website?: string;
}

export interface JobDetails {
  _id: string;
  assigned_member?: any;
  title?: string;
  description?: string;
  budget?: number;
  status?: string;
}

export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ButtonProps extends ComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
}

export interface FormProps extends ComponentProps {
  onSubmit?: (data: any) => void;
  initialValues?: any;
}

// Redux state interfaces
export interface AuthState {
  isAuthenticated: boolean;
  token?: string;
  user?: User;
}

export interface ProfileState {
  profile?: User;
  agency?: Agency;
  loading: boolean;
}