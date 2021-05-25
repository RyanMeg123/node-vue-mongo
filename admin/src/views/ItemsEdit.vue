<!--  -->
<template>
  <div class>
    <h1>{{id ? '编辑物品': '创建物品'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    // this.fetchParents();
    this.id && this.fetch();
  },
  methods: {
    afterUpload(res) {
      console.log(res, "resrerer");
      this.$set(this.model, "icon", res.url);
      this.model.icon = res.url;
      // this.$forceUpdate();
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      console.log(res, "ciangqinag ");
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/items`);
      console.log(res, "ciangqinag ");
      this.parents = res.data;
    },
    async save() {
      console.log(112);
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/items", this.model);
      }
      console.log(res, "res");
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功！"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #ccc;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>