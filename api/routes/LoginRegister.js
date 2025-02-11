import exp from "express"
import {cikisYap, girisYap, kayitol} from "../controllers/LoginRegister.js"

const router = exp.Router();

router.post("/kayitol", kayitol)
router.post("/girisyap", girisYap)
router.get("/cikisyap", cikisYap)

export default router;