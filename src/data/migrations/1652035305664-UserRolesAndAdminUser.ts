import { getCustomRepository, MigrationInterface } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../../service/services/UserService";
import { UserRoleRepository } from "../repositories/UserRoleRepository";
import { UserRole } from "../entities/UserRole";

export class UserRolesAndAdminUser1652035305664 implements MigrationInterface {
  public async up(): Promise<void> {
    /* User roles. */
    const admin: UserRole = new UserRole();
    admin.name = "admin";

    const regular: UserRole = new UserRole();
    regular.name = "regular";

    const userRoleRepository = getCustomRepository(UserRoleRepository);
    userRoleRepository.save(admin);
    userRoleRepository.save(regular);

    /* Admin user. */
    const userService = new UserService(
      getCustomRepository(UserRepository),
      getCustomRepository(UserRoleRepository)
    );

    const user: User = Object.assign(new User(), {
      name: "admin",
      password: "admin",
      email: "admin@service.com",
      role: { name: "admin" },
    });

    await userService.createUser(user);
  }

  public async down(): Promise<void> {}
}
