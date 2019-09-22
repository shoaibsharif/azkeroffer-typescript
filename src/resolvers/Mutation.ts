import { Context } from './../types';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { idArg, mutationType, stringArg, arg, floatArg } from 'nexus';
import { APP_SECRET, getUserId } from '../utils';

// export const Mutation = objectType({
//   name: 'Mutation',
//   definition(t) {
//     t.crud.createOneUser();
//     t.crud.createOneOffer();
//     t.crud.deleteOneUser();
//     t.crud.updateOneUser();
//     t.crud.createOneOffer();
//     t.crud.createOneCategory();
//   }
// });

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg(),
        gender: arg({ type: 'GENDERS' }),
        phoneNumber: stringArg(),
        username: stringArg()
      },
      resolve: async (parent, { name, email, password, gender, phoneNumber, username }, ctx) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.photon.users.create({
          data: {
            name,
            email,
            password: hashedPassword,
            gender,
            phoneNumber,
            username
          }
        });
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        };
      }
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true })
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.photon.users.findOne({
          where: {
            email
          }
        });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        };
      }
    });
    t.crud.createOneCategory();
    t.field('createOffer', {
      type: 'Offer',
      args: {
        title: stringArg({ required: true }),
        description: stringArg({ required: true }),
        price: floatArg({ required: true }),
        discountprice: floatArg(),
        discountPercentage: floatArg(),
        url: stringArg(),
        thumbnail: stringArg(),
        gallery: arg({ type: 'OfferCreategalleryInput' })
      },
      resolve: async (parent, args, ctx) => {
        return ctx.photon.offers.create({
          data: {
            ...args,
            author: {
              connect: {
                id: getUserId(ctx)
              }
            }
          }
        });
      }
    });
  }
});
