"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PanelLayout = ({ children }) => {
  const router = useRouter();
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  const toggleDepartments = () => {
    setDepartmentsOpen(!departmentsOpen);
  };

  const toggleUsers = () => {
    setUsersOpen(!usersOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4003/api/LoginRegister/cikisyap", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Çıkış yapılamadı");
      }
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Çıkış yapılamadı: " + err.message);
    }
  };

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

  // Departman isimlerini URL uyumlu slug'lara dönüştüren mapping
  const departmentSlugs = {
    "İnsan Kaynakları": "insankaynaklari",
    "Satış & Pazarlama": "satispazarlama",
    "Bilgi Sistemleri": "bilgisistemleri",
    "Kat Hizmetleri": "kathizmetleri",
    "Güvenlik": "guvenlik",
    "Teknik Servis": "teknikservis",
    "Satınalma": "satinalma",
    "Muhasebe": "muhasebe",
    "Mutfak": "mutfak",
    "Yiyecek & İçecek": "yiyecekicecek",
    "Animasyon": "animasyon",
    "Kalite": "kalite",
    "Ön Büro": "onburo",
  };

  return (
    <div>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          backgroundColor: "#222",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          zIndex: 1000,
        }}
      >
        <h2 style={{ margin: 0 }}>Panel</h2>
        <div>
          <a
            href="#"
            style={{
              marginRight: "20px",
              color: "#fff",
              textDecoration: "none",
            }}
            onClick={() => console.log("Ayarlar tıklandı")}
          >
            Ayarlar
          </a>
          <a
            href="#"
            style={{ color: "#fff", textDecoration: "none" }}
            onClick={handleLogout}
          >
            Çıkış
          </a>
        </div>
      </header>

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: "60px",
          left: 0,
          width: "250px",
          height: "calc(100vh - 60px)",
          backgroundColor: "#333",
          color: "#fff",
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "1rem" }}>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
              Dashboard
            </a>
          </li>
          {/* Kullanıcılar Bölümü */}
          <li style={{ marginBottom: "1rem" }}>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "0.5rem",
                cursor: "pointer",
              }}
              onClick={toggleUsers}
            >
              Kullanıcılar {usersOpen ? "▲" : "▼"}
            </div>
            {usersOpen && (
              <ul style={{ listStyle: "none", paddingLeft: "1rem", fontSize: "0.9rem" }}>
                <li style={{ marginBottom: "0.3rem" }}>
                  <Link href="/panel/kullanicilar" style={{ color: "#fff", textDecoration: "none" }}>
                    Liste
                  </Link>
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  <Link
                    href="/panel/kullanicilar/kayitol"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    Yeni Kullanıcı Ekle
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Departmanlar Bölümü */}
          <li style={{ marginBottom: "1rem" }}>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "0.5rem",
                cursor: "pointer",
              }}
              onClick={toggleDepartments}
            >
              Departmanlar {departmentsOpen ? "▲" : "▼"}
            </div>
            {departmentsOpen && (
              <ul style={{ listStyle: "none", paddingLeft: "1rem", fontSize: "0.9rem" }}>
                {departments.map((dept, index) => (
                  <li key={index} style={{ marginBottom: "0.3rem" }}>
                    <Link
                      href={`/panel/${departmentSlugs[dept]}`}
                      style={{ color: "#fff", textDecoration: "none", cursor: "pointer" }}
                    >
                      {dept}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Ana İçerik */}
      <div
        style={{
          marginLeft: "250px",
          marginTop: "60px",
          padding: "2rem",
          backgroundColor: "#f4f4f4",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PanelLayout;
