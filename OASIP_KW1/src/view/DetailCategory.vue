<script setup>
import { onBeforeMount, onUpdated, ref } from "vue";
import {useRoute , useRouter} from 'vue-router'
const categoryList = ref([]);
const {params} = useRoute();
const getStatus = ref(false);
const categoryLink = `${import.meta.env.BASE_URL}api/eventCategory/${params.id}`;

const id = params.id
console.log(id)
//GET category
// first get Category
const getCategory = async () => {
  const res = await fetch(categoryLink);
  if (res.status === 200) {
    categoryList.value = await res.json();
    getStatus.value = true;

    console.log(details.value);

    console.log(categoryList.value);

  } else {
    getStatus.value = false;
  }
};

onBeforeMount(async () => {
   getCategory();
});
const myRouter = useRouter()
const goEditCategory = ()=>myRouter.push({name:'EditCategory',params:categoryList.value})
</script>
<template>
<div class="mx-96 my-14 max-w-screen-md p-5 pb-7 mx-auto mt-14 bg-gray-200 rounded-md shadow-sm shadow-xl">
  <!-- <div class="col-md-8"> -->
      <!-- <div class="card-body"> -->
        <!-- <img src="../assets/project-manage.png" v-if="categoryList.id == 1"> -->
        <h6 class="card-title2"><b>Category Name : </b>{{categoryList.eventCategoryName}}</h6>
        <hr style="width:90%;text-align:left;margin-left:0">
        <p class="card-text" v-if="categoryList.eventCategoryDescription == null"><b>Description : - </b></p>
        <p class="card-text" v-else><b>Description : </b>{{categoryList.eventCategoryDescription}}</p>
        <p class="card-text"><b>Duration : </b>{{categoryList.eventDuration}}</p>
    <!-- </div> -->
        <!-- <button class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700  -->
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 mx-80 my-7" @click="goEditCategory()">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    Edit
  </span>
  </button>

</div>
</template>
<style>
</style>