<script setup>
import { onBeforeMount, onUpdated, ref } from "vue";
import {useRoute} from 'vue-router'

const categoryList = ref([]);
const {params} = useRoute();
const getStatus = ref(false);
const categoryLink = `${import.meta.env.BASE_URL}api/eventCategory/${id}`;

const id = params.id
console.log(id)
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

</script>
<template>
<div v-for="details in categoryList">
{{details.eventCategoryName}}
</div>
</template>

<style>
</style>