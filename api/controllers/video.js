import Video from "../models/video.js";

// Video yükleme: client'tan gelen videoUrl, title, videoNumber ve department ile yeni video kaydı oluşturur.
export const uploadVideo = async (req, res, next) => {
    try {
      const { videoNumber, title, description, videoUrl, department } = req.body;
      if (!videoNumber || !title || !videoUrl || !department) {
        return res.status(400).json({ message: "Gerekli alanlar eksik" });
      }
      
      // Bu kontrolü kaldırın:
      // const existingVideo = await Video.findOne({ videoNumber: videoNumber });
      // if (existingVideo) {
      //   return res.status(400).json({ message: "Bu video numarası zaten kullanılıyor, lütfen farklı bir numara girin." });
      // }
      
      const video = new Video({ videoNumber, title, description, videoUrl, department });
      await video.save();
      res.status(201).json(video);
    } catch (error) {
      next(error);
    }
  };


// Video listeleme: Tüm videoları oluşturulma tarihine göre sıralı olarak getirir.
export const getVideos = async (req, res, next) => {
    try {
      // Query parametresinden department bilgisini alıyoruz.
      const { department } = req.query;
      // Eğer department parametresi varsa filtre olarak kullanıyoruz.
      const filter = department ? { department } : {};
      // Videoları videoNumber'a göre sıralayarak getiriyoruz.
      const videos = await Video.find(filter).sort({ videoNumber: 1 });
      res.status(200).json(videos);
    } catch (error) {
      next(error);
    }
  };
  

// Video silme: Belirtilen id'ye sahip videoyu siler.
export const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      return res.status(404).json({ message: "Video bulunamadı" });
    }
    res.status(200).json({ message: "Video başarıyla silindi" });
  } catch (error) {
    next(error);
  }
};
