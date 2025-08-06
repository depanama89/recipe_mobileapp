import express from 'express';
import * as controllerFavorite from "../../controller/favorite.js"

const router = express.Router()


router.post("/create",controllerFavorite.favorite)

export default router