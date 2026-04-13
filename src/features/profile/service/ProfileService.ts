import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import bcrypt from "bcryptjs";

export const profileService = {
  getProfile: async (uid: string) => {
    const snap = await getDoc(doc(db, "users", uid));

    if (!snap.exists()) throw new Error("Profil tidak ditemukan");

    const data = snap.data();

    return {
      id: snap.id,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },

  editNama: async (uid: string, name: string) => {
    await updateDoc(doc(db, "users", uid), {
      name,
      updatedAt: serverTimestamp(),
    });
  },

  editEmail: async (uid: string, email: string) => {
    await updateDoc(doc(db, "users", uid), {
      email,
      updatedAt: serverTimestamp(),
    });
  },

  gantiPassword: async (
    uid: string,
    passwordLama: string,
    passwordBaru: string,
  ) => {
    const snap = await getDoc(doc(db, "users", uid));

    if (!snap.exists()) throw new Error("User tidak ditemukan");

    const user = snap.data();

    const cocok = await bcrypt.compare(passwordLama, user.password);
    if (!cocok) throw new Error("Password lama salah");

    const hashed = await bcrypt.hash(passwordBaru, 10);

    await updateDoc(doc(db, "users", uid), {
      password: hashed,
      updatedAt: serverTimestamp(),
    });
  },
};
