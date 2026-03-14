import Gallery from "./components/Gallery";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      <div className="max-w-7xl mx-auto py-8">

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-800">
          📸 Photo Gallery
        </h1>

        <Gallery />

      </div>

    </div>
  );
}

export default App;