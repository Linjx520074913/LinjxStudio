<template>
  <section id='SpotLigthPropertyPanel'>
    <div class="slpp_root">
      <div class="detail">
        <div class="title">
          <svg class="icon" aria-hidden="true"><use xlink:href="#icon-spotlight"></use></svg>
          <a>Light</a>
        </div>
        <el-collapse>
          <el-collapse-item>
            <span class="collapse-title" slot="title">Light</span>
            <div class="grid">
              <a>color</a>
              <input id="colorpicker" type="color" v-model="color">
              <a>intensity</a>
              <el-input v-model="intensity" placeholder=""></el-input>
              <a>distance</a>
              <el-input v-model="distance" placeholder=""></el-input>
              <a>angle</a>
              <el-input v-model="angle" placeholder=""></el-input>
              <a>penumbra</a>
              <el-input v-model="penumbra" placeholder=""></el-input>
              <a>decay</a>
              <el-input v-model="decay" placeholder=""></el-input>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <span class="collapse-title" slot="title">Shadow</span>
            <div class="grid">
              <a>1</a>
              <a>2</a>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="title">
          <svg class="icon" aria-hidden="true"><use xlink:href="#icon-spatial"></use></svg>
          <a>Spatial</a>
        </div>
        <el-collapse>
          <el-collapse-item>
            <span class="collapse-title" slot="title">Transform</span>
            <div class="vertical_layout">
              <a>Translation</a>
              <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
                <div class="light_black">
                  <div class="X">X</div>
                  <el-input v-model="transform.x" placeholder=""></el-input>
                </div>
                <div class="light_black">
                  <div class="Y">Y</div>
                  <el-input v-model="transform.y" placeholder=""></el-input>
                </div>
                <div class="light_black">
                  <div class="Z">Z</div>
                  <el-input v-model="transform.z" placeholder=""></el-input>
                </div>
              </div>
            </div>
            <div class="vertical_layout">
              <a>Scale</a>
              <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
                <div class="light_black">
                  <div class="X">X</div>
                  <el-input v-model="scale.x" placeholder=""></el-input>
                </div>
                <div class="light_black">
                  <div class="Y">Y</div>
                  <el-input v-model="scale.y" placeholder=""></el-input>
                </div>
                <div class="light_black">
                  <div class="Z">Z</div>
                  <el-input v-model="scale.z" placeholder=""></el-input>
                </div>
              </div>
            </div>
            <div class="vertical_layout">
              <a>Rotation(How to use?TBD)</a>
              <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
                <div class="light_black">
                  <div class="X">X</div>
                  <el-input v-model="rotation.x" placeholder=""></el-input>
                </div>
                <div class="light_black">
                  <div class="Y">Y</div>
                  <el-input v-model="rotation.y" placeholder=""></el-input>
                </div>
                <div class="light_black">
                  <div class="Z">Z</div>
                  <el-input v-model="rotation.z" placeholder=""></el-input>
                </div>
              </div>
            </div>
            <div class="vertical_layout">
              <a>Target</a>
              <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
                <div class="light_black">
                  <div class="X">X</div>
                  <el-input v-model="target.x" placeholder=""></el-input>
                </div>
                <div class="light_black">
                  <div class="Y">Y</div>
                  <el-input v-model="target.y" placeholder=""></el-input>
                </div>
                <div class="light_black">
                  <div class="Z">Z</div>
                  <el-input v-model="target.z" placeholder=""></el-input>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <span class="collapse-title" slot="title">Matrix</span>
            <div class="grid">
              <el-checkbox v-model="isVisible">Visible</el-checkbox>
              <el-checkbox v-model="isHelperVisible">Helper</el-checkbox>
              <a>2</a>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </section>
</template>

