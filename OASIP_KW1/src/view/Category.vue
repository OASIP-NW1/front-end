<script setup>
import { computed } from "@vue/reactivity";
import { onBeforeMount, onUpdated, ref } from "vue";
import {useRouter} from 'vue-router'

const categoryList = ref([]);
const token=ref(undefined)
const getStatus =ref(undefined) 
const categoryLink = `${import.meta.env.BASE_URL}api/eventCategory`;
const refreshTLink =`${import.meta.env.BASE_URL}api/refresh`


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
  const auther=ref(localStorage.getItem('tokenA'))
  const refreshT=ref(localStorage.getItem('tokenR'))
  const res = await fetch(categoryLink,{
    method:'GET',
    headers:{
      "Authorization":`Bearer ${auther.value}`
    }
  });
  if (res.status === 200) {
    categoryList.value = await res.json();
    getStatus.value = true;
     console.log(categoryList.value)
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
  await getCategory();
});

const myRouter = useRouter()
const goCategoryDetail = (input)=>myRouter.push({name:'DetailCategory',params:{id:input.id}})
// const goCategoryDetail=(input)=>{console.log(input)}

// local storage
const saveLocal=()=>{
  localStorage.setItem('tokenA',`${token.value.accessToken}`)
  localStorage.setItem('tokenR',`${token.value.refreshToken}`)
}

//เรียงรูปตาม id
const imgById =(input)=>{
  const text="../../src/assets/categorys/"+input+".png"
return text 
}
</script>

<template>
<div class="mt-8 mx-auto w-4/5">
  <ul class="grid grid-cols-3 gap-4 mx-auto my-auto w-full ">
    <li v-for="(cat,index) in categoryList" class="bg-gray-400 rounded p-5" :key="index">
    
        <img :src="'../src/assets/categorys/'+(index+1)+'.png'" alt="Icon" class="mx-auto w-1/3"  />
      <p class="w-fit mx-auto">CategoryName : {{cat.eventCategoryName}}</p>
      <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 
    rounded shadow justify-center m-2 "  id="button1" @click="goCategoryDetail(cat)">More Details</button>
      
    </li>
  </ul>
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