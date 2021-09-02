<template>
  <div class="flex flex-col justify-between items-center bg-indigo-200 w-32 h-44 py-2 px-6 dark:bg-gray-800">
    <span>{{dayWeather.date}}</span>
    <img :src="icon" alt="Specific card">
    <div class="flex justify-between w-full">
      <span>{{dayWeather.top}}</span>
      <span>{{dayWeather.buttom}}</span>
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