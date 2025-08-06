import express from 'express';
import { db } from '../config/db.js';
import { favorites } from '../db/schema.js';
export const favorite=async (req,res,next)=>{
try {
        const { userId,recipeId,title,image,cookTime,servings}=req.body
        console.log(userId,recipeId,title)
         if(!userId || !recipeId || !title){
            return res.status(400).json({error:"Missing requided fields"})
         }
         const newFavorite=await db.insert(favorites).values({
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings
         })
         .returning()
         res.status(201).json(newFavorite[0])
    } catch (error) {
        console.error("Error adding favorite",error)
        res.status(500).json("error something wrong")
    }
}