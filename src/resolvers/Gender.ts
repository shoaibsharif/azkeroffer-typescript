import { enumType } from 'nexus';
import { GENDERS } from '@generated/photon';

export const Gender = enumType({
  name: 'GENDERS',
  members: GENDERS
});
