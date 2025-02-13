import ImageProcessor from "./components/ImageProcessor";
import "./styles.scss";
import sampleImage from "./assets/crack1.png ";
const App = () => {
  const imageSrc = "";

  return (
    <div className="App">
      <h1>Crack Measurement Tool</h1>
      <ImageProcessor imageSrc={sampleImage} />
    </div>
  );
};

export default App;
