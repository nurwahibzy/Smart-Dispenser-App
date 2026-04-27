import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { serverTimestamp } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { AdminData, TambahAdmin, EditAdmin } from "@/types/manage-admins";

export const manageAdminService = {
  getAll: async (): Promise<AdminData[]> => {
    const snapshot = await getDocs(
      query(collection(db, "users"), orderBy("createdAt", "asc")),
    );
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as AdminData[];
  },

  tambah: async (data: TambahAdmin): Promise<void> => {
    const cek = await getDocs(
      query(collection(db, "users"), where("email", "==", data.email)),
    );
    if (!cek.empty) throw new Error("Email sudah digunakan");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await addDoc(collection(db, "users"), {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "admin",
      status: true,
      createdAt: serverTimestamp(),
      updatedAt: null,
    });
  },

  editNama: async (uid: string, data: EditAdmin): Promise<void> => {
    await updateDoc(doc(db, "users", uid), {
      name: data.name,
      updatedAt: serverTimestamp(),
    });
  },

  updateStatus: async (uid: string, newStatus: boolean): Promise<void> => {
    await updateDoc(doc(db, "users", uid), {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
  },
};