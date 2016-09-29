export interface Page<T> {
  content:T[];
  totalPages:number;
  totalElements:number;
}

export interface PageRequest {
  page:number;
  size:number;
}

export interface UserParams {
  email?:string;
  password?:string;
  name?:string;
}
