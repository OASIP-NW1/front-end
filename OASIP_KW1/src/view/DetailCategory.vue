<script setup>
import { onBeforeMount, onUpdated, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
const categoryList = ref([]);
const { params } = useRoute();
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
const goEditCategory = () => myRouter.push({ name: 'EditCategory', params: categoryList.value })
const goCategory = () => myRouter.push({ name: 'Category' })
</script>
<template>
  <div class="max-w-l w-full lg:max-w-full lg:flex justify-center">
    <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 
      bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-center leading-normal">
      <div class="mb-8">
        <h6><b>Category Name : </b>{{ categoryList.eventCategoryName }}</h6>
        <!-- <hr style="width:90%;text-align:left;margin-left:0"> -->
        <p v-if="categoryList.eventCategoryDescription == null"><b>Description : - </b></p>
        <p v-else><b>Description : </b>{{ categoryList.eventCategoryDescription }}</p>
        <p><b>Duration : </b>{{ categoryList.eventDuration }} minutes</p>
        <br>
        <button
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          @click="goEditCategory()">
          Edit {{ categoryList.eventCategoryName }}
        </button> &nbsp;
        <button
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          @click="goCategory()">
          Back to Category
        </button>

      </div>
    </div>
  </div>
</template>
<style scoped>
</style>