import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoNumber: {
    type: Number,
    required: true,
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  videoUrl: { 
    type: String, 
    required: true 
  },
  department: { 
    type: String,
    required: true,
    enum: [
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
      "Ön Büro"
    ]
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
