import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.phoneNumber();
    t.model.offers({ pagination: false });
    t.model.gender();
    t.model.permissions();
  }
});
