import { getCustomRepository, MigrationInterface } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

export class InitialTestData1652035305664 implements MigrationInterface {
  public async up(): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userService = new UserService();

    const user: User = Object.assign(new User(), {
      name: "test",
      password: "test",
      email: "test@user.com",
    });

    await userRepository.save(await userService.assembleUserForCreation(user));
  }

  public async down(): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const testUser = await userRepository.findOne({ where: { name: "test" } });

    if (testUser) {
      await userRepository.delete(testUser.id);
    }
  }
}
