import { DashNavbar } from "../components/DashNav";
import { NoteCard, type NoteCardProps } from "../components/NoteCard";
import { SideBar } from "../components/SideBar";
import { SemanticSearch } from "../components/SemanticSearch";
import { useAuth } from "../hooks/AuthContext";
import { useEffect, useState } from "react";
import api from "../utils/api";
import AddBrain from "../components/AddBrain";


export const Dashboard = () => {
  const [notes, setNotes] = useState<NoteCardProps[]>([]);
  const { user} = useAuth();

  const fetchNotes = async () => {
    try {
      const res = await api.get("/api/v1/content",{
        
      });

      const mapped = res.data.content.map((c: any) => ({
        title: c.title,
        link: c.link,
        type: c.type,
        tags: c.tags.map((t: any) => t.title),
      }));

      setNotes(mapped);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <section className="h-screen overflow-hidden bg-gradient-to-tl from-slate-800 via-blue-950 to-slate-700">
      <DashNavbar />

    
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-200">
            Happy To See You Back! <span className="block sm:inline">{user?.name}</span>
          </h1>
          <SemanticSearch />
          <div className="mb-4 sm:mb-6">
            <AddBrain onAdd={fetchNotes} />
          </div>
          {/* Grid of cards */}
          <div className="grid gap-4 sm:gap-6 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteCard
                  key={note.title + note.link}
                  title={note.title}
                  link={note.link}
                  type={note.type}
                  tags={note.tags}
                />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center py-8">No notes yet.</p>
            )}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 z-40 w-screen">
          <SideBar />
      </div>
    </section>
  );
};
