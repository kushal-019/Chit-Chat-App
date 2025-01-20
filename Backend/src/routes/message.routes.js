import express from "express"
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { getUsersSidebarController,getMessagesController,sendMessagesController } from "../controllers/message.controller.js";


const router = express.Router();

router.get("/users" ,protectRoute , getUsersSidebarController );
router.get("/:id" ,protectRoute , getMessagesController );

router.post("/send/:id" ,protectRoute , sendMessagesController );


export default router;