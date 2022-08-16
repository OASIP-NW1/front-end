<script setup>
import { ref,onBeforeMount } from 'vue'
import eventlist from '../components/EventList.vue'

console.clear();


let data = ref([])
// GET
const getCategories = async () =>{
    const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory`)
    if(res.status === 200) {
    data.value = await res.json()
    }
}
onBeforeMount( async () => {
   await getCategories()
})

const deleteEvent = async (eventID) => {
  const res = await fetch (`${import.meta.env.BASE_URL}api/events/${eventID}` , 
  {method: 'delete'})
  if(res.status === 200){
    (data.value = data.value.filter((event) => event.id !== eventID))
  }
}

</script>
 
<template>
  <div>
    <eventlist :categories="data" @deleteEvent="deleteEvent"/>
  </div>
</template>

<style>
html , body{
  max-width: 100%;
  max-height: 0em
}
</style>