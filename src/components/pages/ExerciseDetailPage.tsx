import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExerciseWithOptions } from "@/lib/api";
import ExerciseContainer from "@/components/exercises/ExerciseContainer";

const ExerciseDetailPage = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercise = async () => {
      if (!exerciseId) return;

      try {
        const data = await getExerciseWithOptions(exerciseId);
        setExercise(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exercise:", err);
        setError("Failed to load exercise. Please try again later.");
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  const handleExerciseComplete = (score: number, total: number) => {
    // In a real app, we would save the result to the database
    console.log(`Exercise completed with score ${score}/${total}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error || "Exercise not found"}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ExerciseContainer
        title={exercise.title}
        description={exercise.description}
        defaultExerciseType={exercise.exercise_type?.name || "multiple-choice"}
        onComplete={handleExerciseComplete}
      />
    </div>
  );
};

export default ExerciseDetailPage;
