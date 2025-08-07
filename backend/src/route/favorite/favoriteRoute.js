import express from 'express';
import * as controllerFavorite from "../../controller/favorite.js"

const router = express.Router()


router.get("/shows",controllerFavorite.getAllFavorites)
router.get("/:userId",controllerFavorite.getFavoritesById)
router.post("/create",controllerFavorite.favorite)
router.delete("/:userId/:recipeId",controllerFavorite.favoriteDelete)
export default router