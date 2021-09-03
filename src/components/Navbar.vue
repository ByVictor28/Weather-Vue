<template>
   <!-- header -->
    <div class="flex justify-between items-center py-5 ">
      
      <button @click="changeMenuOpen" class="bg-gray-700 text-white p-2 h-12 px-4 dark:bg-gray-300 dark:text-black">Search place</button>
      <button v-if="dark" @click='$emit("change")' class="bg-gray-700 dark:bg-gray-300 p-4 rounded-full"><SunIcon class="h-5 w-5 text-white dark:text-black"/></button>
      <button v-else @click='$emit("change")' class="bg-gray-700 dark:bg-gray-300 p-4 rounded-full"><MoonIcon class="h-5 w-5 text-white dark:text-black"/></button>
    </div>
    <!-- MENU -->
    <div class="bg-indigo-300 dark:bg-gray-700 flex flex-col w-11/12 md:w-6/12 h-screen absolute top-0 px-4 py-4 text-gray-900 dark:text-gray-400 transition-all duration-700"
        :class="isOpen"
    >
      
      <button @click="changeMenuOpen" class="bg-gray-700 dark:bg-gray-300 p-2 rounded-full self-end mb-3"><XIcon class="h-5 w-5 text-white dark:text-black"/></button>
      <div class="flex gap-2 mb-5">
        <input type="text" class=" bg-transparent border-2 border-gray-500 px-2 py-2 w-8/12" placeholder="search location" v-model="city" @keypress.enter="searchCity">
        <button class=" bg-blue-700 flex-grow" @click="searchCity" >Search</button>
      </div>

      <div class="flex flex-col gap-3">
        <div v-for="country in countryHistory" :key="country" class="w-full border-2 border-transparent transition-colors hover:border-gray-500 px-2 py-3" @click="clickHistory(country)">
          <span>{{country}}</span>
        </div>
      </div>
    </div>
        
</template>

<script>

import { XIcon, SunIcon, MoonIcon } from '@heroicons/vue/solid'
export default {
  emits: ["change","search"],
  components:{
    XIcon,
    SunIcon, 
    MoonIcon
  },
  props:{
    dark:{
      type:Boolean,
      required:true
    }
  },
  data(){
    return{
      menuOpen:false,
      city:"",
      countryHistory:["London","Mexico"]
    }
  },
  methods:{  
    changeMenuOpen(){
      this.menuOpen = !this.menuOpen
    },
    clickHistory(country){
      this.city = country
      this.menuOpen = false
      this.$emit('search',this.city)
    },
    searchCity(){
      this.countryHistory = [this.city,...this.countryHistory]
      localStorage.setItem("History", JSON.stringify(this.countryHistory));
      this.menuOpen = false
      this.$emit('search',this.city)
    }
  },
  computed:{
    isOpen(){
      return this.menuOpen ? "left-0" : "-left-full"
    }
  },
  mounted() {
    if (localStorage.countryHistory) {
      this.countryHistory = JSON.parse(localStorage.getItem("History"));
    }
  },

}
</script>

<style>

</style>