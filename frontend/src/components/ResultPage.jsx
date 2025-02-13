import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import RulerCanvas from "./RulerCanvas";
export default function ResultPage() {
  const [rulerData, setRulerData] = useState({
    x: 100,
    y: 200,
    angle: 0,
    width: 200,
    scaleX: 1,
  });
  const [pixelCount, setPixelCount] = useState(0);
  const canvasRef = useRef(null);
  const location = useLocation();
  const imageUrl = new URLSearchParams(location.search).get("image");
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log("About to load image");
    if (!imageUrl) {
      console.log("no path provided");
      return;
    }

    console.log("Path is provided", imageUrl);

    const img = new Image();
    img.onload = () => {
      console.log("Image loaded");
      setImage(img);
      draw(img);
    };
    img.src = imageUrl;
    console.log("image source set");
    function draw(img) {
      console.log(`Loading image: ${imageUrl}`);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height; // why are we using img and not image?
      ctx.drawImage(img, 0, 0);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (image && rulerData.width > 0) {
      processImage();
    }
  }, [rulerData, imageUrl]);

  const handleRulerUpdate = (newData) => {
    // console.log(`Ruler updated: ${JSON.stringify(newData)}`);
    setRulerData((prevData) => ({ ...prevData, ...newData })); // Update state with ruler's position and dimensions
  };

  function processImage() {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    console.log("Processing image");
    const ctx = canvas.getContext("2d");

    // convert image to pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // try with image instead of canvas
    const pixels = imageData.data;

    // calculate the ruler's endpoits
    const x1 = Math.round(rulerData.x);
    const y1 = Math.round(rulerData.y);
    const x2 = Math.round(x1 + rulerData.width * Math.cos(rulerData.angle));
    const y2 = Math.round(y1 + rulerData.width * Math.sin(rulerData.angle));

    console.log(`Ruler endpoints: (${x1}, ${y1}) -->(${x2}, ${y2})`);

    // count white pixels along the line between (x1, y1) and (x2, y2)
    let count = 0;
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    let x = x1,
      y = y1;
    while (x !== x2 || y !== y2) {
      const index = (y * image.width + x) * 4; // pixel index in the array
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];

      if (r === 255 && g === 255 && b === 255) {
        count++;
      }

      // bresenham's line algorithm for stepping through the pixels
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }

    setPixelCount(count);
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Processed Image</h2>
      <div className="relative max-w-md">
        {imageUrl ? (
          <>
            <canvas
              ref={canvasRef}
              className="w-full border border-gray-300 z-10"
            />
            <RulerCanvas
              onRulerUpdate={handleRulerUpdate}
              className="absolute top-0 left-0 w-full h-full z-20"
            />
          </>
        ) : (
          <p className="text-red-500">No image available.</p>
        )}
      </div>
      <p>
        Ruler Position: X: {rulerData.x}, Y: {rulerData.y}
      </p>
      <p>Angle: {rulerData.angle}°</p>
      <p>Width: {rulerData.width}px</p>
      <h3>White Pixels Count: {pixelCount}</h3>
    </div>
  );
}
