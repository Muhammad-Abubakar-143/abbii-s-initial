import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { CreatePost, Home } from "./pages";
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
        <h1 className="font-bold text-2xl font-inter space-x-2 ">Abbii.</h1>
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium px-4 py-2 text-white bg-[#6469ff] rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="bg-[#f9fafe] w-full min-h-[calc(100vh-73px)] sm:p-8 px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
