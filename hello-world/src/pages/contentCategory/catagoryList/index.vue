<template>
    <div>
        <el-tree
            :props="defaultProps"
            :load="loadNode"
            lazy
            highlight-current
            :render-content="renderContent"
            @node-click="handleNodeClick"
            :expand-on-click-node="false"
        >
        </el-tree>
        <el-dialog
            title="添加广告"
            :visible.sync="CategoryVisible"
            width="30%"
            center
        >
            <span>
                <el-input v-model="categoryName" aria-placeholder="请添加广告分类名称"></el-input>
            </span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="CategoryVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureHandler">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="修改广告"
            :visible.sync="updataCategoryVisible"
            width="30%"
            center
        >
            <span>
                <el-input v-model="categoryName" aria-placeholder="请修改广告分类名称"></el-input>
            </span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updataCategoryVisible = false">取 消</el-button>
                <el-button type="primary" @click="updataSureHandler">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
     inject:["reload"],
    data(){
        return{
            defaultProps:{
                childern:'childern',
                label:'name'
            },
            CategoryVisible:false,
            updataCategoryVisible:false,
            categoryName:'',
            curData:{},
            updataID:0
        }
    },
    mounted(){
        
    },
    methods:{
        handleNodeClick(data){
            console.log(data);
            this.$emit('onSendContent',data)
        },
         loadNode(node, resolve) {
             console.log(node);
            if (node.level === 0) {
                this.$api.selectContentCategoryByParentId()
                .then(res=>{
                    if(res.data.status === 200){
                        return resolve(res.data.data);
                    }
                }).catch(error =>{
                    return resolve([]);
                })
            
            }
            if (node.level >= 1){
                this.$api.selectContentCategoryByParentId({
                    id:node.data.pid
                })
                .then(res=>{
                    if(res.data.status === 200){
                        return resolve(res.data.data);
                    }
                }).catch(error =>{
                    return resolve([]);
                })
            }
         },
        //  提交分类广告名称
         sureHandler(){
             this.CategoryVisible =false 
                this.$api.insertContentCategory({
                    pid:this.curData.pid,
                    name:this.categoryName
                }).then(res =>{
                    this.reload()
                })
            
         },
            append(data) {
                console.log(data);
                this.curData = data
                this.CategoryVisible =true       
            },

            remove(node, data) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            })
                .then(() => {
                    this.$api
                        .deleteContentCategoryById({
                            id: data.pid
                        })
                        .then(res => {
                            if (res.data.status === 200) {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                // 刷新页面
                                this.reload();
                            } else {
                                this.$message({
                                    type: "error",
                                    message: "删除失败!"
                                });
                            }
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            },
            updata(node, data){
                this.updataCategoryVisible = true
                this.updataID = data.pid
            },
            updataSureHandler(){
                this.updataCategoryVisible = false
                this.$api.updateContentCategory({
                    id:this.updataID,
                    name:this.categoryName
                }).then(res =>{
                    if(res.data.status = 200){
                        this.reload()
                    }
                })
            },
        renderContent(h, { node, data, store }) {
            return (
            <span class="custom-tree-node">
                <span>{node.label}</span>
                <span>
                <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                <el-button size="mini" type="text" on-click={ () => this.updata(node, data) }>修改</el-button>
                </span>
            </span>);
        }
    }
    
}
</script>