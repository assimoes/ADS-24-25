import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Tag } from "../models/Tag";

export const createTag = async (req: Request, res: Response) => {
  const tagRepository = AppDataSource.getRepository(Tag);
  const newTag = tagRepository.create(req.body);
  await tagRepository.save(newTag);
  res.status(201).json(newTag);
};
