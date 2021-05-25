<!--  -->
<template>
  <div class>
    <h1>{{id ? '编辑分类': '创建分类'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入的其他文件 例如：import moduleName from 'modulePath';

export default {
  //import所引入的组件注册
  props: {
    id: {}
  },
  components: {},

  data() {
    return {
      model: {
        // name: "",
        // parent: ''
      },
      parents: []
    };
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      console.log(res, "ciangqinag ");
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      console.log(res, "ciangqinag ");
      this.parents = res.data;
    },
    async save() {
      console.log(112);
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/categories", this.model);
      }
      console.log(res, "res");
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功！"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>