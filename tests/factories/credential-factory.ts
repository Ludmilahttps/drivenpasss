import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import { User, Credential} from "@prisma/client";
import { createUser } from "./users-factory";
import { cryptographyUtil } from "../utils/encryptUtils";

export async function createCredential(user?: User): Promise<Credential> {
  const creatingUser = user || (await createUser());

  const password = cryptographyUtil.encrypt(faker.internet.password(10));

  return prisma.credential.create({
    data: {
      title: faker.lorem.sentence(),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: password,
      userId: creatingUser.id,
    },
  });
}