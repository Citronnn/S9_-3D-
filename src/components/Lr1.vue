<template>
  <div>
    <div>
      <vgl-renderer class="mainRenderer" name="mainRenderer" camera="mainCamera" scene="mainScene">
        <vgl-scene name="mainScene">
          <vgl-shader-material
              ref="mat"
              name="mat"
              wireframe
              :uniforms="uniforms"
              :vertex-shader="vertexShader"
              :fragment-shader="fragmentShader"
          />
          <vgl-text-geometry
              text="W"
              name="textW"
              :size="sizeMultiply*2"
              height="10"
              font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"/>
          <vgl-text-geometry
              text="D"
              name="textD"
              :size="sizeMultiply*2"
              height="10"
              font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"/>
          <vgl-torus-geometry
              name="torus"
              :radius="sizeMultiply"
              tube="3"
              tubular-segments="25"
              radial-segments="15"
          />
          <vgl-mesh material="mat" name="torusMeshUp" geometry="torus" position="30 20 0"/>
          <vgl-mesh material="mat" name="torusMeshDown" geometry="torus" position="-20 -20 0"/>
          <vgl-mesh material="mat" name="textMeshW" geometry="textW" position="-30 5 0"/>
          <vgl-mesh material="mat" name="textMeshD" geometry="textD" position="20 -30 0"/>
        </vgl-scene>
        <vgl-perspective-camera orbit-position="100 1.5 0.1" name="mainCamera"/>
      </vgl-renderer>
    </div>
    <div>
      <table>
        <tr v-for="(offset, index) in Object.keys(uniforms).filter(key => key.includes('offset'))" :key="index">
          <td>{{ offset }}</td>
          <td>
            <input
                v-model="uniforms[offset].value"
                type="range"
                max="100"
                min="-100"
                step="1">
          </td>
        </tr>
        <tr>
          <td>Size</td>
          <td>
            <input
                v-model="sizeMultiply"
                type="range"
                max="50"
                step="0.5">
          </td>
        </tr>
        <tr v-for="(color, index) in Object.keys(uniforms).filter(key => key.includes('Color'))" :key="index">
          <td>{{ color }}</td>
            <td>
              <input
                  v-model.number="uniforms[color].value"
                  class="slider"
                  type="range"
                  max="255"
                  step="1">
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { VglRenderer, VglTextGeometry, VglShaderMaterial,
  VglScene, VglPerspectiveCamera, VglMesh, VglTorusGeometry } from 'vue-gl'

import { vertexShader } from '@/shaders/vertexShader'
import { fragmentShader } from '@/shaders/fragmentShader'

export default {
  name: 'Lr1',
  components: {
    VglRenderer, VglTextGeometry, VglShaderMaterial,
    VglScene, VglPerspectiveCamera, VglMesh, VglTorusGeometry
  },
  data() {
    return {
      sizeMultiply: 15,
      uniforms: {
        redColor: { value: 255 },
        offsetX: { value: 0.0 },
        offsetY: { value: 0.0 },
        offsetZ: { value: 0.0 },
        greenColor: { value: 255 },
        blueColor: { value: 255 }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    }
  }
}
</script>

<style scoped>
.mainRenderer {
  height: 80vh;
  width: 80vw;
  float: right;
}
</style>
