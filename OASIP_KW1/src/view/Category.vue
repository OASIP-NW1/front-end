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
<!-- <div class="grid grid-cols-5 gap-5">
    <div v-for="cat in categoryList">
      <img src="" alt="">
        <img src="../assets/project-manage.png" v-if="cat.id == 1">
        <img src="../assets/devops.png" v-if="cat.id == 2">
        <img src="../assets/data.png" v-if="cat.id == 3">
        <img src="../assets/client.png" v-if="cat.id == 4">
        <img src="../assets/back.png" v-if="cat.id == 5">
        <div class="px-6 py-4">
            <div>{{cat.eventCategoryName}}</div>
        <button class="btn btn-blue" @click="goCategoryDetail(cat)">Detail</button>
  </div>
<<<<<<< HEAD
</div>
=======
    </div>
</div> -->
<div v-for="cat in categoryList">
<div class="max-w-sm bg-white rounded-lg border shadow-md dark:bg-blue-600-500 dark:border-gray-500">
        <img src="../assets/project-manage.png" v-if="cat.id == 1">
        <img src="../assets/devops.png" v-if="cat.id == 2">
        <img src="../assets/data.png" v-if="cat.id == 3">
        <img src="../assets/client.png" v-if="cat.id == 4">
        <img src="../assets/back.png" v-if="cat.id == 5">
    <div class="p-5">
         <div>{{cat.eventCategoryName}}</div>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
       <button class="btn btn-blue" @click="goCategoryDetail(cat)">Detail</button>
    </div>
    </div>
</div>
</template>
 
<style>
.grid{
    /* text-align: center; */
    justify-content: center;
    margin-left: 6em;
}
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>