<template>
  <div>
    <el-button v-show="btnVisible" type="primary" @click="addContentVisible = true">添加{{btnName}}</el-button>
    <el-table :data="tableData" style="width:100%">
      <el-table-column show-overflow-tooltip label="ID" prop="id"></el-table-column>
      <el-table-column show-overflow-tooltip label="标题" prop="name"></el-table-column>
      <el-table-column show-overflow-tooltip label="URL地址" prop="url"></el-table-column>
      <el-table-column show-overflow-tooltip label="图片地址" prop="image"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加广告内容"
      :visible.sync="addContentVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="URL地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="图片地址">
          <el-input v-model="form.image"></el-input>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="addContentVisible = false">取消</el-button>
        <el-button type="primary" @click="addDialogHandle">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  methods: {
    handleDelete(index, row) {
    //   console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$api.deleteContentByIds({
              id:row.id
          }).then(res =>{
            //   console.log(res.data);
            this.reload()
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClose() {
      this.addContentVisible = false;
      console.log(this.SendContentData, "wcwcwc");
    },
    addDialogHandle() {
      this.$api
        .insertTbContent({
          pid: this.SendContentData.pid,
          name: this.form.name,
          url: this.form.url,
          image: this.form.image
        })
        .then(res => {
          if (res.data.status === 200) {
            this.addContentVisible = false;
            this.reload();
          }
        });
    }
  },
  props: {
    SendContentData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tableData: [],
      addContentVisible: false,
      form: {},
      btnVisible: false,
      btnName: "",
      pids: 0
    };
  },
  watch: {
    SendContentData(value, oldValue) {
      // console.log(value);
      this.btnVisible = true;
      this.btnName = value.name;
      this.pids = value.pid;
      console.log(this.SendContentData);
      this.$api.selectTbContentAllByCategoryId({ id: value.pid }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          // console.log(this.tableData);
        } else {
          this.tableData = [];
        }
      });
    }
  },
  mounted() {
    //不对的写法 用watch
    // this.$api.selectTbContentAllByCategoryId(
    //         {id:this.SendContentData.pid}
    //     ).then(res =>{
    //             console.log(res.data);
    //     })
    // console.log(this.SendContentData,'wcwcwcwcc');
  }
};
</script>