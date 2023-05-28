<template>
<div>
  <el-table :data='accounts' style='width: 80%; margin-left: 10%;'>
    <el-table-column label="域名" prop="name"></el-table-column>
    <el-table-column label="所属平台" prop="name"></el-table-column>
    <el-table-column label="当前IP" prop="name"></el-table-column>
    <el-table-column label="最后更新时间" prop="name"></el-table-column>
  </el-table>
  <el-button type="success" icon="el-icon-plus" circle style="margin-top: 1rem;"></el-button>
</div>
</template>

<script>
export default {
  name: "DDnsRecord"
}
</script>

<style scoped>

</style>
