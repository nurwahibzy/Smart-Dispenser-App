import { db } from "@/lib/firebase/client";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { HelpdeskPayload } from "@/types/helpdesk";

const collectionName = "helpdesk";

export const submitHelpdesk = async (payload: HelpdeskPayload) => {
  try {
    const helpdeskRef = collection(db, collectionName);

    await addDoc(helpdeskRef, {
      ...payload,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Laporan berhasil dikirim",
    };
  } catch (error) {
    console.error("Error submitting helpdesk ticket:", error);
    throw new Error("Gagal mengirim laporan. Silakan coba lagi.");
  }
};
