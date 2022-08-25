<script setup>
import { onBeforeMount, onUpdated, ref } from "vue";
import {useRoute} from 'vue-router'

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
  } else {
    getStatus.value = false;
  }
};

onBeforeMount(async () => {
  await getCategory();
});

</script>
<template>
<div class="col-md-8" >
      <div class="card-body">
        <!-- <img src="../assets/project-manage.png" v-if="categoryList.id == 1"></img> -->
        <h6 class="card-title2"><b>Category Name : </b>{{categoryList.eventCategoryName}}</h6>
        <hr style="width:80%;text-align:left;margin-left:0">
        <p class="card-text" v-if="categoryList.eventCategoryDescription == null"><b>Description : - </b></p>
        <p class="card-text" v-else><b>Description : </b>{{categoryList.eventCategoryDescription}}</p>
        <p class="card-text"><b>Duration : </b>{{categoryList.eventDuration}}</p>
</div>
</div>
</template>

<style>
</style>