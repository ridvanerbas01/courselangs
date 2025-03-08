import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Brain,
  Headphones,
  MessageSquare,
  Rocket,
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        About English Learning Platform
      </h1>

      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg text-gray-700 mb-6">
          Welcome to our English Learning Platform, a comprehensive tool
          designed to help you master the English language through interactive
          exercises, personalized learning paths, and comprehensive progress
          tracking.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Whether you're a beginner just starting your English journey or an
          advanced learner looking to refine your skills, our platform offers
          content and exercises tailored to your level and learning goals.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Our Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Our Mission
      </h2>

      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg text-gray-700 mb-6">
          Our mission is to make English language learning accessible, engaging,
          and effective for learners worldwide. We believe that language
          learning should be a journey of discovery, not a chore.
        </p>
        <p className="text-lg text-gray-700">
          By combining proven language learning methodologies with modern
          technology, we aim to create an environment where learners can
          progress at their own pace while staying motivated and engaged.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Contact Us
      </h2>

      <div className="max-w-xl mx-auto text-center">
        <p className="text-lg text-gray-700 mb-4">
          Have questions, suggestions, or feedback? We'd love to hear from you!
        </p>
        <p className="text-lg text-gray-700">
          Email us at:{" "}
          <a
            href="mailto:support@englishlearning.com"
            className="text-blue-600 hover:underline"
          >
            support@englishlearning.com
          </a>
        </p>
      </div>
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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AboutPage;
