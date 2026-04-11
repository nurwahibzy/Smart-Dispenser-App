import { getDeviceData } from "@/features/device/infrastructure/device.firebase";

export async function GET() {
  const data = await getDeviceData();
  return Response.json(data);
}
