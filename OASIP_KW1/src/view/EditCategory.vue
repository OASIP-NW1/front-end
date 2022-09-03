<script setup>
import { computed } from '@vue/reactivity';
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'


const myRouter = useRouter()
const { params } = useRoute()
const categoryName = ref(params.eventCategoryName);
const categoryDescription = ref(params.eventCategoryDescription);
const categoryDuration = ref(params.eventDuration);
const check_name = ref(false);
const check_name_over = ref(false);
const check_duration = ref(false);
const check_name_duplicate = ref(false);
const updateComplete = ref(false);
const allCategory = ref([])
const nameOfCategory = ref([])
console.log(params)
// defineEmits(['edit'])
// const prop = defineProps({
//   categoryDetail: {
//     type: Array,
//     require: true
//   },
// })
const categoryLink =`${import.meta.env.BASE_URL}api/eventCategory`

const author=localStorage.getItem('token')

// get category
const getAllCategory = async () => {
  const res = await fetch(`${categoryLink}/${id}`,{
    method:'GET',
    headers:{
      'Authorization':`Bearer ${author}`
    }
  })
  if (res.status === 200) {
    allCategory.value = await res.json()
    allCategory.value.forEach((category) => {
      nameOfCategory.value.push(category.eventCategoryName)
    })
  }
}
onBeforeMount(async () => {
  await getAllCategory()
})
// modify
const modifyCategory = async (category) => {
  // console.log(category);
  const res = await fetch(`${categoryLink}/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${author}`
    },
    body: JSON.stringify({
      id: category.id, eventCategoryName: category.name, eventCategoryDescription: category.detail, eventDuration: category.duration
      , categoryName: category.categoryName
    })
  })
  if (res.status === 200) {
    console.log('update success')
  } else console.log('error, cannot update notes');
}


const getUpdate = computed(() => {
  if (categoryName.value == undefined || categoryName.value == "" || categoryName.value.length == 0) {
    check_name.value = true;
  } else {
    if (nameOfCategory.value.includes(categoryName.value) && categoryName.value != params.eventCategoryName) {
      check_name_duplicate.value = true;
      check_name.value = false;
    } else {
      if (categoryName.value.length > 100) {
        check_name_over.value = true;
        check_name.value = false;
        check_name_duplicate.value = false;
      } else {
        if (categoryDuration.value > 480 || categoryDuration.value < 1) {
          check_duration.value = true;
          check_name.value = false;
          check_name_over.value = false;
          check_name_duplicate.value = false;
        } else {
          updateComplete.value = true;
          check_duration.value = false;
          check_name.value = false;
          check_name_over.value = false;
          check_name_duplicate.value = false;
          setTimeout(() => {
            myRouter.go(-2);
          }, 950)
          return {
            id: params.id, name: categoryName.value, detail: categoryDescription.value,
            duration: categoryDuration.value, categoryName: categoryName.value
          }
        }
      }
    }
  }
})
</script>
 
<template>
  <div class="max-w-l w-full lg:max-w-full lg:flex justify-center">
    <div
      class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 
      bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-center leading-normal justify-center">
      <div
        class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 justify-center"
        role="alert" v-show="check_name">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Please input Category Name</span>
        </div>
      </div>
      <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
        role="alert" v-show="check_name_over">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">CategoryName Must not exceed 100 characters.</span>
        </div>
      </div>
      <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
        role="alert" v-show="check_name_duplicate">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">CategoryName is Duplicate</span>
        </div>
      </div>
      <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
        role="alert" v-show="check_duration">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Please validate duration is between 1-480</span>
        </div>
      </div>
      <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
        role="alert" v-show="updateComplete">
        <span class="font-medium">Success alert!</span>
      </div>
      <b>Category Name : </b> <input class="shadow appearance-none border rounded w-full py-2 px-3 
      text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="categoryName">
      <!-- <input class="text" v-model="categoryName"><br> -->
      <b>Description : </b> <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 
      bg-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white 
      dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        cols="50" v-model="categoryDescription">
      </textarea> 
      <b>Duration : </b><input class="shadow appearance-none border rounded w-full py-2 px-3 
      text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" min=1 max=480 v-model="categoryDuration">
       <!-- <input class="card-text" type="number" min=1 max=480 v-model="categoryDuration"> <br><br> -->
       <br>
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        @click="modifyCategory(getUpdate)">Update Category</button>&nbsp;&nbsp;&nbsp;
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        @click="myRouter.go(-1)">Cancel</button>
    </div>
  </div>
</template>
 
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali:wght@500&display=swap');

.titled {
  margin-top: -5em;
}

.card {
  margin-top: -38em;
  margin-left: 19em;
  border-radius: 2em;
  margin-bottom: -2em;
}

.card-text {
  font-family: 'Mali', cursive;
}

.card-title2 {
  margin-top: 2em;
  font-family: 'Mali', cursive;
}

.iconpeople {
  margin-left: -35em;
  margin-top: -5em;
}

.edit {
  margin-left: 4em;
  margin-right: 5.35em;
  margin-top: -2.5em;
  font-family: 'Mali', cursive;

}

.close {
  margin-left: -1em;
  margin-right: 0.5em;
  font-family: 'Mali', cursive;
}

.id {
  margin-top: -2em;
  font-family: 'Mali', cursive;
}
</style>