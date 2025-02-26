"use client";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../lib/firebase.js";

const page = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoNumber, setVideoNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      setMessage("Lütfen bir video dosyası seçin.");
      return;
    }
    if (!videoNumber) {
      setMessage("Lütfen video numarası girin.");
      return;
    }
    if (!title) {
      setMessage("Lütfen video başlığı girin.");
      return;
    }
    if (!department) {
      setMessage("Lütfen departman seçin.");
      return;
    }
    setUploading(true);
    setMessage("");
    setProgress(0);
  
    // Firebase Storage'da videoları "videos" klasöründe saklıyoruz.
    const storageRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => {
        setMessage(error.message);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          const res = await fetch("http://localhost:4003/api/video/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              videoNumber: Number(videoNumber),
              title,
              description,
              videoUrl: downloadURL,
              department,
            }),
          });
          if (res.ok) {
            setMessage("Video başarıyla yüklendi ve veritabanına kaydedildi!");
          } else {
            const errorData = await res.json();
            setMessage("Kayıt sırasında hata oluştu: " + errorData.message);
          }
        } catch (err) {
          console.error("Backend kaydı hatası:", err);
          setMessage("Video yüklendi fakat veritabanı kaydı yapılamadı.");
        }
  
        setVideoFile(null);
        setVideoNumber("");
        setTitle("");
        setDescription("");
        setDepartment("");
        setUploading(false);
        setProgress(0);
      }
    );
  };
  
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Video Yükleme</h1>
      <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        {videoFile && (
          <video controls style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}>
            <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        )}
        <input
          type="number"
          placeholder="Video Numarası"
          value={videoNumber}
          onChange={(e) => setVideoNumber(e.target.value)}
          style={{ padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
          required
        />
        <input
          type="text"
          placeholder="Video Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
          required
        />
        <textarea
          placeholder="Video Açıklaması (opsiyonel)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
          required
        >
          <option value="" disabled>Departman Seçiniz</option>
          <option value="İnsan Kaynakları">İnsan Kaynakları</option>
          <option value="Satış & Pazarlama">Satış & Pazarlama</option>
          <option value="Bilgi Sistemleri">Bilgi Sistemleri</option>
          <option value="Kat Hizmetleri">Kat Hizmetleri</option>
          <option value="Güvenlik">Güvenlik</option>
          <option value="Teknik Servis">Teknik Servis</option>
          <option value="Satınalma">Satınalma</option>
          <option value="Muhasebe">Muhasebe</option>
          <option value="Mutfak">Mutfak</option>
          <option value="Yiyecek & İçecek">Yiyecek & İçecek</option>
          <option value="Animasyon">Animasyon</option>
          <option value="Kalite">Kalite</option>
          <option value="Ön Büro">Ön Büro</option>
        </select>
        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: "0.75rem",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {uploading ? "Yükleniyor..." : "Videoyu Yükle"}
        </button>
        {uploading && <p style={{ textAlign: "center" }}>Yükleme: {progress}%</p>}
        {message && <p style={{ textAlign: "center" }}>{message}</p>}
      </form>
    </div>
  );
};

export default page;
