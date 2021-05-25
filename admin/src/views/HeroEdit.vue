<!--  -->
<template>
  <div class>
    <h1>{{id ? '编辑英雄': '创建英雄'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-form-item label="称号">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="model.categories" multiple>
            <el-option
              v-for="item of categories"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度">
          <el-rate v-model="model.scores.difficult" :max="10" show-score style="margin-top: 0.6rem"></el-rate>
        </el-form-item>
        <el-form-item label="技能">
          <el-rate v-model="model.scores.skills" :max="10" show-score style="margin-top: 0.6rem"></el-rate>
        </el-form-item>
        <el-form-item label="攻击">
          <el-rate v-model="model.scores.attack" :max="10" show-score style="margin-top: 0.6rem"></el-rate>
        </el-form-item>
        <el-form-item label="生存">
          <el-rate v-model="model.scores.survive" :max="10" show-score style="margin-top: 0.6rem"></el-rate>
        </el-form-item>
        <el-form-item label="顺丰出装">
          <el-select v-model="model.items1" multiple>
            <el-option v-for="item of items1" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逆风出装">
          <el-select v-model="model.items2" multiple>
            <el-option v-for="item of items1" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用技巧">
          <el-input v-model="model.usageTips" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="对抗技巧">
          <el-input v-model="model.battleTips" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="团战思路">
          <el-input v-model="model.teamTips" type="textarea"></el-input>
        </el-form-item>
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
        name: "",
        avatar: "",
        scores: {
          difficult: 0
        }
      },
      categories: [],
      items1: [],
      parents: []
    };
  },
  created() {
    this.fetchCategories();
    this.fetchItems();
    this.id && this.fetch();
  },
  methods: {
    afterUpload(res) {
      console.log(res, "resrerer");
      // this.$set(this.model, "avatar", res.url);
      this.model.avatar = res.url;
      // this.$forceUpdate();
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      console.log(res, "ciangqinag ");
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      console.log(res, "ciangqinag ");
      this.items1 = res.data;
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      console.log(res, "ciangqinag ");
      this.model = Object.assign({}, this.model, res.data);
      console.log(this.model, " this.model");
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/heroes`);
      console.log(res, "ciangqinag ");
      this.parents = res.data;
    },
    async save() {
      console.log(112);
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      console.log(res, "res");
      this.$router.push("/heroes/list");
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