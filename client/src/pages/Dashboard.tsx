import { DashNavbar } from "../components/DashNav";
import { NoteCard, type NoteCardProps } from "../components/NoteCard";
import { SideBar } from "../components/SideBar";
import { SemanticSearch } from "../components/SemanticSearch";
import { ContentAnalysis } from "../components/ContentAnalysis";
import { useAuth } from "../hooks/AuthContext";
import { useEffect, useState } from "react";
import api from "../utils/api";
import AddBrain from "../components/AddBrain";
import { Loader2 } from "lucide-react";

export const Dashboard = () => {
  const [notes, setNotes] = useState<NoteCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [analyzingNote, setAnalyzingNote] = useState<NoteCardProps | null>(null);
  const { user } = useAuth();

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/content");
      if (res.data && Array.isArray(res.data.content)) {
        const mapped = res.data.content.map((c: any) => ({
          contentId: c._id || c.contentId,
          _id: c._id,
          title: c.title,
          link: c.link,
          type: c.type,
          tags: Array.isArray(c.tags)
            ? c.tags.map((t: any) => (typeof t === "string" ? t : t.title))
            : [],
        }));
        setNotes(mapped);
      } else {
        setNotes([]);
      }
    } catch (err: any) {
      if (err.response?.status !== 404) {
        console.error("Failed to fetch notes", err);
      }
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete("/api/v1/content", {
        data: { contentId: id },
      });
      fetchNotes();
    } catch (err) {
      console.error("Failed to delete content", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Link" || selectedFilter === "URL") {
      return note.type === "Link" || note.type === "URL";
    }
    return note.type === selectedFilter;
  });

  return (
    <section className="h-screen overflow-hidden bg-gradient-to-tl from-slate-900 via-blue-950 to-slate-900 flex flex-col justify-between">
      <DashNavbar />

      <div className="mx-auto max-w-7xl w-full px-3 sm:px-4 md:px-6 lg:px-8 flex-1 overflow-y-auto pb-24">
        <div className="py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-200">
            Welcome back, <span className="text-blue-400">{user?.name || "Explorer"}</span>! 👋
          </h1>

          <SemanticSearch />

          <div className="flex items-center justify-between my-4 sm:my-6">
            <h2 className="text-lg font-semibold text-gray-300">
              {selectedFilter === "All" ? "All Brain Content" : `${selectedFilter} Content`}
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                {filteredNotes.length}
              </span>
            </h2>
            <AddBrain onAdd={fetchNotes} />
          </div>

          {/* Grid of cards */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <span className="ml-3 text-gray-400">Loading your knowledge base...</span>
            </div>
          ) : filteredNotes.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.contentId || note._id || note.title}
                  contentId={note.contentId}
                  _id={note._id}
                  title={note.title}
                  link={note.link}
                  type={note.type}
                  tags={note.tags}
                  onDelete={handleDelete}
                  onAnalyze={(n) => setAnalyzingNote(n)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 border border-dashed border-white/10 rounded-2xl p-8">
              <p className="text-gray-400 text-lg">No content found in this category.</p>
              <p className="text-gray-500 text-sm mt-1">Click "Add Brain" above to save new notes, videos, or links!</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar filter tabs anchored to bottom */}
      <div className="sticky bottom-0 z-40 w-full">
        <SideBar selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
      </div>

      {/* AI Analysis Modal */}
      {analyzingNote && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full my-8">
            <ContentAnalysis
              contentId={analyzingNote.contentId || analyzingNote._id}
              title={analyzingNote.title}
              tags={analyzingNote.tags}
              type={analyzingNote.type}
              link={analyzingNote.link}
              onClose={() => setAnalyzingNote(null)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

