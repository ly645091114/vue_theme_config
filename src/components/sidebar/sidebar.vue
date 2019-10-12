<template>
  <nav>
    <el-menu
      default-active="2">
      <el-menu-item index="2">
        <span slot="title">导航一</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <span>导航二</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </nav>
</template>
<script>
export default {
  name: 'PageNav'
}
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>
