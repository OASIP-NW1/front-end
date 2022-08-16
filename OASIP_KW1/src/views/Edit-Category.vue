<script setup>
import EditCategoryVue from '../components/Edit-Category.vue';
import {useRouter, useRoute} from 'vue-router'
import { ref , onBeforeMount} from 'vue'

const myRouter = useRouter()
const {params} = useRoute()
let eventDetail = ref({})
// GET
const getCategoryDetail = async () =>{
    const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory/${params.id}`)
    if(res.status === 200) {
    eventDetail.value = await res.json()
    console.log("Yo");
    console.log(eventDetail.value);
    }else 
    console.log("error, cann't get data");
}
onBeforeMount( async () => {
   await getCategoryDetail()
})

// modify
const modifyCategory = async (category) => {
  console.log(category);
  const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory/${category.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ 
        id: category.id , eventCategoryName: category.name , eventCategoryDescription: category.detail , eventDuration: category.duration
        ,categoryName: category.categoryName
     })
  })
  if(res.status === 200){
    console.log('update success')
  }else console.log('error, cannot update notes');
}


</script>
 
<template>
  <EditCategoryVue  :categoryDetail="eventDetail" @edit="modifyCategory"></EditCategoryVue>
</template>
 
<style>

</style>