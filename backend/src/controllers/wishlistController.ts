// src/controllers/wishlistController.ts
import { Request, Response, RequestHandler } from "express";
import dataSource from "../data-source";
import { Wishlist } from "../models/Wishlist";
import { User } from "../models/User";
import { Ad } from "../models/Ad";

export const addToWishlist: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user: userId, ad: adId } = req.body;

    if (!userId || !adId) {
      res.status(400).json({ error: "User ID and Ad ID are required." });
    }

    const userRepository = dataSource.getRepository(User);
    const adRepository = dataSource.getRepository(Ad);
    const wishlistRepository = dataSource.getRepository(Wishlist);

    const user = await userRepository.findOne({ where: { id: userId } });
    const ad = await adRepository.findOne({ where: { id: adId } });

    if (!user || !ad) {
      res.status(404).json({ error: "User or Ad not found." });
      return;
    }

    const wishlistItem = wishlistRepository.create({ user, ad });
    const savedWishlistItem = await wishlistRepository.save(wishlistItem);

    res.status(201).json({
      ...savedWishlistItem,
      links: [
        { rel: "self", href: `/api/wishlist/${savedWishlistItem.id}` },
        { rel: "delete", href: `/api/wishlist/${savedWishlistItem.id}/delete` },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const wishlistId = parseInt(req.params.id);

    const wishlistRepository = dataSource.getRepository(Wishlist);

    const wishlistItem = await wishlistRepository.findOne({ where: { id: wishlistId } });

    if (!wishlistItem) {
      res.status(404).json({ error: "Wishlist item not found." });
      return;
    }

    await wishlistRepository.remove(wishlistItem);

    res.status(200).json({ message: "Wishlist item removed successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserWishlist = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const wishlistRepository = dataSource.getRepository(Wishlist);

    const wishlist = await wishlistRepository.find({
      where: { user: { id: userId } },
    });

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
