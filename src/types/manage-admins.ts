import { Timestamp } from "firebase/firestore";

export interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  createdAt: string | Timestamp;
  updatedAt: string | Timestamp| null;
}

export interface TambahAdmin {
  name: string;
  email: string;
  password: string;
}

export interface EditAdmin {
  name: string;
}