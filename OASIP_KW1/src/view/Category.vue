<script setup>
import { onBeforeMount, onUpdated, ref } from "vue";
import {useRouter} from 'vue-router'

const categoryList = ref([]);

const getStatus =ref(undefined) 
const categoryLink = `${import.meta.env.BASE_URL}api/eventCategory`;

const photo =ref([
  "../assets/project-manage.png",
  "../assets/devops.png",
  "../assets/data.png",
  "../assets/client.png",
  "../assets/back.png"

])

//GET category
// first get Category
const getCategory = async () => {
  const res = await fetch(categoryLink);
  if (res.status === 200) {
    categoryList.value = await res.json();
    getStatus.value = true;
  } else {
    getStatus.value = false;
  }

};
onBeforeMount(async () => {
  await getCategory();
});

const myRouter = useRouter()
const goCategoryDetail = (input)=>myRouter.push({name:'DetailCategory',params:{id:input.id}})
// const goCategoryDetail=(input)=>{console.log(input)}
</script>

<template>
<div class="grid grid-cols-3 gap-4 justify-center">
  <div v-for="cat in categoryList">
  <div class="mx-auto my-auto p-4 pb-4 mx-auto mt-auto bg-gray-200 rounded-md shadow-sm shadow-xl justify-center">
    <img src="../assets/project-manage.png" v-if="cat.id == 1">
        <img src="../assets/devops.png" v-if="cat.id == 2">
        <img src="../assets/data.png" v-if="cat.id == 3">
        <img src="../assets/client.png" v-if="cat.id == 4">
        <img src="../assets/back.png" v-if="cat.id == 5">
    <p>CategoryName : {{cat.eventCategoryName}}</p><br>
    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 
    rounded shadow justify-center"  id="button1" @click="goCategoryDetail(cat)">More Details</button>
  </div>
  </div>
</div>
</template>
 
<style>
.grid{
    text-align: center;
    justify-content: center;
    margin-left: 15em;
    margin-top: -2em;
}
</style>