import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export const authService = {
  login: async (email: string, password: string) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("Email atau password salah");
    }

    const userData = snapshot.docs[0].data();

    if (userData.password !== password) {
      throw new Error("Email atau password salah");
    }

    if (userData.role !== "admin") {
      throw new Error("Akses ditolak");
    }

    return userData;
  },
};