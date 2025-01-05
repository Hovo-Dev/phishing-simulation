import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { BaseRepository } from './base.repository';
import ProfileLevel from '../../../enums/profile.level';
import { DataSource, IsNull, UpdateResult } from 'typeorm';
import { ILike } from 'typeorm/find-options/operator/ILike';
import { randomFakerAnimal } from '../../../constants/faker.constants';
import { now } from '../../../libraries/time';

@Injectable()
export default class UserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  /**
   * Search user by email.
   *
   * @param email
   */
  public findByEmail(email: string): Promise<User | null> {
    return this.findOne({
      where: {
        email: ILike(email),
        deleted_at: IsNull(),
      },
    });
  }

  /**
   * Search user by stripe customer id.
   * Note, that stripe customer id is unique in db.
   *
   * @param customerId
   */
  public findByCustomerId(customerId: string): Promise<User | null> {
    return this.findOne({
      where: {
        stripe_customer_id: customerId,
      },
    });
  }

  /**
   * Delete user by updating email to be unique, update name to be random value and make the rest of sensitive data as
   * null.
   *
   * @param user
   */
  public deleteUserWithAnonymise(user: User): Promise<UpdateResult | null> {
    return this.update(
      {
        id: user.id,
      },
      {
        // To restore, just split by @ and remove first element.
        email: `${now().valueOf()}@${user.email}`,
        name: randomFakerAnimal(),
        deleted_at: now(),
        address: null,
        company_name: null,
        company_role: null,
        phone_number: null,
        profile_completion_level: ProfileLevel.USER_SETUP,
      },
    );
  }
}
