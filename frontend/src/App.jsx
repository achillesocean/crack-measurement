import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import ResultPage from "./components/ResultPage";
import CalibrationForm from "./components/CalibrationForm";
import { ScaleFactorProvider } from "./context/ScaleFactorContext";
export default function App() {
  return (
    <ScaleFactorProvider>
      <Router>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<CalibrationForm />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </Router>
    </ScaleFactorProvider>
  );
}
