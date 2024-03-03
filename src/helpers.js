import BoinkBall from './boinkBall';
import k from './kaboom';

export const ballSize = 10;

export const radToDeg = (angle) => (angle * 180) / Math.PI;

export const spawnEntity = (entity, amount = 1, extraArgs = []) => {
  for(let counter = 0; counter < amount; counter++) {
    k.add([
      entity([
        // randomize position for ball
        k.pos(
          k.rand(ballSize, k.width()-ballSize),
          k.rand(ballSize, k.height()-ballSize),
        ),
        ...extraArgs,
      ]),
    ]);
  }
}

export const calculateVelocity = (angle, speed) => {
  const speedX = speed * Math.cos(angle);
  const speedY = speed * Math.sin(angle);
  return { speedX, speedY };
}

// export const calculateSpeedAndAngle = (x, y, speedX, speedY) => {
export const calculateSpeedAndAngle = (speedX, speedY) => {
  // Calculate the speed using the Pythagorean theorem
  const speed = Math.sqrt(speedX * speedX + speedY * speedY);

  // Calculate the angle using the arctangent function
  // Ensure the angle is between 0 and 2 * PI using the modulo operator
  let angle = Math.atan2(speedY, speedX) % (2 * Math.PI);
  if (angle < 0) {
    angle += 2 * Math.PI; // Convert negative angles to positive
  }
  
  // Return the speed and angle as an object
  return { speed, angle };
}

export const reflectVelocity = (entity) => {
  const { speedX, speedY } = calculateVelocity(entity.angle, entity.speed);
  const entityAngle = entity.angle;
  let normalX = Math.cos(entityAngle);
  let normalY = Math.sin(entityAngle);
  let dotProduct = speedX * normalX + speedY * normalY;
  const velX = 2 * dotProduct * normalX - entity.vel.x;
  const velY = 2 * dotProduct * normalY - speedY;
  const { angle } = calculateSpeedAndAngle(velX, velY);

  return angle;
}

export const getOverHere = (entity) => {
  if (entity.pos.x < 0 ) {
    entity.pos.x = 1;
  } else if (entity.pos.x > k.width()) {
    entity.pos.x = k.width() - 1;
  }

  if (entity.pos.y < 0 ) {
    entity.pos.y = 1;
  } else if (entity.pos.y > k.height()) {
    entity.pos.y = k.height() - 1;
  }
}

export const rgbToHex = (rgb) => {
  // Ensure RGB values are within range
  let clamp = function (value, min, max) {
      return Math.min(Math.max(value, min), max);
  };

  // Convert each RGB component to hexadecimal
  let toHex = function (value) {
      return ('0' + clamp(value, 0, 255).toString(16)).slice(-2);
  };

  // Parse the RGB object
  let red = toHex(rgb.r);
  let green = toHex(rgb.g);
  let blue = toHex(rgb.b);

  // Construct the hexadecimal color representation
  let hexColor = '#' + red + green + blue;

  return hexColor.toUpperCase(); // Convert to uppercase for consistency
}
