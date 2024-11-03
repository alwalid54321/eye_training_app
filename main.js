class VisionTraining {
  constructor() {
    this.initializeElements();
    this.initializeState();
    this.setupEventListeners();
    this.startExercise();
  }

  initializeElements() {
    // Controls
    this.exerciseType = document.getElementById('exerciseType');
    this.speedInput = document.getElementById('speed');
    this.dotSizeInput = document.getElementById('dotSize');
    this.dotColorInput = document.getElementById('dotColor');
    this.boxSizeInput = document.getElementById('boxSize');
    this.radiusInput = document.getElementById('radius');
    
    // Display elements
    this.dot = document.getElementById('dot');
    this.box = document.getElementById('box');
    this.circle = document.getElementById('circle');
    
    // Panels
    this.boxSizePanel = document.getElementById('boxSizePanel');
    this.radiusPanel = document.getElementById('radiusPanel');
    
    // Value displays
    this.speedValue = document.getElementById('speedValue');
    this.dotSizeValue = document.getElementById('dotSizeValue');
    this.colorValue = document.getElementById('colorValue');
    this.boxSizeValue = document.getElementById('boxSizeValue');
    this.radiusValue = document.getElementById('radiusValue');
  }

  initializeState() {
    this.state = {
      exercise: 'random',
      speed: 2,
      dotSize: 20,
      dotColor: '#00ff88',
      boxSize: 100,
      radius: 150,
      position: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      angle: 0,
      direction: 1,
      phase: 0,
      animationFrame: null,
      interval: null
    };
  }

  setupEventListeners() {
    this.exerciseType.addEventListener('change', () => {
      this.state.exercise = this.exerciseType.value;
      this.updatePanelVisibility();
      this.startExercise();
    });

    this.speedInput.addEventListener('input', () => {
      this.state.speed = Number(this.speedInput.value);
      this.speedValue.textContent = this.state.speed;
      this.startExercise();
    });

    this.dotSizeInput.addEventListener('input', () => {
      this.state.dotSize = Number(this.dotSizeInput.value);
      this.dotSizeValue.textContent = `${this.state.dotSize}px`;
      this.updateDotSize();
    });

    this.dotColorInput.addEventListener('input', () => {
      this.state.dotColor = this.dotColorInput.value;
      this.colorValue.textContent = this.state.dotColor.toUpperCase();
      this.updateDotColor();
    });

    this.boxSizeInput.addEventListener('input', () => {
      this.state.boxSize = Number(this.boxSizeInput.value);
      this.boxSizeValue.textContent = `${this.state.boxSize}px`;
      this.updateBoxSize();
    });

    this.radiusInput.addEventListener('input', () => {
      this.state.radius = Number(this.radiusInput.value);
      this.radiusValue.textContent = `${this.state.radius}px`;
      this.updateCircleSize();
    });
  }

  updatePanelVisibility() {
    this.boxSizePanel.style.display = this.state.exercise === 'box' ? 'block' : 'none';
    this.radiusPanel.style.display = this.state.exercise === 'circular' ? 'block' : 'none';
    this.box.style.display = this.state.exercise === 'box' ? 'block' : 'none';
    this.circle.style.display = this.state.exercise === 'circular' ? 'block' : 'none';
  }

  updateDotSize() {
    this.dot.style.width = `${this.state.dotSize}px`;
    this.dot.style.height = `${this.state.dotSize}px`;
  }

  updateDotColor() {
    this.dot.style.backgroundColor = this.state.dotColor;
    this.dot.style.color = this.state.dotColor;
  }

  updateBoxSize() {
    this.box.style.width = `${this.state.boxSize}px`;
    this.box.style.height = `${this.state.boxSize}px`;
  }

  updateCircleSize() {
    this.circle.style.width = `${this.state.radius * 2}px`;
    this.circle.style.height = `${this.state.radius * 2}px`;
  }

  startExercise() {
    if (this.state.interval) clearInterval(this.state.interval);
    if (this.state.animationFrame) cancelAnimationFrame(this.state.animationFrame);

    this.updateDotSize();
    this.updateDotColor();
    this.updateBoxSize();
    this.updateCircleSize();

    switch (this.state.exercise) {
      case 'random':
        this.startRandomMovement();
        break;
      case 'linear':
        this.startLinearMovement();
        break;
      case 'box':
        this.startBoxMovement();
        break;
      case 'circular':
        this.startCircularMovement();
        break;
    }
  }

  startRandomMovement() {
    const moveRandomly = () => {
      this.state.target = {
        x: Math.random() * (window.innerWidth - this.state.dotSize),
        y: Math.random() * (window.innerHeight - this.state.dotSize)
      };
    };

    const animate = () => {
      this.state.position = {
        x: this.state.position.x + (this.state.target.x - this.state.position.x) * 0.05,
        y: this.state.position.y + (this.state.target.y - this.state.position.y) * 0.05
      };

      this.dot.style.left = `${this.state.position.x}px`;
      this.dot.style.top = `${this.state.position.y}px`;

      this.state.animationFrame = requestAnimationFrame(animate);
    };

    moveRandomly();
    this.state.interval = setInterval(moveRandomly, 2000 / this.state.speed);
    animate();
  }

  startLinearMovement() {
    const move = () => {
      this.state.position.x += this.state.direction * this.state.speed;

      if (this.state.position.x > window.innerWidth - this.state.dotSize) {
        this.state.direction = -1;
        this.state.position.x = window.innerWidth - this.state.dotSize;
      }
      if (this.state.position.x < 0) {
        this.state.direction = 1;
        this.state.position.x = 0;
      }

      this.dot.style.left = `${this.state.position.x}px`;
      this.dot.style.top = '50%';
      this.dot.style.transform = 'translateY(-50%)';
    };

    this.state.interval = setInterval(move, 16);
  }

  startBoxMovement() {
    const moveBox = () => {
      this.state.position.x += this.state.direction * this.state.speed;

      if (this.state.position.x > window.innerWidth - this.state.boxSize) {
        this.state.direction = -1;
        this.state.position.x = window.innerWidth - this.state.boxSize;
      }
      if (this.state.position.x < 0) {
        this.state.direction = 1;
        this.state.position.x = 0;
      }

      this.box.style.left = `${this.state.position.x}px`;
      this.box.style.top = '50%';
      this.box.style.transform = 'translateY(-50%)';
    };

    const moveDot = () => {
      this.state.phase = (this.state.phase + this.state.speed) % 360;
      
      const x = this.state.position.x + 
                (Math.sin(this.state.phase * Math.PI / 180) + 1) * 
                (this.state.boxSize - this.state.dotSize) / 2;
      const y = window.innerHeight / 2 + 
                (Math.cos(this.state.phase * Math.PI / 180)) * 
                (this.state.boxSize - this.state.dotSize) / 2;

      this.dot.style.left = `${x}px`;
      this.dot.style.top = `${y}px`;
    };

    this.state.interval = setInterval(() => {
      moveBox();
      moveDot();
    }, 16);
  }

  startCircularMovement() {
    const move = () => {
      this.state.angle = (this.state.angle + this.state.speed) % 360;
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const x = centerX + Math.cos(this.state.angle * Math.PI / 180) * this.state.radius;
      const y = centerY + Math.sin(this.state.angle * Math.PI / 180) * this.state.radius;

      this.dot.style.left = `${x - this.state.dotSize/2}px`;
      this.dot.style.top = `${y - this.state.dotSize/2}px`;
      
      this.circle.style.left = `${centerX - this.state.radius}px`;
      this.circle.style.top = `${centerY - this.state.radius}px`;
    };

    this.state.interval = setInterval(move, 16);
  }
}

// Initialize the application
new VisionTraining();