import { NextRequest, NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { generateResetToken, hashToken } from "@/lib/utils/token";
import { sendPasswordResetEmail } from "@/lib/auth/emailService";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email harus diisi" }, { status: 400 });
    }

    const now = new Date();
    const snapshot = await adminDb
      .collection("users")
      .where("email", "==", email)
      .get();

    let shouldSendEmail = false;
    let userDoc: FirebaseFirestore.QueryDocumentSnapshot | null = null;

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const userData = doc.data();

      if (userData.role !== "admin" && userData.role !== "super admin") {
        return NextResponse.json({
          message:
            "Jika email terdaftar dan memiliki akses, link reset password telah dikirim",
        });
      }

      if (userData.lastResetRequest) {
        const lastRequest = userData.lastResetRequest.toDate();
        const diff = (now.getTime() - lastRequest.getTime()) / 1000;

        if (diff < 60) {
          return NextResponse.json(
            { error: "Terlalu banyak permintaan. Coba lagi dalam 1 menit." },
            { status: 429 },
          );
        }
      }

      shouldSendEmail = true;
      userDoc = doc;
    }

    if (shouldSendEmail && userDoc) {
      const resetToken = generateResetToken();
      const hashedToken = hashToken(resetToken);
      const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

      await userDoc.ref.update({
        resetToken: hashedToken,
        resetTokenExpiry: Timestamp.fromDate(resetTokenExpiry),
        lastResetRequest: Timestamp.fromDate(now),
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