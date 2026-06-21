export default function Home() {
  return (
    <main className="h-screen flex">
      <aside className="w-64 border-r p-4">
        <h1 className="text-xl font-bold">Notes</h1>

        <button className="mt-4 w-full rounded bg-black text-white p-2">
          + New Note
        </button>

        <div className="mt-4">
          <p>Rocket Ideas</p>
          <p>Hackathon Plan</p>
          <p>College Notes</p>
        </div>
      </aside>

      <section className="flex-1 p-6">
        <h2 className="text-2xl font-bold">Rocket Ideas</h2>

        <textarea
          className="mt-4 w-full h-96 border rounded p-2"
          defaultValue="Build a TVC rocket..."
        />
      </section>
    </main>
  );
}