<script setup>
import { onBeforeMount, onUpdated, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'

const myRouter = useRouter()
const { params } = useRoute();
const categoryList = ref([]);
const id = params.id
const getStatus = ref(false);
const categoryLink = `${import.meta.env.BASE_URL}api/eventCategory`;
const refreshTLink =`${import.meta.env.BASE_URL}api/refresh`
const token =ref(undefined)

console.log(id)


// get Category
const getCategory = async () => {
  const auther=ref(localStorage.getItem('tokenA'))
  const refreshT=ref(localStorage.getItem('tokenR'))
  const res = await fetch(`${categoryLink}/${id}`,{
    method:'GET',
    headers:{
      "Authorization":`Bearer ${auther.value}`
    }
  });
  if (res.status === 200) {
    categoryList.value = await res.json();
    getStatus.value = true;

    

    console.log(categoryList.value);

  }else if(res.status === 401){
    const ress= await fetch(refreshTLink,{
      method:'GET',
      headers:{
        "Authorization":`Bearer ${refreshT.value}`
      }
    });

    if(ress.status === 200){
      token.value =await ress.json()
      saveLocal()
      console.log('refresh token successful')
      getCategory()
    }else console.log('something waring to get token')


  } else {
    getStatus.value = false;
  }
};

onBeforeMount(async () => {
  getCategory();
});

//const goEditCategory = () => myRouter.push({ name: 'EditCategory', params: categoryList.value })
const goCategory = () => myRouter.push({ name: 'Category' })



// for edit
const isEdit=ref(false)

// local storage
const saveLocal=()=>{
  localStorage.setItem('tokenA',`${token.value.accessToken}`)
  localStorage.setItem('tokenR',`${token.value.refreshToken}`)
}
</script>
<template>
  <!-- for show -->
  <div v-if="isEdit==false" class="max-w-l w-full lg:max-w-full lg:flex justify-center">
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
          @click="isEdit=true">
          Edit<!--  {{ categoryList.eventCategoryName }} -->
        </button> &nbsp;
        <button
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          @click="goCategory()">
          Back to Category
        </button>
      </div>
    </div>
  </div>

  <!-- for edit -->
  <div v-if="isEdit==true" class="max-w-l w-full lg:max-w-full lg:flex justify-center">
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
        @click="isEdit=false">Cancel</button>
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