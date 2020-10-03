<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="9">
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
                  :size="parseFloat(sizeMultiply) * 2 + parseFloat(figures.textW.size)"
                  height="10"
                  font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"/>
              <vgl-text-geometry
                  text="D"
                  name="textD"
                  :size="parseFloat(sizeMultiply) * 2 + parseFloat(figures.textD.size)"
                  height="10"
                  font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"/>
              <vgl-torus-geometry
                  name="torusUp"
                  :radius="parseFloat(sizeMultiply) + parseFloat(figures.torusUp.size)"
                  tube="3"
                  tubular-segments="25"
                  radial-segments="15"
              />
              <vgl-torus-geometry
                  name="torusDown"
                  :radius="parseFloat(sizeMultiply) + parseFloat(figures.torusDown.size)"
                  tube="3"
                  tubular-segments="25"
                  radial-segments="15"
              />
              <vgl-mesh material="mat" name="torusMeshUp" geometry="torusUp"
                :position="`${figures.torusUp.position.x} ${figures.torusUp.position.y} ${figures.torusUp.position.z}`"
                :rotation="`${figures.torusUp.rotation.x} ${figures.torusUp.rotation.y} ${figures.torusUp.rotation.z} XYZ`"/>
              <vgl-mesh material="mat" name="torusMeshDown" geometry="torusDown"
                :position="`${figures.torusDown.position.x} ${figures.torusDown.position.y} ${figures.torusDown.position.z}`"
                :rotation="`${figures.torusDown.rotation.x} ${figures.torusDown.rotation.y} ${figures.torusDown.rotation.z} XYZ`"/>
              <vgl-mesh material="mat" name="textMeshW" geometry="textW"
                :position="`${figures.textW.position.x} ${figures.textW.position.y} ${figures.textW.position.z}`"
                :rotation="`${figures.textW.rotation.x} ${figures.textW.rotation.y} ${figures.textW.rotation.z} XYZ`"/>
              <vgl-mesh material="mat" name="textMeshD" geometry="textD"
                :position="`${figures.textD.position.x} ${figures.textD.position.y} ${figures.textD.position.z}`"
                :rotation="`${figures.textD.rotation.x} ${figures.textD.rotation.y} ${figures.textD.rotation.z} XYZ`"/>
            </vgl-scene>
            <vgl-perspective-camera
                :orbit-position="`${cameraPosition.r.value} ${cameraPosition.theta.value} ${cameraPosition.phi.value}`"
                name="mainCamera"/>
          </vgl-renderer>
        </b-col>
        <b-col cols="3">
          <div class="accordion" role="tablist">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                    class="w-100"
                    @click="$root.$emit('bv::toggle::collapse', 'accordion-all')"
                    variant="dark">Все фигуры
                </b-button>
              </b-card-header>
              <b-collapse id="accordion-all" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text>
                    <div>
                      <label v-for="(offset, index) in Object.keys(uniforms).filter(key => key.includes('offset'))" :key="offset+index">
                        {{ offset }}
                        <input
                            v-model="uniforms[offset].value"
                            type="range"
                            max="100"
                            min="-100"
                            step="1">
                      </label>
                    </div>
                    <div>
                      <label v-for="(color, index) in Object.keys(uniforms).filter(key => key.includes('Color'))" :key="color+index">
                        {{ color }}
                        <input
                            v-model.number="uniforms[color].value"
                            class="slider"
                            type="range"
                            max="255"
                            step="1">
                      </label>
                    </div>
                    <div>
                      <label v-for="(coord, index) in Object.keys(cameraPosition)" :key="coord+index">
                        {{ cameraPosition[coord].title }}
                        <input
                            v-model.number="cameraPosition[coord].value"
                            class="slider"
                            type="range"
                            :max="cameraPosition[coord].max"
                            :step="cameraPosition[coord].step">
                      </label>
                    </div>
                    <div>
                      <label>
                        Size
                        <input
                            v-model="sizeMultiply"
                            type="range"
                            max="50"
                            step="0.5">
                      </label>
                    </div>
                  </b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card no-body class="mb-1" v-for="(figure, index) in Object.keys(figures)" :key="index">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  class="w-100"
                  @click="$root.$emit('bv::toggle::collapse', 'accordion-' + figures[figure].title)"
                  variant="dark">{{ figures[figure].title }}
                </b-button>
              </b-card-header>
              <b-collapse :id="'accordion-' + figures[figure].title" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text>
                    <div>
                      <label v-for="(coord, index) in Object.keys(figures[figure].position)" :key="index">
                        Позиция {{ coord }}
                        <input
                            v-model="figures[figure].position[coord]"
                            type="range"
                            max="100"
                            min="-100"
                            step="1">
                      </label>
                    </div>
                    <div>
                      <label v-for="(coord, index) in Object.keys(figures[figure].rotation)" :key="index">
                        Поворот {{ coord }}
                        <input
                            v-model="figures[figure].rotation[coord]"
                            type="range"
                            max="2"
                            min="-2"
                            step="0.01">
                      </label>
                    </div>
                    <div>
                      <label>
                        Размер
                        <input
                            v-model="figures[figure].size"
                            type="range"
                            max="50"
                            step="0.01">
                      </label>
                    </div>
                  </b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { VglRenderer, VglTextGeometry, VglShaderMaterial,
  VglScene, VglPerspectiveCamera, VglMesh, VglTorusGeometry } from 'vue-gl'

import { vertexShader } from '@/shaders/vertexShader'
import { fragmentShader } from '@/shaders/fragmentShader'

export default {
  name: 'Lr2',
  components: {
    VglRenderer,
    VglTextGeometry,
    VglShaderMaterial,
    VglScene,
    VglPerspectiveCamera,
    VglMesh,
    VglTorusGeometry
  },
  data() {
    return {
      cameraPerspective: true,
      sizeMultiply: 15,
      zoom: 10,
      cameraPosition: {
        r: {
          value: 100,
          step: 0.5,
          max: 300,
          title: 'Радиус'
        },
        theta: {
          value: 1.5,
          step: 0.05,
          max: 3,
          title: 'Зенитный угол'
        },
        phi: {
          value: 0.1,
          step: 0.05,
          max: 6,
          title: 'Азимутальный угол'
        },
      },
      uniforms: {
        redColor: { value: 255 },
        offsetX: { value: 0.0 },
        offsetY: { value: 0.0 },
        offsetZ: { value: 0.0 },
        greenColor: { value: 255 },
        blueColor: { value: 255 }
      },
      figures: {
        textW: {
          title: 'Буква W',
          size: 0,
          position: {x: -30, y: 5, z: 0},
          rotation: {x: 0, y: 0, z: 0}
        },
        torusUp: {
          title: 'Буква О (1)',
          size: 0,
          position: {x: 30, y: 20, z: 0},
          rotation: {x: 0, y: 0, z: 0}
        },
        torusDown: {
          title: 'Буква О (2)',
          size: 0,
          position: {x: -20, y: -20, z: 0},
          rotation: {x: 0, y: 0, z: 0}
        },
        textD: {
          title: 'Буква D',
          size: 0,
          position: {x: 20, y: -30, z: 0},
          rotation: {x: 0, y: 0, z: 0}
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    }
  },
  methods: {
    getSizeForTorus() {
      console.log(this.sizeMultiply, this.torusUp.size)
      return this.sizeMultiply + this.torusUp.size
    }
  }
}
</script>

<style scoped>
.mainRenderer {
  height: 80vh;
  width: 100%;
}
</style>
