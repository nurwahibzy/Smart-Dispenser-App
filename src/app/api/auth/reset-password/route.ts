import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { hashToken } from "@/lib/utils/token";
import { hashPassword } from "@/lib/utils/hash";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token dan password harus diisi" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter" },
        { status: 400 },
      );
    }

    const hashedToken = hashToken(token);

    const snapshot = await adminDb
      .collection("users")
      .where("resetToken", "==", hashedToken)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "Token tidak valid atau sudah expired" },
        { status: 400 },
      );
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    if (!userData.resetTokenExpiry?.toDate) {
      return NextResponse.json(
        { error: "Token tidak valid." },
        { status: 400 },
      );
    }

    const tokenExpiry = userData.resetTokenExpiry.toDate();
    if (tokenExpiry < new Date()) {
      return NextResponse.json(
        { error: "Token sudah expired. Silakan request reset password lagi." },
        { status: 400 },
      );
    }

    const isSame = await bcrypt.compare(password, userData.password);
    if (isSame) {
      return NextResponse.json(
        { error: "Password baru tidak boleh sama dengan password lama" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);

    await userDoc.ref.update({
      password: hashedPassword,
      resetToken: FieldValue.delete(),
      resetTokenExpiry: FieldValue.delete(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      message: "Password berhasil direset. Silakan login dengan password baru.",
    });
  } catch (error) {
    console.error("Error reset password:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 },
    );
  }
}