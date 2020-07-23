<template>
    <div>
        <Nav />
        <router-view />  
    </div>
</template>
<script>
import Nav from '../components/Nav'
export default {
    name:"Layout",
    components:{
       Nav
    },
  
    methods:{
       
    }
}
</script>
<style scoped>

</style>