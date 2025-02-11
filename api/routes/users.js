import exp from "express"

import { getirUsers, getirBir, silUsers, guncelleUsers} from "../controllers/users.js"

const router = exp.Router()


router.get("/getir", getirUsers)
router.get("/getir/:id", getirBir)
router.delete("/sil/:id", silUsers)
router.put("/guncelle/:id", guncelleUsers)

export default router;