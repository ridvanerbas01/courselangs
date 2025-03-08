-- Seed difficulty levels
INSERT INTO difficulty_levels (name, description) VALUES
('beginner', 'Basic vocabulary and simple grammar for beginners'),
('intermediate', 'More complex vocabulary and grammar for intermediate learners'),
('advanced', 'Sophisticated vocabulary and complex grammar for advanced learners');

-- Seed categories
INSERT INTO categories (title, description, icon, color) VALUES
('Vocabulary', 'Essential words for daily conversations', 'Book', 'bg-blue-100'),
('Grammar', 'Rules and structures of English language', 'Pencil', 'bg-green-100'),
('Phrases', 'Common expressions and idioms', 'MessageSquare', 'bg-yellow-100'),
('Pronunciation', 'Learn correct English sounds', 'Mic', 'bg-purple-100'),
('Reading', 'Texts for comprehension practice', 'BookOpen', 'bg-pink-100'),
('Listening', 'Audio exercises for better understanding', 'Headphones', 'bg-indigo-100'),
('Idioms', 'Figurative expressions in English', 'Lightbulb', 'bg-orange-100'),
('Academic', 'Formal language for education', 'FileText', 'bg-teal-100'),
('Business', 'Professional vocabulary for work', 'Bookmark', 'bg-red-100'),
('Slang', 'Informal language and expressions', 'Languages', 'bg-cyan-100'),
('Advanced', 'Complex vocabulary for proficient users', 'Brain', 'bg-emerald-100');

-- Seed exercise types
INSERT INTO exercise_types (name, description, icon) VALUES
('multiple-choice', 'Answer questions by selecting the correct option from multiple choices', 'BookOpen'),
('matching', 'Match words with their definitions or related concepts', 'SplitSquareVertical'),
('fill-blanks', 'Complete sentences by filling in missing words', 'PenTool'),
('word-pairing', 'Pair related words together to build vocabulary connections', 'Puzzle'),
('audio', 'Listen to audio clips and answer questions about what you hear', 'Headphones'),
('image-based', 'Identify words or concepts based on images', 'Image');

