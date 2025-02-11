import Users from "../models/users.js"
import jwt from "jsonwebtoken"
import { errorHandle } from "../utils/error.js"

export const kayitol = async (req, res, next) => {
    const { username, name, email, password, accessLevel } = req.body;
    const newUsers = new Users ({username, name, email, password, accessLevel })
    try { await newUsers.save();
        res.status(201).json("Kullanacı Kaydı Başarılı")
        
    } catch (error) {
        next(error)
    }
}

export const girisYap = async (req, res, next) => {
    const { username, password } = req.body;
    try { 
        const validate = await Users.findOne({username, password})
        if(!validate){return next(errorHandle(404,"Kullancı Adı veya Şifre Hatalı"))}
        const token = jwt.sign({id:validate.id}, "DGTLFACE")
        res.cookie("token", token, {expired:new Date(Date.now()+24*60*60*1000), httpOnly:true}).status(201).json(validate)
    } catch (error) {
        next(error)
    }
}

export const cikisYap = async (req, res, next) => {
    try {
        // Token çerezini temizle
        res.clearCookie("token");
        // Başarılı çıkış için 200 durum kodu ve mesaj gönder
        return res.status(200).json({ message: "Çıkış başarılı" });
    } catch (error) {
        next(error);
    }
}
