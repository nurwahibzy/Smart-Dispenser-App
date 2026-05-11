export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  createdAt: string;
  updatedAt: string | null;
  photoURL?: string;
}

export interface EditNamaPayload {
  name: string;
}

export interface GantiPasswordPayload {
  passwordLama: string;
  passwordBaru: string;
  konfirmasi: string;
}
