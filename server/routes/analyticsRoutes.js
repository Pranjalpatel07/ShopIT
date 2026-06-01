import express from 'express';
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import {getAdminStates} from "../controller/analyticsController.js";

const router = express.Router();

router.get('/',protect, admin,getAdminStates);

export default router;