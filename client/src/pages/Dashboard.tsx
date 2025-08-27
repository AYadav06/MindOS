import { DashNavbar } from "../components/DashNav";
import { NoteCard, type NoteCardProps } from "../components/NoteCard";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../hooks/AuthContext";
import { useEffect, useState } from "react";
import api from "../utils/api";
import AddBrain from "../components/AddBrain";


export const Dashboard = () => {
  const [notes, setNotes] = useState<NoteCardProps[]>([]);
  const { user, logout } = useAuth();

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
    <section className="min-h-screen bg-gradient-to-tl from-slate-800 via-blue-950 to-slate-700">
      <DashNavbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-semibold mb-6 text-gray-200">
            Happy To See You Back! {user?.name}
          </h1>
          <AddBrain onAdd={fetchNotes} />
          {/* Grid of cards */}
          <div className="grid gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              <p className="text-gray-400">No notes yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
