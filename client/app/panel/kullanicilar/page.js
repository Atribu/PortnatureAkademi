"use client";
import React, { useState, useEffect } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // API'den kullanıcı verilerini çekiyoruz.
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/users/getir");
      if (!res.ok) {
        throw new Error("Kullanıcı verileri alınırken bir hata oluştu");
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error("Hata:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Kullanıcı silme işlemi
  const handleDelete = async (id) => {
    if (!confirm("Kullanıcıyı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`http://localhost:5003/api/users/sil/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Kullanıcı silinemedi");
      }
      // Silme sonrası kullanıcı listesini güncelliyoruz
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
      alert("Silme işlemi başarısız oldu: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Kullanıcı Listesi</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {users.map((user) => (
          <div
            key={user._id || user.id}
            style={{
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{user.name}</h3>
              <p style={{ margin: 0, color: "#666" }}>{user.email}</p>
              <p style={{ margin: "0.3rem 0 0 0", fontSize: "0.9rem" }}>
                Kullanıcı Adı: {user.username}
              </p>
            </div>
            <div>
              <span
                style={{
                  backgroundColor: "#0070f3",
                  color: "#fff",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                {user.accessLevel}
              </span>
              <div style={{ marginTop: "0.5rem" }}>
                {/* Güncelle butonu: Kullanıcıyı güncelleme sayfasına yönlendiriyoruz */}
                <a
                  href={`/panel/kullanicilar/kullaniciguncelle?id=${user._id}`}
                  style={{
                    marginRight: "0.5rem",
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.8rem",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Güncelle
                </a>
                <button
                  onClick={() => handleDelete(user._id)}
                  style={{
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.8rem",
                    backgroundColor: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
