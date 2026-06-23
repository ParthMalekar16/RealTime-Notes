"use client";
import { useState } from "react";

export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (

    <main className="h-screen flex bg-brand-secondary">
      
     
      <aside className={`p-4 border-r-2 border-brand-border bg-brand-primary flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64 opacity-100" : "w-0 p-0 opacity-0 border-r-0"}`}>
        <div className="w-56"> 
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Collabnotes</h1>
            <button className="p-1 rounded bg-black text-white text-xs">+</button>
          </div>
          <input 
            type="text" 
            placeholder="Search notes..." 
            className="mt-4 w-full p-2 rounded border border-brand-border bg-brand-secondary text-sm"
          />
          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p className="font-semibold text-blue-600">🔴 Q3 Roadmap</p>
            <p>🟢 Meeting Notes</p>
            <p>🟣 Ideas Dump</p>
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