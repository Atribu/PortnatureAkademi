"use client";
import React, { useState } from "react";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("Güvenlik"); // varsayılan departman
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Şifre kontrolü
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }

    // Kayıt verilerini hazırlama
    const data = { username, name, email, password, accessLevel };

    try {
      // API isteği: Kayıt ol endpoint'i
      const res = await fetch("http://localhost:4003/api/LoginRegister/kayitol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        setSuccess("Kayıt başarılı!");
        // İsteğe bağlı: Kullanıcıyı giriş sayfasına yönlendirme gibi ek işlemler yapılabilir.
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Kayıt başarısız");
      }
    } catch (err) {
      setError("Bir hata oluştu: " + err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "2rem",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Kayıt Ol
        </h2>
        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
            {error}
          </p>
        )}
        {success && (
          <p
            style={{ color: "green", textAlign: "center", marginBottom: "1rem" }}
          >
            {success}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adınızı girin"
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name">Ad Soyad</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınızı ve soyadınızı girin"
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresinizi girin"
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="confirmPassword">Şifre Tekrar</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Şifrenizi tekrar girin"
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="accessLevel">Departman</label>
            <select
              id="accessLevel"
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              required
            >
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#0070f3",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
}
