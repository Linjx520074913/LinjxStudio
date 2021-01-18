<template>
  <section>
    <div id="scene_3d_root" ref="scene_3d_root" v-resize:throttle="resizePreview">
      <div id="scene_3d_main" ref="scene_3d_main">
        <div class="prompt_container">
          <svg class="view_icon" aria-hidden="true"><use xlink:href="#icon-main_view"></use></svg>
          <a class="view_title">正视图</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import resize from 'vue-resize-directive'

import { worker } from 'cluster'
import { Viewport } from '../../main/Viewport'
import { Editor } from '@/main/Editor'

export default {
  name: 'Scene3D',
  directives: {
    resize,
  },
  data () {
    return {
      editor: Editor.getInstance(),
      viewport: null,
      preview: null
    }
  },
  methods: {
    // preview 区域大小改变处理
    resizePreview () {
      // // TODO : 这里不把宽高 -2，会一直触发 resizePreview，需要弄清楚原因
      let w = this.$refs.scene_3d_main.clientWidth - 2
      let h = this.$refs.scene_3d_main.clientHeight - 2
      if(w < 0 || h <0)
        return

      this.editor.signalManager.resize.dispatch(w, h)
    }
  },
  created () {
    this.viewport = new Viewport(this.editor)
  },
  mounted () {
    this.$refs.scene_3d_main.appendChild(this.viewport.getViewport())
    this.viewport.render()
    this.editor.signalManager.sceneGraphChanged.dispatch(this.editor.scene)
  }
}
</script>

<style scoped>
#scene_3d_root {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100% 0%;
  grid-template-rows: 100% 0%;
}
#scene_3d_main, #scene_3d_left, #scene_3d_top, #scene_3d_bottom {
  border: 0px solid transparent;
}
/* 视图左上角图标和标题样式 */
.prompt_container {
  position:absolute;
  z-index:5;
}
#preview {
  background: white;
  position:absolute;
  right: 0px
}
.view_icon {
  width:40px;
  height:40px;
}
.view_title {
  float:right;
  height:40px;
  line-height:40px;
  user-select: none;
}
</style>
