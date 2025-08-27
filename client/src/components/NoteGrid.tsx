// NoteGrid.tsx
import { NoteCard, type NoteCardProps} from "./NoteCard";

type NoteGridProps = {
  notes: NoteCardProps[];
};

export const NoteGrid: React.FC<NoteGridProps> = ({ notes }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6">
      {notes.map((note, idx) => (
        <NoteCard key={idx} {...note} />
      ))}
    </div>
  );
};
