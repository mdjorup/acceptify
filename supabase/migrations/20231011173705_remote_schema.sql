alter table "public"."reviews" drop constraint "reviews_user_id_fkey";

alter table "public"."reviews" add constraint "reviews_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE not valid;

alter table "public"."reviews" validate constraint "reviews_user_id_fkey";