<script>
import * as THREE from 'three'
import { Euler } from 'three'
export default {
  name: 'SpotLightPropertyPanel',
  data () {
    return {
      color: 'rgba(255, 69, 0, 0.68)',
      intensity: 0,
      distance: 1,
      angle: 2,
      penumbra: 3,
      decay: 4,
      transform: new THREE.Vector3(0, 0, 0),
      rotation: new Euler(),
      scale: new THREE.Vector3(0, 0, 0),
      target: new THREE.Vector3(0, 0, 0),
      // 光源是否可见
      isVisible: true,
      // 光源辅助线是否可见
      isHelperVisible: true
    }
  },
  activated () {
    // 组件激活时，把各变量值赋值为 ExtSpotLight 对应变量的值
    var light = this.$store.state.extspotlight.instance
    this.intensity = light.intensity
    this.distance = light.distance
    this.angle = light.angle
    this.penumbra = light.penumbra
    this.decay = light.penumbra
    this.transform.set(light.position.x, light.position.y, light.position.z)
    this.scale.set(light.scale.x, light.scale.y, light.scale.z)
    this.rotation.set(light.rotation.x, light.rotation.y, light.rotation.z)
    this.target.set(light.target.position.x, light.target.position.y, light.target.position.z)
    this.isVisible = light.visible
    this.isHelperVisible = light.isHelperVisible()
  },
  mounted () {
  },
  watch: {
    intensity (newValue, oldValue) {
      this.intensity = newValue
      this.$store.commit('extspotlight/updateIntensity', this.intensity)
    },
    distance (newValue, oldValue) {
      this.distance = newValue
      this.$store.commit('extspotlight/updateDistance', this.distance)
    },
    angle (newValue, oldValue) {
      this.angle = newValue
      this.$store.commit('extspotlight/updateAngle', this.angle)
    },
    decay (newValue, oldValue) {
      this.decay = newValue
      this.$store.commit('extspotlight/updateDecay', this.decay)
    },
    penumbra (newValue, oldValue) {
      this.penumbra = newValue
      this.$store.commit('extspotlight/updatePenumbra', this.penumbra)
    },
    isVisible (newValue, oldValue) {
      this.isVisible = newValue
      this.$store.commit('extspotlight/show', this.isVisible)
    },
    isHelperVisible (newValue, oldValue) {
      this.isHelperVisible = newValue
      this.$store.commit('extspotlight/showHelper', this.isHelperVisible)
    },
    // 监听 transform 对象数值
    transform: {
      handler (newValue, oldValue) {
        this.$store.commit('extspotlight/updateTransform', newValue)
      },
      deep: true
    },
    scale: {
      handler (newValue, oldValue) {
        this.$store.commit('extspotlight/updateScale', newValue)
      },
      deep: true
    },
    rotation: {
      handler (newValue, oldValue) {
        this.$store.commit('extspotlight/updateRotation', newValue)
      },
      deep: true
    },
    target: {
      handler (newValue, oldValue) {
        this.$store.commit('extspotlight/lookAt', newValue)
      },
      deep: true
    }
  }
}
</script>

<style>
/* 【NOTE】:
  style标签中不要添加scoped属性。
  在有写scoped的style标签中书写的样式不会覆盖 ElementUI 默认的样式
  一开始的写法就是 <style scoped>,结果无论怎么修改 el-collapse 和 el-collapse-item 都不生效
*/
/* 属性标题栏样式 */
.title {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  background:#404553
}

/* 设置图标大小 */
.title > .icon {
  width: 30px;
  height: 100%
}

/* 设置字体颜色 */
a {
  color: #CCCED3;
  height: 30px;
  line-height: 30px;
}

/* 设置【详细属性内容】布局 */
.detail {
  margin: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  height: auto
}

/* 设置 【collapse 箭头】在左边（默认在右边） */
.collapse-title {
  flex: 1 0 90%;
  order: 1;
}
.el-collapse {
  height: auto;
  padding: 1px;
  border: 1px solid transparent!important;
}
/* 修改 【el-collapse-item__header】 高度，默认为 48px */
.el-collapse-item__header {
  height: 30px !important;
  line-height: 30px !important;
  background: #333947 !important;
  Color: #CCCED3 !important;
  border: 0px !important;
}
.el-collapse-item__wrap {
  background: #262C3B !important;
  Color: #CCCED3 !important;
  border: 0px !important
}
.el-collapse-item__content {
  padding: 0px !important;
}
/* 修改 【el-input 输入框】 样式 */
.el-input {
  padding: 2px 0px 2px 0px;
}
.el-input__inner {
  width: 95% !important;
  height: 26px !important;
  padding: 0px !important;
  background: #202531 !important;
  border-radius: 0px !important;
  border: 1px solid transparent !important;
  text-align: center !important
}
/* el-input 获取焦点时，边框为淡蓝色 */
.el-input__inner:focus {
  border: 1px solid #87CEFA !important;
}

/* 网格行自动扩展 */
.grid {
  padding-left: 10px;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-auto-rows: initial
}

#colorpicker {
  width: 95%;
  height: 26px;
  border: 0px
}
/* 垂直布局 */
.vertical_layout {
  display: flex;
  flex-direction: column;
  margin-left:10px;
}
/* 淡黑色 */
.light_black {
  display:flex;
  background:#202531
}
.X {
  height: 30px;
  line-height: 30px;
  width: 30px;
  color:#F00;
  text-align:center;
  background: #191D28
}
.Y {
  height: 30px;
  line-height: 30px;
  width: 30px;
  color:#0F0;
  text-align:center;
  background: #191D28
}
.Z {
  height: 30px;
  line-height: 30px;
  width: 30px;
  color:#00F;
  text-align:center;
  background: #191D28
}

</style>
