import { Repository } from "typeorm";
import { Tag } from "../models/Tag";

export const seedTags = async (tagRepository: Repository<Tag>) => {
  const existingTags = await tagRepository.count();
  if (existingTags > 0) {
    console.log("Tags already seeded");
    return; // Skip if tags already exist
  }

  const tags = [{ name: "Electronics" }, { name: "Furniture" }, { name: "Clothing" }];

  for (const tagData of tags) {
    const tag = tagRepository.create(tagData);
    await tagRepository.save(tag);
  }

  console.log("Tags seeded successfully");
};
