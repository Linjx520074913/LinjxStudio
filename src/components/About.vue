<template>
    <div>
        <el-dialog
        title="Warning"
        :visible.sync="dlgVisible"
        width="30%"
        center>
        <span>It should be noted that the content will not be aligned in center by default</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onClose()">Cancel</el-button>
            <el-button type="primary" @click="onClose()">Confirm</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      dlgVisible: false
    }
  },
  props: ['isVisible'],
  watch: {
    isVisible (val) {
      console.log('aaaaaaaaaaaaaa')
      this.dlgVisible = val
    }
  },
  methods: {
    onClose () {
      console.log('onClose')
      this.dlgVisible = false
      this.$emit('update:isVisible', false)
    }
  }
}
</script>
