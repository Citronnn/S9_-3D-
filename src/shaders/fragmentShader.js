export const fragmentShader = `

uniform float redColor;
uniform float greenColor;
uniform float blueColor;


void main() {
    gl_FragColor = vec4(redColor / 255.0, greenColor / 255.0, blueColor / 255.0, 1.0);
}
`.trim()
