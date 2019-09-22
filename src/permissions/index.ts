import { Context } from './../types';
import { rule, shield } from 'graphql-shield';
import { getUserId } from '../utils';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isOfferOwner: rule()(async (parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const author = await context.photon.offers
      .findOne({
        where: {
          id
        }
      })
      .author();
    return userId === author.id;
  })
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    offers: rules.isAuthenticatedUser
  },
  Mutation: {
    createOffer: rules.isAuthenticatedUser
    // deletePost: rules.isPostOwner,
    // publish: rules.isPostOwner
  }
});
