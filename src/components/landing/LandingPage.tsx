import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Brain,
  ChevronRight,
  Globe,
  Headphones,
  Lightbulb,
  MessageSquare,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";

interface LandingPageProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

const LandingPage = ({
  onLogin = () => {},
  onSignup = () => {},
}: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master English with Interactive Learning
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Improve your English skills through engaging exercises,
                personalized learning paths, and comprehensive progress
                tracking.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6"
                onClick={onSignup}
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={onLogin}
              >
                Login
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1"
          >
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
              alt="Students learning English"
              className="rounded-xl shadow-2xl w-full max-w-lg mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive learning system is designed to help you master
            English efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="h-10 w-10 text-blue-500" />}
            title="Comprehensive Content"
            description="Access thousands of words, phrases, and sentences categorized by difficulty and topic."
          />
          <FeatureCard
            icon={<Brain className="h-10 w-10 text-purple-500" />}
            title="Adaptive Learning"
            description="Our system adapts to your progress, focusing on areas where you need more practice."
          />
          <FeatureCard
            icon={<Headphones className="h-10 w-10 text-green-500" />}
            title="Audio Pronunciation"
            description="Listen to native speakers and practice your pronunciation with feedback."
          />
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-yellow-500" />}
            title="Multiple Exercise Types"
            description="Engage with various exercise formats to keep learning fresh and effective."
          />
          <FeatureCard
            icon={<Rocket className="h-10 w-10 text-red-500" />}
            title="Progress Tracking"
            description="Monitor your improvement with detailed statistics and achievement badges."
          />
          <FeatureCard
            icon={<Globe className="h-10 w-10 text-teal-500" />}
            title="Community Learning"
            description="Connect with other learners and participate in language exchange activities."
          />
        </div>
      </section>

      {/* Exercise Types Preview */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Diverse Exercise Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore different ways to practice and improve your English
              skills.
            </p>
          </div>

          <Tabs
            defaultValue="multiple-choice"
            className="w-full max-w-4xl mx-auto"
          >
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger
                value="multiple-choice"
                className="flex flex-col items-center py-3 px-2 h-auto"
              >
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="text-xs">Multiple Choice</span>
              </TabsTrigger>
              <TabsTrigger
                value="matching"
                className="flex flex-col items-center py-3 px-2 h-auto"
              >
                <Lightbulb className="h-6 w-6 mb-2" />
                <span className="text-xs">Matching</span>
              </TabsTrigger>
              <TabsTrigger
                value="fill-blanks"
                className="flex flex-col items-center py-3 px-2 h-auto"
              >
                <MessageSquare className="h-6 w-6 mb-2" />
                <span className="text-xs">Fill Blanks</span>
              </TabsTrigger>
              <TabsTrigger
                value="word-pairing"
                className="flex flex-col items-center py-3 px-2 h-auto"
              >
                <Brain className="h-6 w-6 mb-2" />
                <span className="text-xs">Word Pairing</span>
              </TabsTrigger>
              <TabsTrigger
                value="audio"
                className="flex flex-col items-center py-3 px-2 h-auto"
              >
                <Headphones className="h-6 w-6 mb-2" />
                <span className="text-xs">Audio</span>
              </TabsTrigger>
              <TabsTrigger
                value="image-based"
                className="flex flex-col items-center py-3 px-2 h-auto"
              >
                <Globe className="h-6 w-6 mb-2" />
                <span className="text-xs">Image Based</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <TabsContent value="multiple-choice" className="mt-0">
                <h3 className="text-xl font-semibold mb-4">
                  Multiple Choice Questions
                </h3>
                <p className="mb-6">
                  Test your knowledge by selecting the correct answer from
                  multiple options.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium mb-3">
                      What is the past tense of "go"?
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 rounded border hover:bg-gray-50">
                        <input
                          type="radio"
                          id="opt1"
                          name="answer"
                          className="mr-3"
                        />
                        <label htmlFor="opt1">goed</label>
                      </div>
                      <div className="flex items-center p-2 rounded border bg-blue-50 border-blue-300">
                        <input
                          type="radio"
                          id="opt2"
                          name="answer"
                          className="mr-3"
                          checked
                        />
                        <label htmlFor="opt2" className="font-medium">
                          went
                        </label>
                      </div>
                      <div className="flex items-center p-2 rounded border hover:bg-gray-50">
                        <input
                          type="radio"
                          id="opt3"
                          name="answer"
                          className="mr-3"
                        />
                        <label htmlFor="opt3">gone</label>
                      </div>
                    </div>
                  </div>
                </div>
                <Button>Try Multiple Choice Exercises</Button>
              </TabsContent>

              <TabsContent value="matching" className="mt-0">
                <h3 className="text-xl font-semibold mb-4">
                  Matching Exercises
                </h3>
                <p className="mb-6">
                  Match words with their definitions or related concepts.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    Vocabulary
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    Words known and used by a person
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    Grammar
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    System and structure of language
                  </div>
                </div>
                <Button>Try Matching Exercises</Button>
              </TabsContent>

              <TabsContent value="fill-blanks" className="mt-0">
                <h3 className="text-xl font-semibold mb-4">
                  Fill in the Blanks
                </h3>
                <p className="mb-6">
                  Complete sentences by filling in missing words.
                </p>
                <div className="p-4 border rounded-lg mb-6">
                  <p className="mb-4">
                    The cat is sleeping on the{" "}
                    <Input
                      className="w-24 inline-block mx-2"
                      defaultValue="bed"
                    />{" "}
                    in the living room.
                  </p>
                  <p>
                    I{" "}
                    <Input
                      className="w-24 inline-block mx-2"
                      defaultValue="went"
                    />{" "}
                    to the store to buy some{" "}
                    <Input
                      className="w-24 inline-block mx-2"
                      defaultValue="groceries"
                    />
                    .
                  </p>
                </div>
                <Button>Try Fill in the Blanks Exercises</Button>
              </TabsContent>

              <TabsContent value="word-pairing" className="mt-0">
                <h3 className="text-xl font-semibold mb-4">Word Pairing</h3>
                <p className="mb-6">
                  Pair related words together to build vocabulary connections.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                    hot
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                    cold
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
                    big
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
                    small
                  </div>
                </div>
                <Button>Try Word Pairing Exercises</Button>
              </TabsContent>

              <TabsContent value="audio" className="mt-0">
                <h3 className="text-xl font-semibold mb-4">Audio Questions</h3>
                <p className="mb-6">
                  Listen to audio clips and answer questions about what you
                  hear.
                </p>
                <div className="p-4 border rounded-lg mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Headphones className="h-6 w-6" />
                    </Button>
                  </div>
                  <p className="text-center mb-4">
                    Listen to the audio and select the word you hear:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline">Welcome</Button>
                    <Button variant="outline">Weekend</Button>
                    <Button variant="outline">Weather</Button>
                    <Button variant="outline">Wednesday</Button>
                  </div>
                </div>
                <Button>Try Audio Exercises</Button>
              </TabsContent>

              <TabsContent value="image-based" className="mt-0">
                <h3 className="text-xl font-semibold mb-4">
                  Image-Based Questions
                </h3>
                <p className="mb-6">
                  Identify words or concepts based on images.
                </p>
                <div className="p-4 border rounded-lg mb-6">
                  <div className="flex justify-center mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=300&q=80"
                      alt="Cat"
                      className="rounded-lg w-40 h-40 object-cover"
                    />
                  </div>
                  <p className="text-center mb-4">What animal is this?</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline">Dog</Button>
                    <Button
                      variant="outline"
                      className="bg-blue-50 border-blue-300"
                    >
                      Cat
                    </Button>
                    <Button variant="outline">Bird</Button>
                    <Button variant="outline">Rabbit</Button>
                  </div>
                </div>
                <Button>Try Image-Based Exercises</Button>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            About English Learning Platform
          </h2>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg text-gray-700 mb-6">
              Welcome to our English Learning Platform, a comprehensive tool
              designed to help you master the English language through
              interactive exercises, personalized learning paths, and
              comprehensive progress tracking.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Whether you're a beginner just starting your English journey or an
              advanced learner looking to refine your skills, our platform
              offers content and exercises tailored to your level and learning
              goals.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Our Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
                <h4 className="text-xl font-semibold">Comprehensive Content</h4>
              </div>
              <p className="text-gray-700">
                Access thousands of words, phrases, and sentences categorized by
                difficulty and topic.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-purple-500 mr-3" />
                <h4 className="text-xl font-semibold">Adaptive Learning</h4>
              </div>
              <p className="text-gray-700">
                Our system adapts to your progress, focusing on areas where you
                need more practice.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Headphones className="h-8 w-8 text-green-500 mr-3" />
                <h4 className="text-xl font-semibold">Audio Pronunciation</h4>
              </div>
              <p className="text-gray-700">
                Listen to native speakers and practice your pronunciation with
                feedback.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={onSignup}
              size="lg"
              className="px-8 py-6 h-auto text-lg"
            >
              Start Learning Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied learners who have improved their English
            skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="This platform transformed my English learning journey. The variety of exercises keeps me engaged every day."
            name="Sarah Johnson"
            role="Business Professional"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
          />
          <TestimonialCard
            quote="I love how the system adapts to my learning pace. The audio exercises have significantly improved my pronunciation."
            name="Miguel Rodriguez"
            role="University Student"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=miguel"
          />
          <TestimonialCard
            quote="As a teacher, I recommend this platform to all my students. The progress tracking feature is particularly helpful."
            name="Emily Chen"
            role="English Teacher"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=emily"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Improve Your English?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of learners and start your journey to English
            fluency today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button
              className="bg-white text-blue-600 hover:bg-white/90"
              onClick={onSignup}
            >
              Get Started Free
            </Button>
          </div>

          <p className="mt-4 text-sm text-white/70">
            No credit card required. Start with our free plan.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 lg:px-8 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              English Learning Platform
            </h3>
            <p className="text-gray-400">
              Helping you master English through interactive exercises and
              personalized learning.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Exercise Types
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Progress Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Audio Pronunciation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Personalized Learning
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} English Learning Platform. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-4">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          className="text-blue-600 p-0 hover:text-blue-800 flex items-center"
        >
          Learn more <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
}

const TestimonialCard = ({
  quote,
  name,
  role,
  avatarUrl,
}: TestimonialCardProps) => {
  return (
    <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex justify-center mb-6">
          <img
            src={avatarUrl}
            alt={name}
            className="w-20 h-20 rounded-full border-4 border-blue-100"
          />
        </div>
        <p className="text-gray-700 italic mb-6">"{quote}"</p>
        <div className="text-center">
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandingPage;
