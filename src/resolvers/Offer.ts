import { objectType } from 'nexus';

export const Offer = objectType({
  name: 'Offer',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.author();
    t.model.price();
    t.model.description();
    t.model.url();
    t.model.thumbnail();
    t.model.gallery();
    t.model.promoCode();
    t.model.contacts();
    t.model.tags();
  }
});
