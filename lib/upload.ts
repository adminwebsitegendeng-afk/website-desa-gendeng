"use client";

import { supabase } from "./supabase";

/**
 * Utility to compress and upload image files to Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
export async function uploadImageFile(file: File): Promise<string> {
  if (!file) throw new Error("File tidak ditemukan");
  if (!file.type.startsWith("image/")) throw new Error("File harus berupa gambar (JPG, PNG, WEBP, GIF, SVG)");

  // Compress image to avoid massive uploads
  const compressedBlob = await compressImage(file);
  const compressedFile = new File([compressedBlob], file.name, { type: "image/jpeg" });

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `public/${fileName}`;

  const { error } = await supabase.storage.from("media").upload(filePath, compressedFile, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.error("Upload error:", error);
    throw new Error("Gagal mengunggah gambar ke server.");
  }

  const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1280;
        const MAX_HEIGHT = 1280;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Canvas to Blob failed"));
          }, "image/jpeg", 0.7);
        } else {
          reject(new Error("Canvas context failed"));
        }
      };
    };
    reader.onerror = (error) => reject(error);
  });
}
