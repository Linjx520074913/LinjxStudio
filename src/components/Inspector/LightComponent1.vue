<template>
  <section id='SpotLigthPropertyPanel'>
    <div class="slpp_root">
    </div>
  </section>
</template>

<script>
import '../../assets/css/inspector.css'
import '../../assets/css/custom-elementui.css'
import * as THREE from 'three'
import { Euler } from 'three'
export default {
  name: 'SpotLightPropertyPanel',
  data () {
    return {
      // 光源颜色
      color: 'rgba(255, 69, 0, 0.68)',
      // 光源强度
      intensity: 0,
      // 光源照射距离
      distance: 1,
      // 光源照射角度
      angle: 2,
      penumbra: 3,
      decay: 4,
      // 光源位置信息
      transform: new THREE.Vector3(0, 0, 0),
      rotation: new Euler(),
      scale: new THREE.Vector3(0, 0, 0),
      // 光源照射目标
      target: new THREE.Vector3(0, 0, 0),
      // 光源是否可见
      isVisible: true,
      // 光源辅助线是否可见
      isHelperVisible: true,
      // 是否产生阴影
      castShadow: true
    }
  },
  activated () {
    // 组件激活时，把各变量值赋值为 ExtSpotLight 对应变量的值
    // var light = this.$store.state.extspotlight.instance
    // this.intensity = light.intensity
    // this.distance = light.distance
    // this.angle = light.angle
    // this.penumbra = light.penumbra
    // this.decay = light.penumbra
    // this.transform.set(light.position.x, light.position.y, light.position.z)
    // this.scale.set(light.scale.x, light.scale.y, light.scale.z)
    // this.rotation.set(light.rotation.x, light.rotation.y, light.rotation.z)
    // this.target.set(light.target.position.x, light.target.position.y, light.target.position.z)
    // this.isVisible = light.visible
    // this.isHelperVisible = light.isHelperVisible()
    // this.castShadow = light.castShadow
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
    castShadow (newValue, oldValue) {
      this.castShadow = newValue
      this.$store.commit('extspotlight/enableShadow', this.castShadow)
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

<style scoped>
/* 【NOTE】:
  style标签中不要添加scoped属性。
  在有写scoped的style标签中书写的样式不会覆盖 ElementUI 默认的样式
  一开始的写法就是 <style scoped>,结果无论怎么修改 el-collapse 和 el-collapse-item 都不生效
*/

/* 设置图标大小 */
.icon {
  width: 30px;
  height: 100%
}

/* 设置【详细属性内容】布局 */
.detail {
  margin: 5px;
  display: flex;
  flex-direction: column;
  height: auto
}

#colorpicker {
  width: 95%;
  height: 26px;
  border: 0px
}

</style>
