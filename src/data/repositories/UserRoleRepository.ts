import { UserRole } from "../entities/UserRole";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserRole)
export class UserRoleRepository extends Repository<UserRole> {}
