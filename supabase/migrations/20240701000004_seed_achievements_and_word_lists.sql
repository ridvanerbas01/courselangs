-- Seed achievements
INSERT INTO achievements (name, description, icon, points) VALUES
('First Login', 'Logged in for the first time', 'award', 10),
('Word Master', 'Learned 50 words', 'book', 50),
('Exercise Champion', 'Completed 10 exercises', 'activity', 30),
('Perfect Score', 'Got 100% on an exercise', 'check-circle', 20),
('Streak Warrior', 'Maintained a 7-day streak', 'zap', 70),
('Bookworm', 'Read 5 stories', 'book-open', 40),
('Conversation Starter', 'Listened to 5 dialogues', 'message-circle', 40),
('Quiz Whiz', 'Completed 5 exams', 'award', 60),
('Vocabulary Builder', 'Mastered a word list', 'list', 50),
('Grammar Guru', 'Completed all grammar exercises', 'check', 80);

-- Seed word lists
INSERT INTO word_lists (title, description, word_count) VALUES
('Top 100 English Words', 'The most common 100 words in English', 100),
('Essential Travel Vocabulary', 'Must-know words for travelers', 50),
('Business English', 'Professional vocabulary for the workplace', 75),
('Academic English', 'Words commonly used in academic settings', 80),
('Everyday Conversations', 'Vocabulary for daily interactions', 60);

