import express from "express";
import { addToWatchList, removefromWatchlist, updateWatchlistItem } from '../controllers/watchlistController.js'
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchListSchema } from "../validators/watchlistValidator.js";


const router = express.Router();


router.use(authMiddleware);

router.post("/", validateRequest(addToWatchListSchema),addToWatchList);

router.put("/:id", updateWatchlistItem);

router.delete("/:id", removefromWatchlist);

export default router;