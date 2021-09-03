<template>
  <div class="flex flex-col justify-between items-center bg-indigo-200 w-36 h-44 py-2 px-2 dark:bg-gray-800">
    <span>{{dayWeather.date}}</span>
    <img :src="icon" alt="Specific card">
    <div class="flex justify-between w-full">
      <span class=" text-gray-700">{{dayWeather.top}} °{{unit}}</span>
      <span class=" text-gray-500">{{dayWeather.buttom}} °{{unit}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"Card",
  props:{
    dayWeather:{
      type:Object,
      required:true
    },
    unit:{
      type:String,
      required:true
    }
  },
  computed:{
    icon(){
      return `https://openweathermap.org/img/wn/${this.dayWeather.icon}@2x.png`
    }
  }
}
</script>

<style>

</style>