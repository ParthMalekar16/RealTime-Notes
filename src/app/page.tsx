"use client";
import { useState, useEffect, type MouseEvent } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("collabnotes_data");
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes) as Note[];
      setNotes(parsedNotes);
      if (parsedNotes.length > 0) {
        setActiveNoteId(parsedNotes[0].id);
      }
    } else {
      const defaultNotes: Note[] = [
        {
          id: 1,
          title: "Welcome to CollabNotes",
          content: "Start writing your ideas!",
          pinned: false,
        },
      ];
      setNotes(defaultNotes);
      setActiveNoteId(1);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("collabnotes_data", JSON.stringify(notes));
    }
  }, [notes]);

  const activeNote = notes.find((note) => note.id === activeNoteId) || notes[0];

  const handleAddNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      pinned: false,
    };
    setNotes((prev) => [...prev, newNote]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (field: "title" | "content", newValue: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === activeNoteId) {
          return {
            ...note,
            [field]: newValue,
          };
        }
        return note;
      })
    );
  };

  const handleDeleteNote = (idToDelete: number, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const remainingNotes = notes.filter((note) => note.id !== idToDelete);
    setNotes(remainingNotes);

    if (activeNoteId === idToDelete) {
      setActiveNoteId(remainingNotes[0]?.id ?? null);
    }
  };

  const handleTogglePinNote = (idToPin: number, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === idToPin) {
          return {
            ...note,
            pinned: !note.pinned,
          };
        }
        return note;
      })
    );
  };

  return (
    <main className="h-screen w-screen max-w-full flex m-0 p-0 overflow-hidden bg-brand-secondary">
      <aside className={`p-4 border-r-2 border-brand-border bg-brand-primary flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${sidebarOpen ? "w-80 opacity-100 pointer-events-auto" : "w-0 p-0 opacity-0 border-r-0 pointer-events-none"}`}>
        <div className="w-72 overflow-hidden"> 
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-sans font-bold">Collabnotes</h1>
            <button onClick={handleAddNote} className="w-7 h-7 flex items-center justify-center rounded-lg bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer text-xs font-sans font-bold">+</button>
          </div>
          
          <div className="relative mt-4 flex items-center">
            <div className="absolute left-3 pointer-events-none flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.602z" />
              </svg>
            </div>
            <input 
            value = {searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            
              type="text" 
              placeholder="Search notes..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-brand-border bg-brand-secondary text-sm font-sans focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div className="mt-6 space-y-3">
            {[...notes]
            .filter((note) => 
              note.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
              .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
              .map((note) => (
                <div 
                  key={note.id} 
                  onClick={() => setActiveNoteId(note.id)}
                  className={`relative p-3 rounded-xl border transition-all cursor-pointer group ${
                    note.id === activeNoteId 
                      ? "border-gray-400 bg-brand-primary shadow-sm" 
                      : "border-brand-border bg-brand-secondary hover:border-gray-300"
                  }`}
                >
                  <div className="absolute top-2.5 right-2.5 flex gap-2 text-xs">
                    <button 
                      onClick={(e) => handleTogglePinNote(note.id, e)} 
                      className={`transition-colors cursor-pointer ${
                        note.pinned ? "text-yellow-500 opacity-100" : "text-gray-300 hover:text-gray-500"
                      }`}
                    >
                      📌
                    </button>
                    <button 
                      onClick={(e) => handleDeleteNote(note.id, e)} 
                      className="text-gray-400 hover:text-red-600 transition-colors font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 pr-12 truncate">
                    {note.title || "Untitled Note"}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500/80 leading-relaxed line-clamp-2">
                    {note.content || "No additional text..."}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full min-w-0 w-full">
        <header className="h-16 p-4 border-b-2 border-brand-border bg-brand-primary flex items-center w-full gap-4 relative z-10">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 rounded-lg hover:bg-brand-secondary transition-colors cursor-pointer text-gray-600 hover:text-gray-900 flex items-center justify-center"
            aria-label="Toggle Sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </header>
        
        <section className="flex-1 p-6 overflow-y-auto bg-brand-secondary w-full min-w-0 flex flex-col gap-4">
          {activeNote ? (
            <>
              <input 
                type="text"
                value={activeNote.title}
                onChange={(e) => handleUpdateNote("title", e.target.value)}
                className="text-3xl font-bold bg-transparent border-none outline-none text-gray-900 w-full font-sans"
                placeholder="Untitled Note"
              />
              <textarea 
                value={activeNote.content}
                onChange={(e) => handleUpdateNote("content", e.target.value)}
                className="flex-1 w-full bg-transparent border-none outline-none resize-none text-gray-700 font-sans leading-relaxed text-base"
                placeholder="Start writing your thoughts here..."
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 font-sans">
              Select a note or create a new one to begin writing.
            </div>
          )}
        </section>
        
        <footer className="h-16 p-4 border-t-2 border-brand-border bg-brand-primary flex items-center w-full">
        </footer>
      </div>
    </main>
  );
}