<script setup>
defineProps({
    heightt:{
        type:Number,
        default:10
    },
    widthh:{
        type:Number,
        default:10
    },
    thick:{
        type:Number,
        default:2
    }
})
</script>
 
<template>
<div class="loader " :style="{width:`${widthh}px`,height:`${heightt}px`,border:`${thick}px solid #f3f3f3`,'border-top':`${thick}px solid #3498db`}"></div>
</template>
 
<style scoped>
.loader {
  border-radius: 50%;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 0.8s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>