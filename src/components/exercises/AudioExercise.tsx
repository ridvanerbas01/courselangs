import React, { useState, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Progress } from "../ui/progress";
import { Play, Pause, SkipBack, Volume2, VolumeX } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface AudioExerciseProps {
  title?: string;
  question?: string;
  audioSrc?: string;
  options?: string[];
  correctAnswer?: string;
  onSubmit?: (answer: string) => void;
}

const AudioExercise = ({
  title = "Listen and Choose",
  question = "Listen to the audio and select the correct word you hear.",
  audioSrc = "https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-0.mp3",
  options = ["Hello", "Welcome", "Goodbye", "Thank you"],
  correctAnswer = "Welcome",
  onSubmit = () => {},
}: AudioExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    // Set up event listeners
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setPlayCount((prev) => prev + 1);
    });

    // Clean up
    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("timeupdate", () => {});
      audio.removeEventListener("ended", () => {});
    };
  }, [audioSrc]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        togglePlayPause();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption);
      setHasSubmitted(true);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-2">{question}</p>
        </div>

        {/* Audio Player */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={resetAudio}
                      className="hover:bg-gray-200"
                    >
                      <SkipBack className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Restart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlayPause}
                      className="hover:bg-gray-200"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isPlaying ? "Pause" : "Play"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="text-sm text-gray-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="hover:bg-gray-200"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isMuted ? "Unmute" : "Mute"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="w-24">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.01}
              onValueChange={handleTimeChange}
              className="mt-2"
            />
          </div>

          <div className="mt-2 text-center text-sm text-gray-500">
            Played {playCount} {playCount === 1 ? "time" : "times"}
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? "default" : "outline"}
              className={`p-4 h-auto text-lg ${hasSubmitted && option === correctAnswer ? "bg-green-100 border-green-500" : ""} ${hasSubmitted && selectedOption === option && option !== correctAnswer ? "bg-red-100 border-red-500" : ""}`}
              onClick={() => !hasSubmitted && handleOptionSelect(option)}
              disabled={hasSubmitted}
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleSubmit}
            disabled={!selectedOption || hasSubmitted}
            className="px-8 py-2"
          >
            Submit Answer
          </Button>
        </div>

        {hasSubmitted && (
          <div
            className={`p-4 rounded-lg text-center ${selectedOption === correctAnswer ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {selectedOption === correctAnswer ? (
              <p className="font-medium">Correct! Well done.</p>
            ) : (
              <div>
                <p className="font-medium">Incorrect. The correct answer is:</p>
                <p className="font-bold mt-1">{correctAnswer}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AudioExercise;
