import { db } from "@/lib/firebase/client";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { HelpdeskPayload, HelpdeskTicket } from "@/types/helpdesk";

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

export const getHelpdesk = async (): Promise<HelpdeskTicket[]> => {
  try {
    const helpdeskRef = collection(db, collectionName);
    const q = query(helpdeskRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const tickets: HelpdeskTicket[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as HelpdeskTicket[];

    return tickets;
  } catch (error) {
    console.error("Error fetching helpdesk tickets:", error);
    throw new Error("Gagal mengambil data laporan.");
  }
};

export const updateHelpdeskStatus = async (
  ticketId: string,
  newStatus: string,
): Promise<void> => {
  try {
    const ticketRef = doc(db, collectionName, ticketId);
    await updateDoc(ticketRef, { status: newStatus });
  } catch (error) {
    console.error("Error updating helpdesk ticket status:", error);
    throw new Error("Gagal memperbarui status laporan.");
  }
};
