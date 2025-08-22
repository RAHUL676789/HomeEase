export const uploadFile = async (file) => {
  console.log(file)
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  let resourceType ;

  if(file.type.startsWith("application/pdf")){
    resourceType = "raw"
  }else if(file.type.startsWith("image/")){
    resourceType = "auto"
  }
  
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "HomeEase");

    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();
      console.log(data);
    if (data.secure_url) {
      return {
        url: data.secure_url,
        pId: data.public_id,
        success: true
      };
    } else {
      return {
        success: false,
        errorMsg:data?.error?.message || "Upload failed, invalid response",
        data:null
      };
    }
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return {
      success: false,
      errorMsg: "Failed to upload, please try again"
    };
  }
};
