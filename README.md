

---

## 🔹 README.md

# 🚗 Self-Driving Car Simulation (Neural Network + Genetic Algorithm)

## 📌 Overview

This project is a React-based simulation of a self-driving car system designed to explore neural networks from scratch. Instead of using pre-built machine learning libraries, the entire decision-making system is implemented manually.

The cars learn to navigate a 2D environment using a genetic algorithm, where multiple agents evolve over time to improve their driving performance.

The core purpose of this project is not just simulation, but deep conceptual understanding of how neural networks learn and how evolutionary algorithms can optimize behavior.

---

## 🎯 Purpose

* Learn neural networks from first principles
* Understand how AI agents make decisions from raw inputs
* Implement genetic algorithms for optimization
* Build an interactive visualization using React
* Explore how machine learning concepts work without frameworks

---

## 🧠 Core Concepts Used

### Neural Network (Built from Scratch)

* Custom implementation (no TensorFlow / PyTorch)
* Layers:

  * Input layer (sensor data)
  * Hidden layers (decision processing)
  * Output layer (movement controls)

### Genetic Algorithm

* Population of cars with different neural networks
* Selection based on performance (distance, survival)
* Mutation applied to create variation
* Best model carried forward to next generation

---

## ⚙️ How It Works

### 1. Environment

* A 2D road simulation rendered in the browser
* Cars move forward and must avoid collisions
* Boundaries and obstacles act as constraints

### 2. Sensors

Each car uses ray-based sensors to detect:

* Distance from road edges
* Distance from obstacles

These values are normalized and fed into the neural network.

---

### 3. Decision Making

The neural network outputs control signals:

* Accelerate
* Turn Left
* Turn Right
* Brake

The car’s behavior is entirely determined by these outputs.

---

### 4. Learning Process

* Multiple cars are initialized with random weights
* Each car attempts to drive as far as possible
* The best-performing car is selected
* New generation is created by:

  * Cloning the best model
  * Applying mutations

This process repeats, gradually improving performance.

---

## 🛠️ Tech Stack

* React (UI and simulation control)
* JavaScript (logic and algorithms)
* HTML5 Canvas (visualization)
* Custom-built Neural Network
* Genetic Algorithm (manual implementation)

---

## 📂 Project Structure

```
/src
│── components/        # React components
│── simulation/        # Core simulation logic
│── neural/            # Neural network implementation
│── genetic/           # Genetic algorithm logic
│── utils/             # Helper functions
│── App.js             # Main entry point
```

---


## 📊 Features

* Real-time car simulation
* Neural network visualization
* Evolution-based learning
* React-based UI structure
* Fully custom AI logic

---

## 🚧 Limitations

* Simplified physics model
* Basic neural network (not deep learning)
* No real-world data integration
* Performance depends on browser rendering

---

## 🔮 Future Scope

### Human vs Neural Network Mode

* Allow a human-controlled car alongside AI
* Compare:

  * Reaction time
  * Accuracy
  * Survival distance

### Additional Improvements

* Save and load trained models
* More complex environments (curves, traffic)
* Better mutation strategies
* Performance analytics dashboard

---

## 📚 What This Project Demonstrates

* Neural networks can be built without libraries
* Learning can emerge from simple rules + evolution
* Visualization helps in understanding AI behavior
* React can be used beyond UI — for simulations

---

## 🤝 Contributing

Open for improvements, optimizations, and new features.

---

## 📜 License

For educational and learning purposes.



Just tell me 👍
