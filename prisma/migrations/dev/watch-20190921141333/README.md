# Migration `watch-20190921141333`

This migration has been generated at 9/21/2019, 2:13:34 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "lift"."Category.slug" ON "Category"("slug")

CREATE UNIQUE INDEX "lift"."Location.slug" ON "Location"("slug")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration watch-20190921110216..watch-20190921141333
--- datamodel.dml
+++ datamodel.dml
@@ -10,21 +10,162 @@
   provider = "sqlite"
   url      = "file:dev.db"
 }
-model Post {
+enum GENDERS {
+  MALE
+  FEMALE
+  OTHER
+}
+
+model PhotoNode {
+  id        String @default(cuid()) @id
+  public_id String
+  src       String
+}
+
+enum PERMISSIONS {
+  ADMIN
+
+  // Offer
+  CREATE_OFFER
+  UPDATE_OFFER
+  DELETE_OFFER
+
+  // Comments
+  CREATE_COMMENT
+  UPDATE_COMMENT
+  DELETE_COMMENT
+
+  // Category
+  CREATE_CATEGORY
+  UPDATE_CATEGORY
+  DELETE_CATEGORY
+
+  // Reply
+  CREATE_REPLY
+  UPDATE_REPLY
+  DELETE_REPLY
+
+  // Review
+  CREATE_REVIEW
+  UPDATE_REVIEW
+  DELETE_REVIEW
+
+  // Profile update
+  UPDATE_PROFILE
+  DELETE_PROFILE
+
+  BOOKMARK_OFFER
+  LIKE_OFFER
+  DISLIKE_OFFER
+}
+
+
+
+model User {
+  id                           String        @default(cuid()) @id
+  name                         String
+  username                     String
+  email                        String        @unique
+  password                     String
+  emailVarificationToken       String?
+  passwordResetToken           String?
+  passwordResetTokenExpiration String?
+  permissions                  PERMISSIONS[]
+
+
+
+  // Bios
+  phoneNumber  String
+  bio          String?
+  gender       GENDERS
+  location     String?
+  profilePhoto String?
+  profileCover String?
+
+
+  // Relational fields
+  offers   Offer[]
+  comments Comment[]
+  reviews  Review[]
+  replies  Reply[]
+  // bookmarks Offer[]
+
+
+}
+
+
+model Offer {
+  id String @default(cuid()) @id
+
+  // # infos
+  title              String
+  description        String
+  price              Float
+  discountprice      Float?
+  discountPercentage Float?
+  url                String?
+
+  // Photos
+  thumbnail String?
+  gallery   String[]
+
+  // duration: DateTime
+  promoCode String?
+  contacts  String[]
+
+  // # Relational Arrays
+  tags       String[]
+  location   Location[]
+  categories Category[]
+  comments   Comment[]
+  reviews    Review[]
+  author     User
+
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+
+}
+
+
+
+model Category {
+  id   String @default(cuid()) @id
+  name String
+  slug String @unique
+}
+
+model Location {
+  id    String @default(cuid()) @id
+  name  String
+  slug  String @unique
+  offer Offer
+}
+
+model Comment {
   id        String   @default(cuid()) @id
+  body      String
+  offer     Offer
+  author    User
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
-  published Boolean  @default(true)
-  title     String
-  content   String?
-  author    User?
 }
-model User {
-  id       String  @default(cuid()) @id
-  email    String  @unique
-  password String
-  name     String?
-  posts    Post[]
+model Review {
+  id        String   @default(cuid()) @id
+  body      String
+  rating    Int
+  offer     Offer
+  author    User
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
+
+model Reply {
+  id        String   @default(cuid()) @id
+  body      String
+  author    User
+  comment   Comment
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
 }
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20190921141333)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20190921141333'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
