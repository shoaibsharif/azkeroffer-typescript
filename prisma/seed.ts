import { Photon } from '@generated/photon';
const photon = new Photon();

async function main() {
  await photon.users.update({ where: { username: 'shoaib' }, data: { gender: 'MALE' } });
}

main().finally(async () => {
  await photon.disconnect();
});
