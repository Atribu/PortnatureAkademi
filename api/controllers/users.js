import Users from "../models/users.js"

export const getirUsers = async ( req, res, next) => {
    try {
        const users = await Users.find()
        return res.status(201).json(users)
    }
    catch (error) {
        next(error)
    }
}

export const getirBir = async ( req, res, next ) => {
    try {
        const users = await Users.findById(req.params.id);
        if(!users) {
            return res.status(404).json({ message: "Kullanıcı Bulunamadı"})
        }
        return res.status(201).json(users)
    } catch (error) {
        next(error)
    }
}

export const silUsers = async ( req, res, next ) => {
    try {
        const users = await Users.findByIdAndDelete(req.params.id);
        res.status(201).json("Başarıyla Silindi")
    } catch (error) {
        next(error)
    }
}

export const guncelleUsers = async (req, res, next) => {
    try {
        const updateUsers = await Users.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        if (!updateUsers) {
            return res.status(404).json({ success: false, message: "Kullanıcı Bulunamadı" });
        }
        return res.status(201).json(updateUsers);
    } catch (error) {
        next(error);
    }
}