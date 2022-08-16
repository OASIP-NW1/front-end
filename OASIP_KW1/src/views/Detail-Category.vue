<script setup>
import DetailCategoryVue from '../components/Detail-Category.vue';
import {useRouter, useRoute} from 'vue-router'
import { ref , onBeforeMount} from 'vue'

const myRouter = useRouter()
const {params} = useRoute()
let eventDetail = ref([])
// GET
const getCategoryDetail = async () =>{
    const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory/${params.id}`)
    if(res.status === 200) {
    eventDetail.value = await res.json()
    console.log(eventDetail.value);
    }else 
    console.log("error, cann't get data");
}
onBeforeMount( async () => {
   await getCategoryDetail()
})
</script>
 
<template>
    <DetailCategoryVue  :categoryDetail="eventDetail"></DetailCategoryVue>
</template>
 
<style>

</style>