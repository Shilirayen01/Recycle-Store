import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RecycleBdDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.user_id,
  UserRelations
> {
  constructor(
    @inject('datasources.recycle_bd') dataSource: RecycleBdDataSource,
  ) {
    super(User, dataSource);
  }
}
