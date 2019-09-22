# Migration `watch-20190921141522`

This migration has been generated at 9/21/2019, 2:15:22 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "lift"."User.username" ON "User"("username")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration watch-20190921141333..watch-20190921141522
--- datamodel.dml
+++ datamodel.dml
@@ -64,9 +64,9 @@
 model User {
   id                           String        @default(cuid()) @id
   name                         String
-  username                     String
+  username                     String        @unique
   email                        String        @unique
   password                     String
   emailVarificationToken       String?
   passwordResetToken           String?
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20190921141522)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20190921141522'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
