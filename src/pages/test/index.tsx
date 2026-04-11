"use client";

import { useEffect } from "react";
import { getDispenseHistory, getDeviceData } from "../../utils/db/servicefirebase";

export default function TestPage() {

  useEffect(() => {
    console.log("TES KONEK FIREBASE");

    getDispenseHistory();
    getDeviceData();
  }, []);

  return (
    <div>
      <h1>Test Firebase</h1>
      <p>Buka console (F12)</p>
    </div>
  );
}