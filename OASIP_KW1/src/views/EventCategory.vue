<script setup>
import { ref,onBeforeMount } from 'vue'
import Category from '../components/Category.vue';
// import DetailCategory from '../components/DetailCategory.vue';


let data = ref([])
// GET
const getNotes = async () =>{

    const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory`)
    if(res.status === 200) {
    console.log(`response.status: ${res.status}`)
    console.log(res);
    data.value = await res.json()
    console.log(data.value);
    }else 

    console.log("error, cann't get data");
}
onBeforeMount( async () => {
   await getNotes()
})
</script>
 
<template>
<Category :eventCategory = "data" />
<!-- <DetailCategory/> -->
</template>
 
<style>

</style>