<template>
    <div>
        <CategoryList @onSendContent="getOnSendContent"/>
        <Content :SendContentData="OnSendContentData"/>
    </div>
</template>
<script>

import CategoryList from './catagoryList'
import Content from './content'
export default {
    name:"ContentCategory",
   
    components:{
        CategoryList,
        Content
    },
    data(){
        return{
           OnSendContentData:{}
        }
    },
    methods:{
        getOnSendContent(data){
            this.OnSendContentData = data
        }
    }

}
</script>