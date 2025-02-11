"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("id");

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    accessLevel: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Departmanlar listesi
  const departments = [
    "İnsan Kaynakları",
    "Satış & Pazarlama",
    "Bilgi Sistemleri",
    "Kat Hizmetleri",
    "Güvenlik",
    "Teknik Servis",
    "Satınalma",
    "Muhasebe",
    "Mutfak",
    "Yiyecek & İçecek",
    "Animasyon",
    "Kalite",
    "Ön Büro",
  ];

  // API'den id'ye göre kullanıcı verilerini çekiyoruz.
  useEffect(() => {
    if (userId) {
      async function fetchUser() {
        try {
          const res = await fetch(`http://localhost:4003/api/users/getir/${userId}`);
          if (!res.ok) {
            throw new Error("Kullanıcı verileri alınırken bir hata oluştu");
          }
          const data = await res.json();
          setUser({
            name: data.name || "",
            email: data.email || "",
            username: data.username || "",
            accessLevel: data.accessLevel || "",
            password: "" // Şifre alanını güvenlik için boş bırakıyoruz
          });
        } catch (err) {
          setError(err.message);
          console.error("Hata:", err);
        }
      }
      fetchUser();
    }
  }, [userId]);

  // Güncelleme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4003/api/users/guncelle/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
      if (!res.ok) {
        throw new Error("Kullanıcı güncellenemedi");
      }
      const updatedUser = await res.json();
      setSuccess("Kullanıcı başarıyla güncellendi");
      setUser({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        username: updatedUser.username || "",
        accessLevel: updatedUser.accessLevel || "",
        password: "" // Güncelleme sonrası şifre alanını temizliyoruz
      });
      // İsteğe bağlı: Güncelleme sonrası kullanıcı listesine yönlendirme
      // router.push("/panel/kullanicilar");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Kullanıcı Güncelle</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="name" style={{ width: "150px", fontWeight: "bold" }}>İsim:</label>
          <input
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            style={{ flex: 1, padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="email" style={{ width: "150px", fontWeight: "bold" }}>E-posta:</label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            style={{ flex: 1, padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="username" style={{ width: "150px", fontWeight: "bold" }}>Kullanıcı Adı:</label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            style={{ flex: 1, padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="accessLevel" style={{ width: "150px", fontWeight: "bold" }}>Erişim Seviyesi:</label>
          <select
            id="accessLevel"
            value={user.accessLevel}
            onChange={(e) => setUser({ ...user, accessLevel: e.target.value })}
            style={{ flex: 1, padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          >
            <option value="">-- Bir seçim yapın --</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="password" style={{ width: "150px", fontWeight: "bold" }}>Şifre:</label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            style={{ flex: 1, padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
            placeholder="Yeni şifre girin (boş bırakılırsa değişmez)"
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Güncelle
        </button>
      </form>
    </div>
  );
}

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
