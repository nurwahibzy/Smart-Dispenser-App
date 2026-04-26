import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { generateResetToken, hashToken } from "@/lib/utils/token";
import { sendPasswordResetEmail } from "@/lib/auth/emailService";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email harus diisi" }, { status: 400 });
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    let shouldSendEmail = false;
    let userDoc = null;

    // Cek apakah user ada
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const userData = doc.data();

      if (userData.role === "admin" || userData.role === "super admin") {
        shouldSendEmail = true;
        userDoc = doc;
      }
    }

    // generate token & kirim email kalau email ada
    if (shouldSendEmail && userDoc) {
      const resetToken = generateResetToken();
      const hashedToken = hashToken(resetToken);
      const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); 

      await updateDoc(userDoc.ref, {
        resetToken: hashedToken,
        resetTokenExpiry: resetTokenExpiry.toISOString(),
      });

      await sendPasswordResetEmail(email, resetToken);
    }

    await new Promise((res) => setTimeout(res, 500));

    return NextResponse.json({
      message:
        "Jika email terdaftar dan memiliki akses, link reset password telah dikirim",
    });
  } catch (error) {
    console.error("Error forgot password:", error);

    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 },
    );
  }
}