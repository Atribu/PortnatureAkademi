"use client";
import React, { useEffect, useState, useRef } from "react";

const Page = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const maxTimeRef = useRef(0);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/video/list?department=Animasyon");
        if (!res.ok) {
          throw new Error("Videolar alınamadı");
        }
        const data = await res.json();
        console.log("Fetched data:", data);
        const sortedVideos = data.sort((a, b) => a.videoNumber - b.videoNumber);
        setVideos(sortedVideos);
        if (sortedVideos.length > 0) {
          setSelectedVideo(sortedVideos[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleTimeUpdate = (e) => {
    const current = e.target.currentTime;
    setCurrentTime(current);
    if (e.target.duration) {
      setDuration(e.target.duration);
    }
    if (current > maxTimeRef.current) {
      maxTimeRef.current = current;
    }
  };

  const handleSeeking = () => {
    // Eğer fullscreen modda değilse native seeking'i engelle.
    if (!document.fullscreenElement) {
      if (videoRef.current.currentTime > maxTimeRef.current) {
        videoRef.current.currentTime = maxTimeRef.current;
      }
    }
  };

  const handleEnded = () => {
    setVideoEnded(true);
    setPlaying(false);
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const handleVolumeDown = () => {
    if (videoRef.current) {
      let newVolume = Math.max(0, videoRef.current.volume - 0.1);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleVolumeUp = () => {
    if (videoRef.current) {
      let newVolume = Math.min(1, videoRef.current.volume + 0.1);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleFullScreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  const handleSelect = (video) => {
    if (!videoEnded) {
      alert("Lütfen mevcut videoyu bitirdikten sonra diğer videoya geçin.");
      return;
    }
    setSelectedVideo(video);
    setCurrentTime(0);
    setDuration(0);
    setVideoEnded(false);
    setPlaying(false);
    maxTimeRef.current = 0;
  };

  if (loading) return <div>Videolar yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  if (videos.length === 0) return <div>Video bulunamadı</div>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sol Yarı: Video Playlist */}
      <div style={{ flex: 1, borderRight: "1px solid #ccc", overflowY: "auto", padding: "1rem" }}>
        <h2>Video Playlist (Animasyon)</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {videos.map((video) => (
            <li
              key={video._id}
              onClick={() => handleSelect(video)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: selectedVideo && selectedVideo._id === video._id ? "#eee" : "transparent",
                borderBottom: "1px solid #ddd",
              }}
            >
              {video.videoNumber}. {video.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Sağ Yarı: Video Oynatıcı ve Kontroller */}
      <div ref={containerRef} style={{ flex: 2, padding: "1rem" }}>
        {selectedVideo ? (
          <div>
            <h2>{selectedVideo.title}</h2>
            <video
              key={selectedVideo._id}
              ref={videoRef}
              width="100%"
              height="auto"
              onTimeUpdate={handleTimeUpdate}
              onSeeking={handleSeeking}
              onEnded={handleEnded}
              style={{ backgroundColor: "black" }}
            >
              <source src={selectedVideo.videoUrl} type="video/mp4" />
              Tarayıcınız video etiketini desteklemiyor.
            </video>
            <div className="controlPanel">
              <button className="controlButton" onClick={handlePlayPause}>
                {playing ? "Duraklat" : "Oynat"}
              </button>
              <button className="controlButton" onClick={handleRewind}>
                Geri Sar (10s)
              </button>
              <button className="controlButton" onClick={handleVolumeDown}>
                Ses Azalt
              </button>
              <button className="controlButton" onClick={handleVolumeUp}>
                Ses Arttır
              </button>
              <button className="controlButton" onClick={handleFullScreen}>
                {document.fullscreenElement ? "Tam Ekrandan Çık" : "Tam Ekran"}
              </button>
              <div className="info">
                <span>{Math.floor(currentTime)} / {Math.floor(duration)} saniye</span>
                <span>Ses: {(volume * 100).toFixed(0)}%</span>
              </div>
            </div>
            {selectedVideo.description && <p>{selectedVideo.description}</p>}
          </div>
        ) : (
          <div>Video bulunamadı</div>
        )}
        <style jsx>{`
          .controlPanel {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
          }
          .controlButton {
            padding: 10px 15px;
            background-color: #0070f3;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            margin-right: 10px;
            margin-bottom: 10px;
            transition: background-color 0.3s ease;
          }
          .controlButton:hover {
            background-color: #005bb5;
          }
          .info {
            margin-top: 5px;
            font-size: 0.9rem;
            color: #333;
            display: flex;
            flex-direction: column;
          }
          .info span {
            margin-right: 15px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Page;
