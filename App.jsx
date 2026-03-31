import { useEffect, useRef, useState } from "react";
import Car from "./components/Car";
import Road from "./components/Road";
import Visualizer from "./components/Visualizer";
import "./App.css";
import Nn from "./components/Nn";
function App() {
  const carCanvasRef = useRef(null);
  const networkCanvasRef = useRef(null);
  const bestcarRef = useRef(null);
  const [mode, setMode] = useState(null); 
  function save() {
    if (bestcarRef.current && mode === "nn") {
      localStorage.setItem(
        "bestBrain",
        JSON.stringify(bestcarRef.current.brain)
      );
      console.log("Saved best brain");
    }
  }
  function discard() {
    localStorage.removeItem("bestBrain");
    console.log("Brain discarded");
  }
  useEffect(() => {
    if (!mode) return;
    const carCanvas = carCanvasRef.current;
    const networkCanvas = networkCanvasRef.current;
    const carCtx = carCanvas.getContext("2d");
    const networkCtx = networkCanvas.getContext("2d");
    carCanvas.width = 200;
    networkCanvas.width = 300;
    const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
    const N = mode === "nn" ? 50 : 1;
    const cars = generateCars(N);
    const traffic = generateTraffic();
    let bestcar = cars[0];
    if (mode === "nn" && localStorage.getItem("bestBrain")) {
      const savedBrain = JSON.parse(localStorage.getItem("bestBrain"));
      for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(JSON.stringify(savedBrain));
        if (i !== 0) {
          Nn.mutate(cars[i].brain, 0.2);
        }
      }
    }
    function generateTraffic() {
      const traffic = [];
      const count = 20;
      for (let i = 0; i < count; i++) {
        const lane = Math.floor(Math.random() * 3);
        const y = -100 - i * 250;
        traffic.push(
          new Car(road.whichlane(lane), y, 30, 50, "dummy", 2)
        );
      }
      return traffic;
    }
    function generateCars(N) {
      const cars = [];
      for (let i = 0; i < N; i++) {
        cars.push(
          new Car(
            road.whichlane(1),
            100,
            30,
            50,
            mode 
          )
        );
      }
      return cars;
    }
    function animate(time) {
      for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
      }
      for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
      }
      bestcar = cars.reduce((best, car) =>
        car.y < best.y ? car : best
      );
      bestcarRef.current = bestcar;
      carCanvas.height = window.innerHeight;
      networkCanvas.height = window.innerHeight;
      carCtx.save();
      carCtx.translate(0, -bestcar.y + carCanvas.height * 0.7);
      road.draw(carCtx);
      for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
      }
      carCtx.globalAlpha = 0.2;
      for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
      }
      carCtx.globalAlpha = 1;
      bestcar.draw(carCtx, "blue", true);
      carCtx.restore();
      if (mode === "nn") {
        networkCtx.lineDashOffset = -time / 50;
        Visualizer.drawNetwork(networkCtx, bestcar.brain);
      }
      requestAnimationFrame(animate);
    }
    animate();
  }, [mode]);
  if (!mode) {
  return (
    <div className="mode-container">
      <div className="mode-box">
        <div className="mode-title">Select Mode</div>
        <div className="mode-buttons">
          <button className="mode-btn" onClick={() => setMode("keys")}>
            Manual Drive
          </button>
          <button className="mode-btn" onClick={() => setMode("nn")}>
            AI Mode
          </button>
        </div>
      </div>
    </div>
  );
  }
  return (
    <div>
      {mode === "nn" && (
        <div>
          <button onClick={save}>Save</button>
          <button onClick={discard}>Discard</button>
        </div>
      )}

      <div style={{ display: "flex" }}>
        <canvas ref={carCanvasRef} className="carCanvas" />
        <canvas ref={networkCanvasRef} className="networkCanvas" />
      </div>
    </div>
  );
}
export default App;
