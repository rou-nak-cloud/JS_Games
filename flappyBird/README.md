# 🐦 Flappy Bird Game (JavaScript + Canvas)

A browser-based **Flappy Bird clone** built using **pure JavaScript** and the **HTML5 Canvas API**.  
This project focuses on game loops, physics, collision detection, and real-time rendering using `requestAnimationFrame`.

---

## 🚀 Live Demo

👉 _(Add your live link here if deployed)_

---

## 🛠️ Tech Stack

- **HTML5 Canvas**
- **Vanilla JavaScript**
- **CSS**

No external libraries or frameworks used.

---

## 🎮 Gameplay Features

- Smooth game loop using `requestAnimationFrame`
- Gravity-based bird movement
- Randomly generated pipes
- Collision detection (AABB)
- Score tracking
- Game Over state
- Restart game on key press
- Keyboard controls

---

## 🎯 Controls

| Key                         | Action  |
| --------------------------- | ------- |
| `Space`                     | Jump    |
| `Arrow Up`                  | Jump    |
| `X`                         | Jump    |
| _(Any key after Game Over)_ | Restart |

---

## 🧠 Core Concepts Used

- Canvas rendering (`drawImage`, `clearRect`)
- Game loop architecture
- Physics simulation (gravity & velocity)
- Axis-Aligned Bounding Box (AABB) collision detection
- Timers (`setInterval`, `clearInterval`)
- Event handling
- Array-based object management

---

### Collision Check

```
function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

```

---

```
Author: Rounak Bakshi
```
