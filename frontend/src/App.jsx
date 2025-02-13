import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import ResultPage from "./components/ResultPage";
export default function App() {
  return (
    <Router>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}
