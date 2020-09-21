export const vertexShader = `
uniform float offsetX;
uniform float offsetY;
uniform float offsetZ;

void main() {
   gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x + offsetX, position.y + offsetY, position.z + offsetZ, 1.0);
}
`.trim()
