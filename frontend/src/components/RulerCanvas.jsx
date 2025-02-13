import { useEffect, useRef, useState } from "react";
// import fabric from "fabric";
import { Canvas, Rect } from "fabric";
import { SquareIcon } from "sebikostudio-icons";
// import "../styles.scss";

const RulerCanvas = ({ onRulerUpdate }) => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    // Initialize Fabric.js Canvas
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
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
        left: 100,
        top: 200,
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
        console.log(`Ruler modified: ${JSON.stringify(ruler.toJSON())}`);
        onRulerUpdate({
          x: ruler.left,
          y: ruler.top,
          angle: ruler.angle,
          width: ruler.width * ruler.scaleX,
          scaleX: ruler.scaleX,
        });
      });
      fabricCanvas.add(ruler);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full ">
      <div
        style={{
          // display: "flex",
          // gap: "8px",
          // flexDirection: "column",
          padding: "8px 8px",
          borderRadius: "8px",
          position: "fixed",
          top: "50%",
          transform: "translateY(-50%)",
          // left: "16px",
        }}
        className="absolute right-4 transform bg-gray-800 p-2 rounded shadow-lg"
      >
        <button
          style={{ cursor: "pointer" }}
          onClick={addRuler}
          className="p-2 bg-gray-600 text-white rounded hover:bg-gray-500 z-20"
        >
          <SquareIcon className="w-6 h-6" />
        </button>
      </div>
      <canvas id="canvas" ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default RulerCanvas;
