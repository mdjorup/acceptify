insert into
public.schools (official_name)
values
('University of Virginia'),
('Harvard University'),
('Stanford University');


-- Now populate the prompts table
insert into public.prompts (school_id, prompt_text, application_year, max_words)
values
(1, 'What inspired you to pursue your field of study?', 2023, 500),
(1, 'Why do you want to go to UVA', 2023, 250),
(2, 'Describe a time when you faced a significant challenge and how you overcame it.', 2023, 750),
(3, 'What is the most important lesson you have learned in your life so far?', 2023, 1000);


insert into public.prompts (school_id, prompt_text, application_year, max_characters)
values
(2, 'What inspired you to pursue your field of study?', 2023, 1000),
(2, 'Why do you want to go to Harvard', 2023, 2000),
(3, 'What are your goals?', 2023, 4000);

