import { Request, RequestHandler, Response } from "express";
import dataSource from "../data-source";
import { Ad } from "../models/Ad";
import { User } from "../models/User";
import { Tag } from "../models/Tag";

export const getAds: RequestHandler = async (req: Request, res: Response) => {
  const adRepository = dataSource.getRepository(Ad);
  const ads = await adRepository.find({ relations: ["tags"] });

  const response = ads.map((ad) => ({
    ...ad,
    links: [
      { rel: "self", href: `/api/ads/${ad.id}` },
      { rel: "update", href: `/api/ads/${ad.id}` },
      { rel: "delete", href: `/api/ads/${ad.id}` },
    ],
  }));

  res.json({ ads: response });
};

export const getAd: RequestHandler = async (req, res) => {
  try {
    const adRepository = dataSource.getRepository(Ad);

    const ad = await adRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["tags"],
    });

    if (!ad) {
      res.status(404).json({ error: "Ad not found" });
      return;
    }

    res.status(200).json({
      ...ad,
      links: [
        { rel: "self", href: `/api/ads/${ad.id}` },
        { rel: "update", href: `/api/ads/${ad.id}` },
        { rel: "delete", href: `/api/ads/${ad.id}` },
      ],
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ error: error.message });
  }
};

export const createAd = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price, user: userId, tags } = req.body;

    if (!title || !description || !price || !userId) {
      res.status(400).json({ error: "Title, description, price, and user ID are required." });
      return;
    }

    const adRepository = dataSource.getRepository(Ad);
    const userRepository = dataSource.getRepository(User);
    const tagRepository = dataSource.getRepository(Tag);

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    const foundTags = await tagRepository.findByIds(tags || []);

    const ad = adRepository.create({
      title,
      description,
      price,
      user,
      tags: foundTags,
    });

    const savedAd = await adRepository.save(ad);

    res.status(201).json({
      ...savedAd,
      links: [
        { rel: "self", href: `/api/ads/${savedAd.id}` },
        { rel: "update", href: `/api/ads/${savedAd.id}` },
        { rel: "delete", href: `/api/ads/${savedAd.id}` },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};