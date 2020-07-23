<template>
    <div class="product-list">
        <div>
            <el-button type="primary" @click="addProduct" >添加商品</el-button>
        </div>
    <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="商品ID"></el-table-column>
            <el-table-column show-overflow-tooltip prop="title" label="商品标题"></el-table-column>
            <el-table-column show-overflow-tooltip prop="image" label="商品图片"></el-table-column>
            <el-table-column show-overflow-tooltip prop="sellPoint" label="商品卖点"></el-table-column>
            <el-table-column show-overflow-tooltip prop="price" label="商品价格"></el-table-column>
            <el-table-column show-overflow-tooltip prop="cid" label="商品类目"></el-table-column>
            <el-table-column show-overflow-tooltip prop="num" label="商品库存"></el-table-column>
            <el-table-column show-overflow-tooltip prop="status" label="状态"></el-table-column>
            <el-table-column show-overflow-tooltip prop="created" label="创建时间"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="updated" label="更新日期"></el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                        <el-button
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="handleUpdate(scope.$index, scope.row)"
                    ></el-button>
                    <el-button
                        size="mini"
                        icon="el-icon-delete"
                        type="danger"
                        circle
                        @click="handleDelete(scope.$index, scope.row)"
                    ></el-button>
                  </template>
            </el-table-column>
    </el-table>
    <!-- 分页 -->
        <ProductPagination @onSend="getPagination" />
    <!-- 添加产品对话框 -->
         <el-dialog
            title="添加产品"
            :visible.sync="dialogTableVisible"
            width="80%"
            :before-close="handleClose"
        >
        <!-- 选择类目对话框 -->
            <el-dialog
                width="60%"
                title="商品类目选择"
                :visible.sync="innerVisible"
                append-to-body>
            <!-- 类目tree -->
                <el-tree
                    :props="props"
                    :load="loadNode"
                    lazy
                    highlight-current
                   >
                </el-tree>
            </el-dialog>

            <!-- 添加商品表单 -->
            <el-form ref="form" :model="product" label-width="80px">
                <el-form-item label="商品类目">
                    <el-button style="float:left" type="primary" @click="innerVisible = true">选择类目</el-button>
                    <span
                        style="float:left;margin-left:10px"
                    >
                    {{ currentCategory && currentCategory.name }}</span>
                </el-form-item>
                <el-form-item label="商品标题">
                    <el-input v-model="product.title"></el-input>
                </el-form-item> 
                <el-form-item label="商品买点">
                    <el-input v-model="product.sellPoint"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="product.price"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="product.num"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-button @click="uploadHandle" style="float:left" type="primary">上传图片</el-button>
                    <img v-if="imgurl" :src="imgurl" class="avatar">
                    
                    <!-- 上传图片对话框 -->
                    <el-dialog
                        title="上传图片"
                        :visible.sync="dialogUploadImgVisible"
                        width="40%"
                        :before-close="handleClose"
                        append-to-body
                    >
                        <ProductImgUpload @UploadImg="getUploadImg" @UploadImgUrl="getUploadImgUrl"/>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogUploadImgVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogUploadImgVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品描述">
                    <ProductUeditor @getUeditor="getUeditorData"/>
                </el-form-item>
            </el-form>
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="productSubmit">提交</el-button>
        </el-dialog>
    </div>
