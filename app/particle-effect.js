const particles = [];

function Particle() {
  this.scale = 1.0;
  this.x = 0;
  this.y = 0;
  this.radius = 20;
  this.color = "#000";
  this.velocityX = 0;
  this.velocityY = 0;
  this.scaleSpeed = 0.5;

  this.update = function (ms) {
    // shrinking
    this.scale -= this.scaleSpeed * ms / 1000.0;

    if (this.scale <= 0) {
      this.scale = 0;
    }
    // moving away from explosion center
    this.x += this.velocityX * ms / 1000.0;
    this.y += this.velocityY * ms / 1000.0;
  };

  this.draw = function (context2D) {
    // translating the 2D context to the particle coordinates
    context2D.save();
    context2D.translate(this.x, this.y);
    context2D.scale(this.scale, this.scale);

    // drawing a filled circle in the particle's local space
    context2D.beginPath();
    context2D.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    context2D.closePath();

    context2D.fillStyle = this.color;
    context2D.fill();

    context2D.restore();
  };
}

function randomFloat (min, max) {
	return min + Math.random() * (max - min);
}

function createExplosion(x, y, color) {
	const minSize = 10;
	const maxSize = 30;
	const count = 10;
	const minSpeed = 60.0;
	const maxSpeed = 200.0;
	const minScaleSpeed = 1.0;
	const maxScaleSpeed = 4.0;

	for (let angle = 0; angle < 360; angle += Math.round(360 / count)) {
		const particle = new Particle();

		particle.x = x;
		particle.y = y;

		particle.radius = randomFloat(minSize, maxSize);

		particle.color = color;

		particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);

		const speed = randomFloat(minSpeed, maxSpeed);

		particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
		particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

		particles.push(particle);
	}
}

function update(context2D, frameDelay) {
  // clear canvas:
  context2D.clearRect(0, 0, context2D.canvas.width, context2D.canvas.height);

  // update and draw particles:
  particles.forEach((particle) => {
    particle.update(frameDelay);
    particle.draw(context2D);
  });
}

export function initializeAnimationLoop(context2D) {
  const frameRate = 60.0;
  const frameDelay = 1000.0 / frameRate;

  setInterval(() => {
    update(context2D, frameDelay);
  }, frameDelay);
}

export function boom () {
  const x = 150
  const y = 100;

  // Colors taken from striped blue progress bar.
  createExplosion(x, y, "rgb(72, 179, 216)");
  createExplosion(x, y, "rgb(95, 189, 222)");
}
