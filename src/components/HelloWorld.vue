<template>
  <div>
    <div>
      <vgl-renderer class="mainRenderer">
        <vgl-scene>
          <vgl-box-geometry name="box"/>
          <vgl-torus-geometry
              name="torus"
              :radius="sizeMultiply"
              tube="3"
              tubular-segments="25"
              radial-segments="15"
          />
          <vgl-mesh geometry="torus" position="30 20 0"/>
          <vgl-mesh geometry="torus" position="-30 -20 0"/>
          <vgl-mesh geometry="box"/>
        </vgl-scene>
        <vgl-perspective-camera orbit-position="100 1.5 0"/>
      </vgl-renderer>
    </div>
    <div>
      <label>
        Radius
        <input
          v-model="sizeMultiply"
          type="range"
          max="50"
          step="0.5">
      </label>
    </div>
  </div>
</template>

<script>
import { VglRenderer, VglBoxGeometry, VglScene, VglPerspectiveCamera, VglMesh, VglTorusGeometry } from 'vue-gl'
export default {
  name: 'HelloWorld',
  components: {
    VglRenderer, VglBoxGeometry, VglScene, VglPerspectiveCamera, VglMesh, VglTorusGeometry
  },
  data() {
    return {
      sizeMultiply: 15
    }
  }
}
</script>

<style scoped>
.mainRenderer {
  height: 60vh;
}
</style>
