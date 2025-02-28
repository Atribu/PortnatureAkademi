"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Gerçek uygulamada API isteği yapılır.
      // Örneğin:
      // const res = await fetch("http://localhost:5003/api/LoginRegister/girisyap", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error("Giriş yapılamadı");

      // Burada örnek olarak giriş başarılı kabul edelim.
      console.log("Email:", email, "Password:", password);
      
      // Giriş başarılıysa panel sayfasına yönlendir.
      router.push("/panel");
    } catch (err) {
      setError("Giriş yapılamadı: " + err.message);
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
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
          <h2>Giriş Yap</h2>
        </div>
        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">E-posta</label>
            <input
              id="email"
              type="email"
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
              id="password"
              type="password"
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
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
