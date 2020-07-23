<template>
    <div>
        <el-upload
            class="upload-demo"
            ref="upload"
            action="http://localhost:3300/upload"
            multiple
            :limit="1"
            :file-list="fileList"
            :auto-upload="false"
            :on-success="uploadOk"
            >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>
<script>
export default {
    data(){
        return{
            fileList:[],
            imageUrl:''
        }
    },
    methods:{
        uploadOk(response, file, fileList){
            console.log(file)
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$emit("UploadImg",response)
            this.$emit("UploadImgUrl",this.imageUrl)
        },
        submitUpload(){
             this.$refs.upload.submit();
        },
        //显示图片
        // handlePictureCardPreview(file){
        //     console.log(file)
        //      this.$emit('dialogImageUrl',file.url)
        // }
    }
}
</script>