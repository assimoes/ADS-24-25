import { Repository } from "typeorm";
import { User } from "../models/User";

export const seedUsers = async (userRepository: Repository<User>) => {
  const existingUsers = await userRepository.count();
  if (existingUsers > 0) {
    console.log("Users already seeded");
    return; // Skip if users already exist
  }

  const users = [
    { email: "user1@example.com" },
    { email: "user2@example.com" },
    { email: "user3@example.com" },
  ];

  for (const userData of users) {
    const user = userRepository.create(userData);
    await userRepository.save(user);
  }

  console.log("Users seeded successfully");
};
