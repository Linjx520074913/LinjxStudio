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
              <a>颜色</a>
              <input id="colorpicker" type="color" v-model="color">
              <a>Energy</a>
              <a>4</a>
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
                </div>
                <div class="light_black">
                  <div class="Y">Y</div>
                </div>
                <div class="light_black">
                  <div class="Z">Z</div>
                </div>
              </div>
            </div>
            <div class="vertical_layout">
              <a>Scale</a>
              <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
                <div class="light_black">
                  <div class="X">X</div>
                </div>
                <div class="light_black">
                  <div class="Y">Y</div>
                </div>
                <div class="light_black">
                  <div class="Z">Z</div>
                </div>
              </div>
            </div>
            <div class="vertical_layout">
              <a>Rotation</a>
              <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
                <div class="light_black">
                  <div class="X">X</div>
                </div>
                <div class="light_black">
                  <div class="Y">Y</div>
                </div>
                <div class="light_black">
                  <div class="Z">Z</div>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <span class="collapse-title" slot="title">Matrix</span>
            <div class="grid">
              <a>1</a>
              <a>2</a>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'SpotLightPropertyPanel',
    data () {
      return {
        color: 'rgba(255, 69, 0, 0.68)'
      }
    }
  }
</script>

<style>
/* NOTE:
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

/* 设置详细属性内容布局 */
.detail {
  height:auto;
  margin: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid;
}

/* 设置 collapse 箭头在左边（默认在右边） */
.collapse-title {
  flex: 1 0 90%;
  order: 1;
}
.el-collapse {
  height: auto;
  padding: 1px;
  border: 1px solid transparent!important;
}
/* 修改 el-collapse-item__header 高度，默认为 48px */
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

.grid {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 50% 50%;
}

#colorpicker {
  width: auto;
  height: 30px;
  border: 0px
}

.vertical_layout {
  display: flex;
  flex-direction: column;
  margin-left:10px;
}
/* 淡黑色 */
.light_black {
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
