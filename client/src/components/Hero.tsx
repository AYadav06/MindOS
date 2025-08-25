
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NoteCard, type NoteCardProps} from "./NoteCard";




export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<NoteCardProps[]>([
    {
      title: "Finance update",
      link: "https://financeupdate.com",
      type: "Notes",
      tags: ["Finance", "Update"],
    },
    {
      title: "React Hooks Deep Dive",
      link: "https://youtube.com",
      type: "YouTube",
      tags: ["React", "Frontend"],
    },
     {
      title: "My Learing Notes",
      link: "https://mindos.com",
      type: "URL",
      tags: ["Youtube", "Notes"],
    }, {
      title: "AI Vs Human",
      link: "https://x.com",
      type: "Tweets",
      tags: ["AI", "Human"],
    },
  ]);

  // Random generators
  const randomTitles = ["Idea Stream", "Brain Dump", "Quick Thought", "Innovation Pulse", "Mind Map"];
  const randomTags = ["Idea", "Brainstorm", "Concept", "Research", "Quick Note", "Priority"];
  const randomTypes: NoteCardProps["type"][] = ["YouTube", "Notes", "Tweets", "URL"];

  const getRandomItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

  // Add Brain button logic
  const handleAddBrain = () => {
    const newBrain: NoteCardProps = {
      title: getRandomItem(randomTitles),
      link: "https://example.com",
      type: getRandomItem(randomTypes),
      tags: Array.from({ length: 2 }, () => getRandomItem(randomTags)),
    };
    setNotes((prev) => [...prev, newBrain]);
  };
  return (
    <section className="relative overflow-hidden dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto flex gap-15 px-8 py-20 md:flex-row bg-[url(/background.png)] mask-r-from-95% mask-b-from-90%">
   
                
        {/* Left Content */}
        <div className="relative max-h-75 max-w-150 mt-5 ">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className=" text-center md:text-left max-h-80"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-7xl">
              <span className="from-light-primary to-light-secondary bg-gradient-to-r bg-clip-text text-transparent">
                MindOS
              </span>{" "}
              — Turn chaos into clarity.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-900 dark:text-gray-300">
              Mind-OS is your personal knowledge engine. Effortlessly capture
              your thoughts, connect disparate ideas, and build a digital
              extension of your mind.
            </p>
            <div className="mt-4 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Button
                onClick={() => navigate("/signup")}
                size="lg"
                className="bg-light-secondary text-light-text shadow-lg hover:bg-white"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
            </div>
          </motion.div>
        </div>

        {/* Right Content - Notes Grid */}
        <div className="flex-col w-1/2 mt-2">
        <div className="flex justify-end mr-4 "> 
          <Button
                onClick={handleAddBrain}
                size="lg"
                className="bg-light-secondary text-light-text shadow-lg hover:bg-white mb-5"
                >
             <Plus className="ml-1 h-6 w-6" /> Brain
              </Button>
                </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 "
          >
            <AnimatePresence>
              {notes.map((note, i) => (
                <NoteCard key={i} {...note} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};



