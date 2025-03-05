import { useEffect, useRef, useState } from "react";
// import fabric from "fabric";
import { Canvas, Rect } from "fabric";
import { SquareIcon } from "sebikostudio-icons";
// import "../styles.scss";

//update the position/css of the button.
const RulerCanvas = ({ onRulerUpdate, image }) => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    // Initialize Fabric.js Canvas
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: image.width,
        height: image.height,
        backgroundColor: "transparent",
      });

      initCanvas.renderAll();
      setFabricCanvas(initCanvas);

      return () => {
        initCanvas.dispose(); // why initCanvas?
      };
    }
  }, []);

  const addRuler = () => {
    if (fabricCanvas) {
      // Create a movable & rotatable ruler
      const ruler = new Rect({
        left: 0,
        top: 0,
        width: 200,
        height: 20,
        fill: "transparent",
        stroke: "red",
        strokeWidth: 2,
        angle: 0,
        selectable: true,
        lockScalingY: true,
        // lockScalingX: false,
      });

      // Listen for modifications (position, angle)
      ruler.on("modified", () => {
        // console.log(`Ruler modified: ${JSON.stringify(ruler.toJSON())}`);
        onRulerUpdate({
          x: ruler.left,
          y: ruler.top,
          angle: ruler.angle,
          width: ruler.width * ruler.scaleX,
          scaleX: ruler.scaleX,
        });
      });
      fabricCanvas.add(ruler);
      console.log("Ruler Added!");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-row gap-3 items-center">
      <canvas id="canvasRuler" ref={canvasRef} className="w-full h-full" />
      <button
        style={{ cursor: "pointer" }}
        onClick={addRuler}
        className="mt-4 p-2 bg-gray-600 text-white rounded hover:bg-gray-500"
      >
        Add Ruler
      </button>
    </div>
  );
};

export default RulerCanvas;
