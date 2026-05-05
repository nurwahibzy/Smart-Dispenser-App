import { Timestamp } from "firebase/firestore";

export interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  createdAt: Timestamp;
  updatedAt?: Timestamp | null;
  photoURL?: string;
  resetToken?: string;
  resetTokenExpiry?: Timestamp | null;
  lastResetRequest?: Timestamp;
}

export interface TambahAdmin {
  name: string;
  email: string;
  password: string;
}

export interface EditAdmin {
  name: string;
}