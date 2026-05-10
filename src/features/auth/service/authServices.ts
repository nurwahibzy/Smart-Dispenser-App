import { adminDb } from "@/lib/firebase/admin";
import bcrypt from "bcryptjs";

export const authService = {
  login: async (email: string, password: string) => {
    const snapshot = await adminDb
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      throw new Error("Email atau password salah");
    }

    const userData = snapshot.docs[0].data();

    const cocok = await bcrypt.compare(password, userData.password);
    if (!cocok) {
      throw new Error("Email atau password salah");
    }

    if (userData.role !== "admin" && userData.role !== "super admin") {
      throw new Error("Akses ditolak");
    }

    return userData;
  },
};