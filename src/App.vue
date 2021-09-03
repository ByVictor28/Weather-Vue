<template>
  <div class="w-screen min-h-screen" :class="theme">
    <div class="grid grid-cols-12 bg-red-900 min-h-screen">
      <!-- SIDE BAR -->
      <div side-var class="h-full w-full px-10 col-span-12 md:col-span-4 lg:col-span-3 bg-indigo-200 dark:bg-gray-800 flex flex-col">
        <Navbar @change="changeTheme" :dark="themeDark" @search="changeCity"/>

        <!-- CONTENT -->
        <spin v-if="loading"/>
        <div v-else-if="!loading && weather" class="w-full h-2/3 flex-grow flex flex-col justify-around items-center text-gray-900 dark:text-gray-400">
          <img class="h-32 w-32" :src="image" alt="whater icon">
          <h3 class=" text-7xl font-semibold">{{weather.current.temp}}<span class=" text-4xl">°{{units}}</span></h3>
          <span class=" font-medium text-2xl">{{weather.current.description}}</span>
          <div class="flex flex-col justify-center items-center gap-6">            
            <span class="block">Today - {{date}}</span>
            <span> <LocationMarkerIcon class="h-5 w-5  inline-block"/>{{weather.current.place}}</span>
          </div>
        </div>

      </div>

      <!-- CONTENT -->
      <div content class="bg-indigo-50 dark:bg-gray-900 col-span-12 md:col-span-8 lg:col-span-9 border-2 border-black p-8 text text-gray-900 dark:text-gray-400">
        <!-- header -->
        <div class="w-full flex justify-end mb-4 text-gray-900 dark:text-gray-400">
          <button @click="changeUnits('C')" class="bg-gray-700 dark:bg-gray-300 w-10 h-10 rounded-full">°C</button>
          <button @click="changeUnits('F')" class="bg-gray-700 dark:bg-gray-300 w-10 h-10 rounded-full mx-4">°F</button>
          {{units}}
        </div>
        <!-- LIST WEATHER -->
        <spin v-if="loading"/>
        <div v-else-if="!loading && weather" class="flex gap-5 justify-around flex-wrap mb-6"> 
          <Card v-for="item in  weather.daily" :key="item" :dayWeather="item" :unit="units"></Card>
        </div>

        <!-- HIGHLIGHTS -->
        <h3 v-if="!loading">Today's highlights</h3>
        <spin v-if="loading"/>
        <div v-else-if="!loading && !weather">
          <h3 class=" font-bold text-6xl">There is no data to show</h3>
        </div>
        <div v-else-if="!loading && weather" class="flex gap-5 justify-around flex-wrap mt-2">
          
          <div class="flex flex-col justify-around gap-2 items-center w-48 py-6 bg-indigo-200 dark:bg-gray-800">
            <span>Wind status</span>
            <p>{{weather.Hightlights.wind.pressure}} <span>{{units==="F"?"mpm":"m/s"}}</span></p>
            <div class="p-4">
              <ArrowNarrowUpIcon class="h-5 w-5 inline-block bg-indigo-100 dark:bg-gray-900 rounded-full" :style="style"/><span>WSW</span>
            </div>
          </div>
          <div class="flex flex-col justify-around gap-2 items-center w-48 py-6 px-2 bg-indigo-200 dark:bg-gray-800">
            <span>Humidity</span>
            <p>{{weather.Hightlights.humidity}} <span>%</span></p>
            <div class="w-full bg-red-400 h-2 relative">
              <div class="bg-green-200 h-2 absolute top-0 left-0" :style="percentage">
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-around gap-2 items-center w-48 py-6 bg-indigo-200 dark:bg-gray-800">
            <span>Visibility</span>
            <p>{{weather.Hightlights.visibility}} <span>miles</span></p>
          </div>
          <div class="flex flex-col justify-around gap-2 items-center w-48 py-6 bg-indigo-200 dark:bg-gray-800">
            <span>Air Pressure</span>
            <p>{{weather.Hightlights.pressure}} <span>mph</span></p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { LocationMarkerIcon,ArrowNarrowUpIcon } from '@heroicons/vue/solid'
import Card from './components/Card.vue'
import Navbar from "./components/Navbar.vue"
import {weatherByCity} from './api/Api'
import Spin from './components/Spin.vue'
export default {
  name: 'App',
  components: {
    LocationMarkerIcon,
    ArrowNarrowUpIcon,
    Card,
    Navbar,
    Spin,
  },
  data(){
    return {
      themeDark:true,
      weather:null,
      loading:true,
      units:"C",
      city:"London"
    }
  },
  computed:{
    theme(){
      return this.themeDark ? "dark" : "light"
    },
    image(){
      return `https://openweathermap.org/img/wn/${this.weather.current.icon}@2x.png`
    },
    date(){
      const weatherDate = new Date()
      return weatherDate.toDateString()
    },
    style () {
      return { transform: 'rotate(-' + this.weather.Hightlights.wind.deg + 'deg)'}
    },
    percentage(){
      return { width: `${this.weather.Hightlights.humidity}%` }
    }
  },
  methods:{
    async getWeather(){
      this.loading = true
      this.weather =await weatherByCity(this.city,this.units)
      this.loading = false
    },
    changeTheme(){
      this.themeDark =  !this.themeDark
    },
    changeCity(city){
      this.city = city
      this.getWeather()
    },
    changeUnits(unit){
      this.units = unit
      this.getWeather()
    }
  },
  created(){
    this.getWeather(this.city)
  }
}
</script>

<style>
</style>