-- Seed stories
INSERT INTO stories (title, description, content, audio_url, difficulty_id, duration) 
VALUES 
('The Adventure Begins', 'A short story about exploration', 'Once upon a time, there was a young explorer who dreamed of discovering new lands. One day, they set off on a journey that would change their life forever...', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-0.mp3', (SELECT id FROM difficulty_levels WHERE name = 'beginner' LIMIT 1), 120),
('The Mystery of the Old House', 'A mysterious tale', 'The old house on the hill had been abandoned for years. People in the town said it was haunted. One night, a group of friends decided to explore it...', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3', (SELECT id FROM difficulty_levels WHERE name = 'intermediate' LIMIT 1), 180),
('A Day in the City', 'Urban adventures', 'The city was bustling with activity. People rushed to work, street vendors called out their wares, and tourists snapped photos of famous landmarks...', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-2.mp3', (SELECT id FROM difficulty_levels WHERE name = 'beginner' LIMIT 1), 150),
('The Science of Dreams', 'Educational content about dreams', 'Dreams have fascinated humans for centuries. Scientists now believe that dreams play an important role in memory consolidation and emotional processing...', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-3.mp3', (SELECT id FROM difficulty_levels WHERE name = 'advanced' LIMIT 1), 240),
('The Lost Treasure', 'An adventure story', 'The map was old and faded, but the promise of treasure was too exciting to ignore. The team gathered their supplies and set off on an expedition...', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-4.mp3', (SELECT id FROM difficulty_levels WHERE name = 'intermediate' LIMIT 1), 200);

-- Seed dialogues
INSERT INTO dialogues (title, description, content, audio_url, difficulty_id, duration) 
VALUES 
('At the Restaurant', 'A conversation between a customer and waiter', 'Waiter: Good evening! Welcome to our restaurant.\nCustomer: Thank you. Do you have a table for two?\nWaiter: Yes, right this way. Would you like to see the menu?\nCustomer: Yes, please. And could we get some water?', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-5.mp3', (SELECT id FROM difficulty_levels WHERE name = 'beginner' LIMIT 1), 90),
('Job Interview', 'A professional conversation', 'Interviewer: Tell me about your previous experience.\nCandidate: I worked for five years at a marketing agency, where I managed client accounts and led campaign development.\nInterviewer: Impressive. How do you handle tight deadlines?\nCandidate: I prioritize tasks and maintain clear communication with all stakeholders.', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-6.mp3', (SELECT id FROM difficulty_levels WHERE name = 'intermediate' LIMIT 1), 120),
('Making Plans', 'Friends discussing weekend plans', 'Alex: What are you doing this weekend?\nJamie: I haven't decided yet. Do you have any suggestions?\nAlex: How about going to that new museum? I heard it's really interesting.\nJamie: That sounds great! What time should we meet?', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-7.mp3', (SELECT id FROM difficulty_levels WHERE name = 'beginner' LIMIT 1), 80),
('Academic Discussion', 'Students discussing a project', 'Student 1: I think we should focus our research on environmental impacts.\nStudent 2: That's a broad topic. Could we narrow it down to something specific, like water pollution?\nStudent 1: Good point. We could examine case studies from different regions.\nStudent 2: I'll start gathering sources. When should we meet next?', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-8.mp3', (SELECT id FROM difficulty_levels WHERE name = 'advanced' LIMIT 1), 150),
('Shopping Conversation', 'A dialogue in a clothing store', 'Customer: Excuse me, do you have this shirt in a larger size?\nSalesperson: Let me check our inventory. What size are you looking for?\nCustomer: I need a large, and I was wondering if it comes in other colors.\nSalesperson: Yes, we have it in blue, green, and black. Would you like to see them?', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-9.mp3', (SELECT id FROM difficulty_levels WHERE name = 'beginner' LIMIT 1), 100);

-- Seed exams
INSERT INTO exams (title, description, time_limit, difficulty_id) 
VALUES 
('Beginner English Test', 'A comprehensive test for beginners', 30, (SELECT id FROM difficulty_levels WHERE name = 'beginner' LIMIT 1)),
('Intermediate Vocabulary Exam', 'Test your vocabulary knowledge', 45, (SELECT id FROM difficulty_levels WHERE name = 'intermediate' LIMIT 1)),
('Advanced Grammar Challenge', 'Complex grammar structures test', 60, (SELECT id FROM difficulty_levels WHERE name = 'advanced' LIMIT 1)),
('Listening Comprehension Test', 'Evaluate your listening skills', 40, (SELECT id FROM difficulty_levels WHERE name = 'intermediate' LIMIT 1)),
('Reading Proficiency Exam', 'Assess your reading abilities', 50, (SELECT id FROM difficulty_levels WHERE name = 'advanced' LIMIT 1));

-- Seed exam questions for the first exam
DO $$
DECLARE
  exam_id UUID;
BEGIN
  SELECT id INTO exam_id FROM exams WHERE title = 'Beginner English Test' LIMIT 1;
  
  -- Question 1
  INSERT INTO exam_questions (exam_id, question, question_type, points)
  VALUES (exam_id, 'What is the past tense of "go"?', 'multiple-choice', 1);
  
  WITH q1 AS (SELECT id FROM exam_questions WHERE exam_id = exam_id AND question = 'What is the past tense of "go"?' LIMIT 1)
  INSERT INTO exam_question_options (exam_question_id, option_text, is_correct)
  VALUES 
  ((SELECT id FROM q1), 'goed', FALSE),
  ((SELECT id FROM q1), 'went', TRUE),
  ((SELECT id FROM q1), 'gone', FALSE),
  ((SELECT id FROM q1), 'going', FALSE);
  
  -- Question 2
  INSERT INTO exam_questions (exam_id, question, question_type, points)
  VALUES (exam_id, 'Which word is a synonym for "happy"?', 'multiple-choice', 1);
  
  WITH q2 AS (SELECT id FROM exam_questions WHERE exam_id = exam_id AND question = 'Which word is a synonym for "happy"?' LIMIT 1)
  INSERT INTO exam_question_options (exam_question_id, option_text, is_correct)
  VALUES 
  ((SELECT id FROM q2), 'sad', FALSE),
  ((SELECT id FROM q2), 'angry', FALSE),
  ((SELECT id FROM q2), 'joyful', TRUE),
  ((SELECT id FROM q2), 'tired', FALSE);
  
  -- Question 3
  INSERT INTO exam_questions (exam_id, question, question_type, points)
  VALUES (exam_id, 'Which sentence is grammatically correct?', 'multiple-choice', 1);
  
  WITH q3 AS (SELECT id FROM exam_questions WHERE exam_id = exam_id AND question = 'Which sentence is grammatically correct?' LIMIT 1)
  INSERT INTO exam_question_options (exam_question_id, option_text, is_correct)
  VALUES 
  ((SELECT id FROM q3), 'She don''t like coffee.', FALSE),
  ((SELECT id FROM q3), 'She doesn''t likes coffee.', FALSE),
  ((SELECT id FROM q3), 'She doesn''t like coffee.', TRUE),
  ((SELECT id FROM q3), 'She not like coffee.', FALSE);
  
  -- Question 4
  INSERT INTO exam_questions (exam_id, question, question_type, points)
  VALUES (exam_id, 'Complete the sentence: "I ___ to the store yesterday."', 'fill-in-blanks', 1);
  
  WITH q4 AS (SELECT id FROM exam_questions WHERE exam_id = exam_id AND question = 'Complete the sentence: "I ___ to the store yesterday."' LIMIT 1)
  INSERT INTO exam_question_options (exam_question_id, option_text, is_correct)
  VALUES 
  ((SELECT id FROM q4), 'went', TRUE);
  
  -- Question 5
  INSERT INTO exam_questions (exam_id, question, question_type, points)
  VALUES (exam_id, 'What is the plural of "child"?', 'multiple-choice', 1);
  
  WITH q5 AS (SELECT id FROM exam_questions WHERE exam_id = exam_id AND question = 'What is the plural of "child"?' LIMIT 1)
  INSERT INTO exam_question_options (exam_question_id, option_text, is_correct)
  VALUES 
  ((SELECT id FROM q5), 'childs', FALSE),
  ((SELECT id FROM q5), 'childes', FALSE),
  ((SELECT id FROM q5), 'children', TRUE),
  ((SELECT id FROM q5), 'child', FALSE);
  
END $$;
