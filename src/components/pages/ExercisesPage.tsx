import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getExerciseTypes, getExercises } from "@/lib/api";
import { Database } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  ListChecks,
  Award,
  Headphones,
  Clock,
} from "lucide-react";
import ExerciseSelector from "@/components/exercises/ExerciseSelector";
import ExerciseContainer from "@/components/exercises/ExerciseContainer";

type ExerciseType = Database["public"]["Tables"]["exercise_types"]["Row"];
type Exercise = Database["public"]["Tables"]["exercises"]["Row"];

const ExercisesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const exerciseTypeParam = queryParams.get("type");

  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const types = await getExerciseTypes();
        setExerciseTypes(types);

        // If type is specified in URL, use that, otherwise use first type
        if (exerciseTypeParam) {
          const matchingType = types.find(
            (t) => t.name.toLowerCase() === exerciseTypeParam.toLowerCase(),
          );
          if (matchingType) {
            setSelectedType(matchingType.id);
            const exerciseData = await getExercises({
              exerciseTypeId: matchingType.id,
            });
            setExercises(exerciseData);
          } else if (types.length > 0) {
            setSelectedType(types[0].id);
            const exerciseData = await getExercises({
              exerciseTypeId: types[0].id,
            });
            setExercises(exerciseData);
          }
        } else if (types.length > 0) {
          setSelectedType(types[0].id);
          const exerciseData = await getExercises({
            exerciseTypeId: types[0].id,
          });
          setExercises(exerciseData);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching exercise data:", err);
        setError("Failed to load exercises. Please try again later.");
        setLoading(false);
      }
    };

    fetchExerciseData();
  }, [exerciseTypeParam]);

  useEffect(() => {
    const fetchExercisesByType = async () => {
      if (!selectedType) return;

      try {
        setLoading(true);
        const exerciseData = await getExercises({
          exerciseTypeId: selectedType,
        });
        setExercises(exerciseData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exercises by type:", err);
        setError("Failed to load exercises. Please try again later.");
        setLoading(false);
      }
    };

    fetchExercisesByType();
  }, [selectedType]);

  const handleExerciseSelect = (exerciseType: string) => {
    const type = exerciseTypes.find((t) => t.name === exerciseType);
    if (type) {
      setSelectedType(type.id);
      // Update URL without reloading the page
      navigate(`/exercises?type=${exerciseType.toLowerCase()}`, {
        replace: true,
      });
    }
  };

  const handleStartExercise = (exerciseId: string) => {
    navigate(`/exercise/${exerciseId}`);
  };

  const getExerciseTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "multiple-choice":
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case "fill-blanks":
        return <ListChecks className="h-5 w-5 text-green-500" />;
      case "matching":
        return <Award className="h-5 w-5 text-purple-500" />;
      case "audio":
        return <Headphones className="h-5 w-5 text-yellow-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-blue-500" />;
    }
  };

  if (loading && !exercises.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentExerciseType =
    exerciseTypes.find((t) => t.id === selectedType)?.name || "multiple-choice";

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-2">
          {getExerciseTypeIcon(currentExerciseType)}
          <h1 className="text-2xl font-bold">Practice Exercises</h1>
        </div>
      </div>

      <ExerciseSelector
        onSelectExercise={handleExerciseSelect}
        selectedExercise={currentExerciseType}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {currentExerciseType} Exercises
        </h2>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
          </div>
        ) : exercises.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No exercises found for this type.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <Card
                key={exercise.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <CardTitle>{exercise.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    {exercise.description ||
                      "Practice your skills with this exercise."}
                  </p>
                  <Button
                    onClick={() => handleStartExercise(exercise.id)}
                    className="w-full"
                  >
                    Start Exercise
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Show a sample exercise container if no exercises are available */}
        {exercises.length === 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">Try a Sample Exercise</h3>
            <ExerciseContainer
              title={`Sample ${currentExerciseType} Exercise`}
              description="Practice with this sample exercise to improve your skills."
              defaultExerciseType={currentExerciseType.toLowerCase()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;
