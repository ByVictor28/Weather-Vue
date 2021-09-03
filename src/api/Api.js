import axios from "axios";

const ApiWeather = axios.create({
  baseURL: 'https://weathernod.herokuapp.com',
});

export const weatherByCity =async (city,units) =>{
  try{
    const {data} =  await ApiWeather.get(`/city?city=${city}&units=${units==="C"?"metric":"imperial"}`)
    console.log(data)
    return data

  }catch(error){
    return null
  }
  
}

export default ApiWeather