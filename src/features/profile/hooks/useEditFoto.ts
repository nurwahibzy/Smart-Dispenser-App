"use client";

import { useState } from "react";
import { uploadFotoKeImgbb } from "@/lib/utils/uploadFoto";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export function useEditFoto() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function editFoto(uid: string, file: File) {
    try {
      setLoading(true);
      setError("");

      const photoURL = await uploadFotoKeImgbb(file);

      await updateDoc(doc(db, "users", uid), {
        photoURL,
        updatedAt: serverTimestamp(),
      });

      return photoURL;
    } catch (err) {
      console.error(err);
      setError("Gagal upload foto");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { editFoto, loading, error };
}