// src/controllers/tagController.ts
import { Request, Response } from "express";
import dataSource from "../data-source";
import { Tag } from "../models/Tag";

export const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Tag name is required." });
      return;
    }

    const tagRepository = dataSource.getRepository(Tag);

    const existingTag = await tagRepository.findOne({ where: { name } });
    if (existingTag) {
      res.status(400).json({ error: "Tag already exists." });
      return;
    }

    const tag = tagRepository.create({ name });
    const savedTag = await tagRepository.save(tag);

    res.status(201).json({
      ...savedTag,
      links: [
        { rel: "self", href: `/api/tags/${savedTag.id}` },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const tagRepository = dataSource.getRepository(Tag);
    const tags = await tagRepository.find();

    const response = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      links: [
        { rel: "self", href: `/api/tags/${tag.id}` },
      ],
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};