</template>
<script>
import ProductPagination from '../productPagination'
import ProductUeditor from '../productUeditor/index'
import ProductImgUpload from '../productImgUpload'
export default {
    components:{
        ProductPagination,
        ProductUeditor,
        ProductImgUpload
    },
     data(){
         return {
            datas:[],
            currentCategory:{},
          tableData: [],
          dialogTableVisible:false,
          dialogUploadImgVisible:false,
          product:{},
          innerVisible:false,
            props: {
                label: 'name',
                children: 'children'
            },
            imgResponse:{},
            imgurl:'',
            ueditorData:'',
            updateFlagId:0
        }
    },
    methods:{
        // tree
        loadNode(node, resolve) {
            this.currentCategory = node.data
            // console.log(node)
            if (node.level === 0) {
                this.$api.selectItemCategoryByParentId()
                .then(res =>{
                    if(res.status === 200){
                        // console.log(res.data.data)
                        return resolve(res.data.data);
                    }else{
                        alert('数据获取失败！！')       
                    }
                }).catch(error =>{
                    console.log(error)
                })
            
            }
            if (node.level >= 1){
                 this.$api
                    .selectItemCategoryByParentId({
                        id: node.data.cid
                    })
                    .then(res => {
                        if (res.status === 200) {
                            return resolve(res.data.data);
                        } else {
                            alert("请求失败");
                        }
                    })
                    .catch(error => {
                        resolve([]);
                    });
            }
        },
        getPagination(tableData){
            this.tableData = tableData
        },
        addProduct(){
            this.dialogTableVisible = true
        },
        // 关闭添加产品对话框
        handleClose() {
            this.dialogTableVisible = false;
        },
        uploadHandle(){
            this.dialogUploadImgVisible =true
        },
        // 富文本编辑器
        getUeditorData(desc){
            // console.log(desc)
            this.ueditorData = desc
        },
        // 上传图片
        getUploadImg(response){
            this.imgResponse = response
        },
        //图片url
        getUploadImgUrl(url){
            this.imgurl = url
            // console.log(url)
        },
        http(){
            this.$api.selectTbItemAllByPage({
            page:1
        }).then(res =>{
            if(res.status === 200){
                this.tableData = res.data.data.result
            }else{
                alert('数据获取失败！！')       
            }
        }).catch(error =>{
            console.log(error)
        })
        },
        // 产品提交
        productSubmit(){
            this.dialogTableVisible = false
            if(this.updateFlagId){
                //修改
                this.$api.updateTbItem({
                    id:this.updateFlagId,
                    title:this.product.title,
                    sellPoint:this.product.sellPoint,
                    price: this.product.price,
                    num: this.product.num,
                    cid:this.currentCategory.cid,
                    desc:this.ueditorData,
                    image:this.imgurl
                }

                ).then(res =>{
                    if(res.data.status === 200){
                        this.http()
                        this.updateFlagId = 0
                    }else{
                        alert(res.data.msg)
                    }
                }).catch(error =>{
                    console.log(error);
                })
            }else{
                //新增
                this.$api.insertTbItem({
                title:this.product.title,
                sellPoint:this.product.sellPoint,
                price: this.product.price,
                num: this.product.num,
                cid:this.currentCategory.cid,
                desc:this.ueditorData,
                image:this.imgurl
            }).then(res =>{
                if(res.data.status === 200){
                    this.http()
                }else{
                    alert(res.data.msg)
                }
            }).catch(error =>{
                console.log(error);
            })
            }
            
        },
        //删除产品
        handleDelete(index, row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$api.deleteItemById({
                itemId:row.id
            }).then(res=>{
                if(res.data.status === 200){
                    this.http()
                }else{
                    res.msg
                }
            }).catch(error =>{
                console.log(error);
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });         
    })
    },
    /**
     *预更新产品
     */
    handleUpdate(index,row){
        // console.log(row);
        this.dialogTableVisible = true
        this.$api.preUpdateItem({
            itemId:row.id
        }).then(res =>{
            if(res.data.status === 200){
                console.log(res.data)
                this.product = {
                     title: res.data.data.title,
                        sellPoint: res.data.data.sellPoint,
                        price: res.data.data.price,
                        num: res.data.data.num,
                        cid: res.data.data.cid,
                        desc: res.data.data.desc,
                        image: res.data.data.image
                }
                 this.updateFlagId = res.data.data.id;
            }
        })
    }
},
    mounted(){
        this.http()     
    }
}
</script>