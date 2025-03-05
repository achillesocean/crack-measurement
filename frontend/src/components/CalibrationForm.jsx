import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useScaleFactor } from "../context/ScaleFactorContext";
import RulerCanvas from "./RulerCanvas";
import milliRuler from "../assets/milliRuler.jpg";
// we present a picture of a  ruler that we've already set, then the user chooses a pixel counter ruler the same way. there will be a form that takes both the pixel count, and the metric measurement the pixels span on the image. from there, we create a simple scale-factor, mm/px, then save that throughout the app. so how can we have two different instances of the pixel ruler on the different routes, and how are we gonna save the scale factor throughout the app?
// this page will essentially be very similar to the resultpage.jsx. except for the ruler image which will be static and constant.

export default function CalibrationForm() {
  const [realWorldLength, setRealWorldLength] = useState("");
  const { scaleFactor, setScaleFactor } = useScaleFactor();
  const [rulerWidth, setRulerWidth] = useState(0);

  const canvasRef = useRef(null);
  const location = useLocation();
  // const imageUrl = new URLSearchParams(location.search).get("image");
  const imageUrl = milliRuler;
  // imageUrl should be a given here. but where do we store the image? do we store it inside the backend's static folder?
  const [image, setImage] = useState(null);

  // add the form. just two inputs, one scale-factor display. we just need to hold on to the scale-factor state. the way it works is you make sure the pixel ruler spans the ruler in the image.

  useEffect(() => {
    console.log("About to load image");
    if (!imageUrl) {
      console.log("no path provided");
      return;
    }

    console.log("Path is provided", imageUrl);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      console.log("Image loaded");
      setImage(img);
      draw(img); // what about these functions? won't they clash with other same-name functions in the other components when all the components are imported into the same place?
    };
    img.onerror = () => {
      console.error("Image failed to load. Check the path:", imageUrl);
    };
    img.src = imageUrl;
    console.log("image source set");
    function draw(img) {
      console.log(`Loading image: ${imageUrl}`);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      // canvas.width = img.width;
      // canvas.height = img.height; // why are we using img and not image?
      ctx.drawImage(img, 0, 0);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (!image) return;

    console.log("Re-drawing image on canvas");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // canvas.width = image.width;
    // canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  }, [image]); // Runs whenever `image` updates

  const handleRulerUpdate = ({ width }) => {
    setRulerWidth(width);
  };

  const handleCalibration = () => {
    if (rulerWidth > 0 && realWorldLength > 0) {
      const newScaleFactor = realWorldLength / rulerWidth;
      setScaleFactor(newScaleFactor);
      // scale factor shouldn't update like this, but there should be a form for the user to input how much of the real-world ruler in the image that the pixel ruler spans, then submits for scale factor calculation.
      console.log("Scale factor set: ", newScaleFactor);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative ">
        {image ? (
          <>
            <canvas
              width={image.width}
              height={image.height}
              ref={canvasRef}
              className="  w-full border border-gray-300 z-10 width-full h-full"
            />
            <RulerCanvas
              image={image}
              onRulerUpdate={handleRulerUpdate}
              className="absolute top-0 left-0 w-full h-full z-20"
            />
            {/* <p>
                Image dimensions: {image.width} x {image.height}
              </p> */}
          </>
        ) : (
          <p className="text-red-500">No image available.</p>
        )}
      </div>
      {/* <p>
        Ruler Position: X: {rulerData.x}, Y: {rulerData.y}
        </p> */}
      {/* <p>Angle: {rulerData.angle}°</p> */}
      <p>Pixels Width: {rulerWidth}px</p>
      {/* here we insert  */}
      <label>
        Real-World Length {"(mm)"}:{" "}
        <input
          type="number"
          value={realWorldLength}
          onChange={(e) => setRealWorldLength(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
      </label>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCalibration}
      >
        Set Scale Factor
      </button>
      <h3>Scale Factor: {scaleFactor}</h3>
    </div>
  );
}
