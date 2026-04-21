export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "animaldex_upload");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dzgjgtbw0/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  console.log("Cloudinary response:", data); // 🔥 debug clave

  if (!res.ok) {
    throw new Error(data.error?.message || "Error uploading image");
  }

  return {
    url: data.secure_url,
    providerId: data.public_id,
  };
};