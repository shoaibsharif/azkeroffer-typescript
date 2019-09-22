import { enumType } from 'nexus';
import { PERMISSIONS } from '@generated/photon';

export const Permission = enumType({
  name: 'PERMISSIONS',
  members: PERMISSIONS
});
