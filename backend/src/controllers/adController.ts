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

export const createAd: RequestHandler = async (req, res) => {
  try {
    const adRepository = dataSource.getRepository(Ad);
    const userRepository = dataSource.getRepository(User);
    const tagRepository = dataSource.getRepository(Tag);

    const { user, tags, ...adData } = req.body;

    if (!user || !tags || !adData.title || !adData.description || !adData.price) {
      res.status(400).json({ error: "Invalid request body format" });
      return;
    }

    const foundUser = await userRepository.findOne({ where: { id: user } });
    const foundTags = await tagRepository.findByIds(tags);

    if (!foundUser) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    const newAd = adRepository.create({
      ...adData,
      user: foundUser,
      tags: foundTags,
    });

    const savedAd = await adRepository.save(newAd);

    res.status(201).json({
      ...savedAd,
      links: [
        { rel: "self", href: `/api/ads/${savedAd[0].id}` },
        { rel: "update", href: `/api/ads/${savedAd[0].id}` },
        { rel: "delete", href: `/api/ads/${savedAd[0].id}` },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};