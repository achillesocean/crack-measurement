import { useEffect, useRef, useState } from "react";
// import fabric from "fabric";
import { Canvas, Rect } from "fabric";
import { SquareIcon } from "sebikostudio-icons";
import "../styles.scss";

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
    <div className="ruler-canvas">
      <div className="Toolbar darkmode">
        <button onClick={addRuler} variant="ghost" size="medium">
          <SquareIcon />
        </button>
      </div>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default RulerCanvas;
