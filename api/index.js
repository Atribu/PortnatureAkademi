import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import usersRoute from "./routes/users.js"
import LoginRegister from "./routes/LoginRegister.js"
import videoRoutes from "./routes/video.js";

// .env dosyasındaki değişkenleri yükle
dotenv.config();

const connect = async () => {
    await mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

connect()
  .then(() => console.log("Bağlandı"))
  .catch((db_error) => console.log(db_error));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Merhaba");
});
app.use("/api/users", usersRoute )
app.use("/api/LoginRegister", LoginRegister)
app.use("/api/video", videoRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(5003, () => {
    console.log("Port Açıldı");
});
