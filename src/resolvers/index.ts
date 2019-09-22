import { Permission } from './Permission';
import { Gender } from './Gender';
import { Category } from './Category';
import { AuthPayload } from './AuthPayload';
import { Mutation } from './Mutation';
import { Offer } from './Offer';
import { Query } from './Query';
import { User } from './User';

export const resolvers = {
  Query,
  User,
  Category,
  Mutation,
  Offer,
  AuthPayload
  // Gender,
  // Permission
};
