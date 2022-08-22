<script setup>
import { onBeforeMount, ref } from "vue";
import {useRoute} from 'vue-router'

const categoryList = ref([]);
const {params} = useRoute();
const getStatus = ref(undefined);
const categoryLink = `${import.meta.env.BASE_URL}api/eventCategory`;

const id = params.id
console.log(id)
//GET category
// first get Category
const getCategory = async () => {
  const res = await fetch(categoryLink);
  if (res.status === 200) {
    categoryList.value = await res.json();
    getStatus.value = true;
    console.log(categoryList.value)
    console.log('true')
  } else {
    getStatus.value = false;
    console.log('false')
  }

};
onBeforeMount( () => {
   getCategory;
});

</script>
<template>
<div v-for="details in categoryList">
{{details.eventCategoryName}}
</div>
{{categoryList}}
</template>

<style>
</style>