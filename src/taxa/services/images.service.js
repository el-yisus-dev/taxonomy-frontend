
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "TU_UPLOAD_PRESET"); // 🔥 config en cloudinary

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dzgjgtbw0/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return {
    url: data.secure_url,
    providerId: data.public_id,
  };
};