-- Seed content items (50 items)
INSERT INTO content_items (word, phonetic, part_of_speech, definition, audio_url, image_url, category_id, difficulty_id) VALUES
-- Vocabulary category - Beginner level
('Hello', '/həˈloʊ/', 'interjection', 'Used as a greeting or to begin a phone conversation', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-0.mp3', 'https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Goodbye', '/ˌɡʊdˈbaɪ/', 'interjection', 'Used when leaving or ending a conversation', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Thank you', '/ˈθæŋk juː/', 'phrase', 'Used to express gratitude', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-2.mp3', 'https://images.unsplash.com/photo-1532499016263-f2c3e89de9cd?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Please', '/pliːz/', 'adverb', 'Used as a polite way of asking for something', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-3.mp3', 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Sorry', '/ˈsɒri/', 'adjective', 'Feeling regret or penitence', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-4.mp3', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),

-- Grammar category - Beginner level
('Is', '/ɪz/', 'verb', 'Third person singular present of be', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-5.mp3', 'https://images.unsplash.com/photo-1544980919-e17526d4ed0a?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Are', '/ɑː(r)/', 'verb', 'Present tense of be', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-6.mp3', 'https://images.unsplash.com/photo-1555431189-0fabf2667795?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Am', '/æm/', 'verb', 'First person singular present of be', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-7.mp3', 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Do', '/duː/', 'verb', 'Used to form questions and negative statements', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-8.mp3', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Does', '/dʌz/', 'verb', 'Third person singular present of do', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-9.mp3', 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),

-- Phrases category - Beginner level
('How are you', '/haʊ ɑː juː/', 'phrase', 'A greeting asking about someone''s well-being', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-10.mp3', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80', (SELECT id FROM categories WHERE title = 'Phrases'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Nice to meet you', '/naɪs tuː miːt juː/', 'phrase', 'A polite greeting when meeting someone for the first time', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-11.mp3', 'https://images.unsplash.com/photo-1574314710598-5d9be8f1c52e?w=800&q=80', (SELECT id FROM categories WHERE title = 'Phrases'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('What''s your name', '/wɒts jɔː(r) neɪm/', 'phrase', 'A question asking for someone''s name', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-12.mp3', 'https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?w=800&q=80', (SELECT id FROM categories WHERE title = 'Phrases'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Where are you from', '/weə(r) ɑː juː frɒm/', 'phrase', 'A question asking about someone''s origin', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-13.mp3', 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=800&q=80', (SELECT id FROM categories WHERE title = 'Phrases'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('I don''t understand', '/aɪ dəʊnt ʌndəˈstænd/', 'phrase', 'Used to express lack of comprehension', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-14.mp3', 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80', (SELECT id FROM categories WHERE title = 'Phrases'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),

-- Vocabulary category - Intermediate level
('Serendipity', '/ˌserənˈdɪpəti/', 'noun', 'The occurrence and development of events by chance in a happy or beneficial way', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-15.mp3', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Eloquent', '/ˈeləkwənt/', 'adjective', 'Fluent or persuasive in speaking or writing', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-16.mp3', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Meticulous', '/məˈtɪkjʊləs/', 'adjective', 'Showing great attention to detail; very careful and precise', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-17.mp3', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Ambiguous', '/æmˈbɪɡjuəs/', 'adjective', 'Open to more than one interpretation; not having one obvious meaning', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-18.mp3', 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Pragmatic', '/præɡˈmætɪk/', 'adjective', 'Dealing with things sensibly and realistically in a way that is based on practical considerations', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-19.mp3', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),

-- Grammar category - Intermediate level
('Present Perfect', '/ˈprezənt ˈpɜːfɪkt/', 'grammar', 'A tense used to describe an action that happened at an unspecified time before now', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-20.mp3', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Past Continuous', '/pɑːst kənˈtɪnjuəs/', 'grammar', 'A tense used to describe an ongoing action in the past', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-21.mp3', 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Conditional', '/kənˈdɪʃənl/', 'grammar', 'A form of a verb used to make requests or express hypothetical situations', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-22.mp3', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Passive Voice', '/ˈpæsɪv vɔɪs/', 'grammar', 'A form of a verb where the subject receives the action', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-23.mp3', 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Relative Clause', '/ˈrelətɪv klɔːz/', 'grammar', 'A clause that provides additional information about a noun', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-24.mp3', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),

-- Idioms category - Intermediate level
('Break a leg', '/breɪk ə leɡ/', 'idiom', 'Good luck (often said to performers before they go on stage)', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-25.mp3', 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&q=80', (SELECT id FROM categories WHERE title = 'Idioms'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Piece of cake', '/piːs əv keɪk/', 'idiom', 'Something that is very easy to do', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-26.mp3', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80', (SELECT id FROM categories WHERE title = 'Idioms'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Cost an arm and a leg', '/kɒst ən ɑːm ənd ə leɡ/', 'idiom', 'To be very expensive', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-27.mp3', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80', (SELECT id FROM categories WHERE title = 'Idioms'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Hit the nail on the head', '/hɪt ðə neɪl ɒn ðə hed/', 'idiom', 'To describe exactly what is causing a situation or problem', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-28.mp3', 'https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?w=800&q=80', (SELECT id FROM categories WHERE title = 'Idioms'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Under the weather', '/ˈʌndə ðə ˈweðə/', 'idiom', 'Feeling slightly unwell', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-29.mp3', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80', (SELECT id FROM categories WHERE title = 'Idioms'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),

-- Vocabulary category - Advanced level
('Ephemeral', '/ɪˈfemərəl/', 'adjective', 'Lasting for a very short time', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-30.mp3', 'https://images.unsplash.com/photo-1485841890310-6a055c88698a?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Ubiquitous', '/juːˈbɪkwɪtəs/', 'adjective', 'Present, appearing, or found everywhere', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-31.mp3', 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Sycophant', '/ˈsɪkəfənt/', 'noun', 'A person who acts obsequiously toward someone important in order to gain advantage', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-32.mp3', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Quintessential', '/ˌkwɪntɪˈsenʃəl/', 'adjective', 'Representing the most perfect or typical example of a quality or class', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-33.mp3', 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Juxtaposition', '/ˌdʒʌkstəpəˈzɪʃən/', 'noun', 'The fact of two things being seen or placed close together with contrasting effect', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-34.mp3', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80', (SELECT id FROM categories WHERE title = 'Vocabulary'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),

-- Grammar category - Advanced level
('Subjunctive Mood', '/səbˈdʒʌŋktɪv muːd/', 'grammar', 'A verb mood that expresses wishes, suggestions, or desires', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-35.mp3', 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Inversion', '/ɪnˈvɜːʃən/', 'grammar', 'A reversal of the normal word order in a sentence', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-36.mp3', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Cleft Sentence', '/kleft ˈsentəns/', 'grammar', 'A sentence that is divided to emphasize one element', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-37.mp3', 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Gerund', '/ˈdʒerənd/', 'grammar', 'A verb form which functions as a noun, ending in -ing', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-38.mp3', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Participle Clause', '/ˈpɑːtɪsɪpl klɔːz/', 'grammar', 'A dependent clause that uses a participle form of a verb', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-39.mp3', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', (SELECT id FROM categories WHERE title = 'Grammar'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),

-- Business category - Advanced level
('Leverage', '/ˈliːvərɪdʒ/', 'noun', 'The use of a small initial investment to gain a high return', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-40.mp3', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', (SELECT id FROM categories WHERE title = 'Business'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Synergy', '/ˈsɪnədʒi/', 'noun', 'The interaction of elements that when combined produce a total effect greater than the sum of the individual elements', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-41.mp3', 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80', (SELECT id FROM categories WHERE title = 'Business'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Paradigm Shift', '/ˈpærədaɪm ʃɪft/', 'noun', 'A fundamental change in approach or underlying assumptions', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-42.mp3', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', (SELECT id FROM categories WHERE title = 'Business'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Due Diligence', '/djuː ˈdɪlɪdʒəns/', 'noun', 'Reasonable steps taken by a person to avoid committing an offense', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-43.mp3', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', (SELECT id FROM categories WHERE title = 'Business'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Scalability', '/ˌskeɪləˈbɪləti/', 'noun', 'The capability of a system to handle a growing amount of work', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-44.mp3', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', (SELECT id FROM categories WHERE title = 'Business'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),

-- Academic category - Advanced level
('Dissertation', '/ˌdɪsəˈteɪʃən/', 'noun', 'A long essay on a particular subject, especially one written for a university degree', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-45.mp3', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', (SELECT id FROM categories WHERE title = 'Academic'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Methodology', '/ˌmeθəˈdɒlədʒi/', 'noun', 'A system of methods used in a particular area of study or activity', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-46.mp3', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', (SELECT id FROM categories WHERE title = 'Academic'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Empirical', '/ɪmˈpɪrɪkəl/', 'adjective', 'Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-47.mp3', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', (SELECT id FROM categories WHERE title = 'Academic'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Hypothesis', '/haɪˈpɒθəsɪs/', 'noun', 'A supposition or proposed explanation made on the basis of limited evidence as a starting point for further investigation', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-48.mp3', 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=800&q=80', (SELECT id FROM categories WHERE title = 'Academic'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),
('Plagiarism', '/ˈpleɪdʒərɪzəm/', 'noun', 'The practice of taking someone else''s work or ideas and passing them off as one''s own', 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-49.mp3', 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&q=80', (SELECT id FROM categories WHERE title = 'Academic'), (SELECT id FROM difficulty_levels WHERE name = 'advanced'));

-- Seed examples for content items
INSERT INTO examples (content_item_id, text, translation) VALUES
-- Hello examples
((SELECT id FROM content_items WHERE word = 'Hello'), 'Hello, how are you today?', 'A greeting asking about someone''s well-being'),
((SELECT id FROM content_items WHERE word = 'Hello'), 'She said hello to everyone at the party.', 'She greeted everyone at the party'),
((SELECT id FROM content_items WHERE word = 'Hello'), 'Hello! Is anyone there?', 'A greeting to check if someone is present'),

-- Goodbye examples
((SELECT id FROM content_items WHERE word = 'Goodbye'), 'I said goodbye to my friends before leaving.', 'I bid farewell to my friends before departing'),
((SELECT id FROM content_items WHERE word = 'Goodbye'), 'Goodbye, see you tomorrow!', 'A farewell with an expectation to meet again'),
((SELECT id FROM content_items WHERE word = 'Goodbye'), 'It''s hard to say goodbye after such a wonderful time.', 'It''s difficult to part ways after an enjoyable experience'),

-- Serendipity examples
((SELECT id FROM content_items WHERE word = 'Serendipity'), 'The discovery of penicillin was a serendipity.', 'The accidental discovery of penicillin was fortunate'),
((SELECT id FROM content_items WHERE word = 'Serendipity'), 'They met through serendipity at a coffee shop.', 'They met by chance at a coffee shop'),
((SELECT id FROM content_items WHERE word = 'Serendipity'), 'Many scientific discoveries happen through serendipity.', 'Many scientific discoveries occur by accident'),

-- Ephemeral examples
((SELECT id FROM content_items WHERE word = 'Ephemeral'), 'The beauty of cherry blossoms is ephemeral.', 'The beauty of cherry blossoms is short-lived'),
((SELECT id FROM content_items WHERE word = 'Ephemeral'), 'Social media trends are often ephemeral.', 'Social media trends are often temporary'),
((SELECT id FROM content_items WHERE word = 'Ephemeral'), 'The artist creates ephemeral installations that last only a few hours.', 'The artist creates temporary installations that last only a few hours');

-- Seed related words for content items
INSERT INTO related_words (content_item_id, word, part_of_speech) VALUES
-- Hello related words
((SELECT id FROM content_items WHERE word = 'Hello'), 'Hi', 'interjection'),
((SELECT id FROM content_items WHERE word = 'Hello'), 'Greetings', 'noun'),
((SELECT id FROM content_items WHERE word = 'Hello'), 'Welcome', 'interjection'),

-- Goodbye related words
((SELECT id FROM content_items WHERE word = 'Goodbye'), 'Bye', 'interjection'),
((SELECT id FROM content_items WHERE word = 'Goodbye'), 'Farewell', 'noun'),
((SELECT id FROM content_items WHERE word = 'Goodbye'), 'See you', 'phrase'),

-- Serendipity related words
((SELECT id FROM content_items WHERE word = 'Serendipity'), 'Chance', 'noun'),
((SELECT id FROM content_items WHERE word = 'Serendipity'), 'Fortunate', 'adjective'),
((SELECT id FROM content_items WHERE word = 'Serendipity'), 'Coincidence', 'noun'),
((SELECT id FROM content_items WHERE word = 'Serendipity'), 'Luck', 'noun'),

-- Ephemeral related words
((SELECT id FROM content_items WHERE word = 'Ephemeral'), 'Temporary', 'adjective'),
((SELECT id FROM content_items WHERE word = 'Ephemeral'), 'Fleeting', 'adjective'),
((SELECT id FROM content_items WHERE word = 'Ephemeral'), 'Transient', 'adjective'),
((SELECT id FROM content_items WHERE word = 'Ephemeral'), 'Momentary', 'adjective');

-- Seed exercises
INSERT INTO exercises (title, description, exercise_type_id, content_item_id, difficulty_id) VALUES
-- Multiple choice exercises
('Basic Greetings Quiz', 'Test your knowledge of basic English greetings', (SELECT id FROM exercise_types WHERE name = 'multiple-choice'), (SELECT id FROM content_items WHERE word = 'Hello'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Intermediate Vocabulary Test', 'Challenge your vocabulary knowledge with these intermediate-level words', (SELECT id FROM exercise_types WHERE name = 'multiple-choice'), (SELECT id FROM content_items WHERE word = 'Serendipity'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),
('Advanced Grammar Challenge', 'Test your understanding of complex grammar concepts', (SELECT id FROM exercise_types WHERE name = 'multiple-choice'), (SELECT id FROM content_items WHERE word = 'Subjunctive Mood'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),

-- Matching exercises
('Match the Greetings', 'Match these common greetings with their meanings', (SELECT id FROM exercise_types WHERE name = 'matching'), (SELECT id FROM content_items WHERE word = 'Hello'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Business Terms Matching', 'Match these business terms with their definitions', (SELECT id FROM exercise_types WHERE name = 'matching'), (SELECT id FROM content_items WHERE word = 'Leverage'), (SELECT id FROM difficulty_levels WHERE name = 'advanced')),

-- Fill in the blanks exercises
('Complete the Sentence', 'Fill in the missing words in these common phrases', (SELECT id FROM exercise_types WHERE name = 'fill-blanks'), (SELECT id FROM content_items WHERE word = 'Thank you'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Idiom Completion', 'Complete these common English idioms', (SELECT id FROM exercise_types WHERE name = 'fill-blanks'), (SELECT id FROM content_items WHERE word = 'Break a leg'), (SELECT id FROM difficulty_levels WHERE name = 'intermediate')),

-- Audio exercises
('Listen and Choose', 'Listen to the audio and select the word you hear', (SELECT id FROM exercise_types WHERE name = 'audio'), (SELECT id FROM content_items WHERE word = 'Hello'), (SELECT id FROM difficulty_levels WHERE name = 'beginner')),
('Advanced Pronunciation', 'Test your ability to distinguish similar-sounding words', (SELECT id FROM exercise_types WHERE name = 'audio'), (SELECT id FROM content_items WHERE word = 'Ephemeral'), (SELECT id FROM difficulty_levels WHERE name = 'advanced'));

-- Seed exercise options
INSERT INTO exercise_options (exercise_id, text, is_correct) VALUES
-- Basic Greetings Quiz options
((SELECT id FROM exercises WHERE title = 'Basic Greetings Quiz'), 'Hello', TRUE),
((SELECT id FROM exercises WHERE title = 'Basic Greetings Quiz'), 'Goodbye', FALSE),
((SELECT id FROM exercises WHERE title = 'Basic Greetings Quiz'), 'Thank you', FALSE),
((SELECT id FROM exercises WHERE title = 'Basic Greetings Quiz'), 'Sorry', FALSE),

-- Intermediate Vocabulary Test options
((SELECT id FROM exercises WHERE title = 'Intermediate Vocabulary Test'), 'Finding something by chance', TRUE),
((SELECT id FROM exercises WHERE title = 'Intermediate Vocabulary Test'), 'A type of flower', FALSE),
((SELECT id FROM exercises WHERE title = 'Intermediate Vocabulary Test'), 'A musical instrument', FALSE),
((SELECT id FROM exercises WHERE title = 'Intermediate Vocabulary Test'), 'A cooking technique', FALSE),

-- Advanced Grammar Challenge options
((SELECT id FROM exercises WHERE title = 'Advanced Grammar Challenge'), 'A verb mood that expresses wishes or hypothetical situations', TRUE),
((SELECT id FROM exercises WHERE title = 'Advanced Grammar Challenge'), 'A type of punctuation', FALSE),
((SELECT id FROM exercises WHERE title = 'Advanced Grammar Challenge'), 'A sentence structure with two clauses', FALSE),
((SELECT id FROM exercises WHERE title = 'Advanced Grammar Challenge'), 'A way to form questions', FALSE),

-- Listen and Choose options
((SELECT id FROM exercises WHERE title = 'Listen and Choose'), 'Hello', TRUE),
((SELECT id FROM exercises WHERE title = 'Listen and Choose'), 'Yellow', FALSE),
((SELECT id FROM exercises WHERE title = 'Listen and Choose'), 'Hollow', FALSE),
((SELECT id FROM exercises WHERE title = 'Listen and Choose'), 'Halo', FALSE),

-- Advanced Pronunciation options
((SELECT id FROM exercises WHERE title = 'Advanced Pronunciation'), 'Ephemeral', TRUE),
((SELECT id FROM exercises WHERE title = 'Advanced Pronunciation'), 'Ethereal', FALSE),
((SELECT id FROM exercises WHERE title = 'Advanced Pronunciation'), 'Epidermal', FALSE),
((SELECT id FROM exercises WHERE title = 'Advanced Pronunciation'), 'Empirical', FALSE);