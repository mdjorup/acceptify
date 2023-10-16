alter table "public"."reviews" drop column "general_feedback";

alter table "public"."reviews" add column "feedback" jsonb;