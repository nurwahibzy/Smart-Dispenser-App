export async function uploadFotoKeImgbb(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY!);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!data.success) throw new Error("Gagal upload foto ke Imgbb");

  return data.data.url;
}