<template>
    <div>
        <el-pagination
            background
            :current-page="currentPage"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="100">
        </el-pagination>
    </div>
</template>
<script>
export default {
    name:"ProductPagination",
    data(){
        return{
            currentPage:1,
            productData:[]
        }
    },
    methods:{
        handleCurrentChange(currentPage){
            this.$api.selectTbItemAllByPage({
                page:currentPage
            }).then(res =>{
                if(res.data.status === 200){
                    this.productData = res.data.data.result
                    this.$emit("onSend",this.productData)
                }else{
                     alert(res.data.msg)
                    this.currentPage = 1;
                }
            }).catch(error =>{
                console.log(error)
            })
        }
    }
}
</script>