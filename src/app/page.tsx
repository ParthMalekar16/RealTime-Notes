"use client";
import { useState } from "react";

export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notes, setNotes] = useState([
  {
    id: 1,
    title: "Q3 Roadmap",
    content: "Key priorities for Q3: Launch new onboarding flow and cross-platform syncing.",
  }
]);

const handleAddNote = () => {
  const newNote = {
    id: Date.now(), // Generates a unique ID
    title: "Untitled Note",
    content: "No additional text...",
  };
  
  // Spreads the existing notes and tacks the new one onto the end
  setNotes([...notes, newNote]);
};

  return (

    <main className="h-screen flex bg-brand-secondary">
      
     
      <aside className={`p-4 border-r-2 border-brand-border bg-brand-primary flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? "w-76 opacity-100" : "w-0 p-0 opacity-0 border-r-0"}`}>
        <div className="w-67 overflow-hidden"> 
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-sans font-bold">Collabnotes</h1>
            <button  onClick={handleAddNote} suppressHydrationWarning className="w-7 h-7 flex items-center justify-center rounded-lg bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer text-xs font-sans font-bold">+</button>
          </div>
          <div className="relative mt-4 flex items-center">
  <div className="absolute left-3 pointer-events-none flex items-center justify-center">
    <svg 
      className="w-4 h-4 text-gray-400" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.602z"
      />
    </svg>
  </div>
  <input 
    type="text" 
    placeholder="Search notes..." 
    className="w-full pl-9 pr-4 py-2 rounded-lg border border-brand-border bg-brand-secondary text-sm font-sans focus:outline-none focus:border-gray-400 transition-colors"
  />
</div>

<div className="mt-6 space-y-3">
  {notes.map((note) => (
    <div 
      key={note.id} 
      className="relative p-3 rounded-xl border border-brand-border bg-brand-secondary hover:border-gray-300 transition-all cursor-pointer group"
    >
      {/* Action Icons */}
      <div className="absolute top-2.5 right-2.5 flex gap-2 text-xs">
        <button className="text-gray-300 hover:text-red-500 transition-colors">📌</button>
        <button className="text-gray-400 hover:text-red-600 transition-colors font-bold">✕</button>
      </div>

      {/* Dynamic Title */}
      <h3 className="text-sm font-semibold text-gray-900 pr-12 truncate">
        {note.title}
      </h3>

      {/* Dynamic Content Preview */}
      <p className="mt-1 text-xs text-gray-500/80 leading-relaxed line-clamp-2">
        {note.content}
      </p>
    </div>
  ))}
</div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full">
        <header className="h-16 p-4 border-b-2 border-brand-border bg-brand-primary flex items-center">
        </header>
        <section  className="flex-1 p-6 overflow-y-auto bg-brand-secondary">
        </section>
        <footer className="h-16 p-4 border-t-2 border-brand-border bg-brand-primary flex items-center">
        </footer>

      </div>

      
      

    </main>
  );
}