import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../../service/services/UserService";
import { UserRoleRepository } from "../repositories/UserRoleRepository";
import { UserRole } from "../entities/UserRole";

export class UserRolesAndAdminUser1652035305664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* User roles. */
    const adminUserRole = new UserRole();
    adminUserRole.name = "admin";

    const regularUserRole = new UserRole();
    regularUserRole.name = "regular";

    const userRoleRepository =
      queryRunner.connection.getCustomRepository(UserRoleRepository);
    await userRoleRepository.save(adminUserRole);
    await userRoleRepository.save(regularUserRole);

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
