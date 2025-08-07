import express from "express";
import { db } from "../config/db.js";
import { favorites } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const getAllFavorites = async (req, res) => {
  try {
    const result = await db.select().from(favorites);

    if (result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(200).json("Aucun élément trouver ", []);
    }
  } catch (error) {
    console.log("Error showing a favorite", error);
  }
};

export const getFavoritesById=async (req,res)=>{
   try {
      const{userId}=req.params
      const userFavorite=await db.select().from(favorites).where(eq(favorites.userId,userId))
      if(userFavorite){

         return res.status(200).json(userFavorite)
      }else{
         return res.status(404).json("this user is not found",[])

      }
   } catch (error) {
      console.log("Error showing a favorite", error);
   }
}

export const favorite = async (req, res, next) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;
    console.log(userId, recipeId, title);
    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing requided fields" });
    }

    const existingFavorite = await db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, userId) && eq(favorites.recipeId, recipeId))
      .limit(1);

    if (existingFavorite.length > 0) {
      return res.status(409).json("cet enregistrement existe déjà !!");
    }

    const newFavorite = await db
      .insert(favorites)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
      })
      .returning();
    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.error("Error adding favorite", error);
    res.status(500).json("error something wrong");
  }
};

export const favoriteDelete = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const existingFavorite = await db
      .select()
      .from(favorites)
      .where(
        eq(favorites.userId, userId) &&
          eq(favorites.recipeId, parseInt(recipeId))
      );
// verification si l'id user et recipe existe
    if (existingFavorite.length === 0) {
      return res.status(404).json({ message: "le favori n'a pas été trouvé" });
    }

    await db
      .delete(favorites)
      .where(
        eq(favorites.userId, userId) &&
          eq(favorites.recipeId, parseInt(recipeId))
      );

    res.status(200).json({ message: "Favorite remove successfull" });

  } catch (error) {
    console.log("Error removing a favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
