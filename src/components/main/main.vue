<template>
  <main>
    <div class="context">
      <el-tabs v-model="activeName">
        <el-tab-pane label="嘻嘻哈哈" name="first">
          <div class="eg">
            <div class="title" :style="{'color': theme}">输入框</div>
            <el-input v-model="str"></el-input>
          </div>
          <div class="eg">
            <div class="title" :style="{'color': theme}">单选框</div>
            <el-radio-group v-model="radio">
              <el-radio :label="3">备选项</el-radio>
              <el-radio :label="6">备选项</el-radio>
              <el-radio :label="9">备选项</el-radio>
            </el-radio-group>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </main>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageMain',
  data () {
    return {
      str: '你好呀',
      activeName: 'first',
      radio: 3
    }
  },
  computed: {
    ...mapGetters({
      theme: 'theme'
    })
  }
}
</script>
