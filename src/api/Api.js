import axios from "axios";

const ApiWeather = axios.create({
  baseURL: 'https://weathernod.herokuapp.com',
});

export const weatherByCity =async (city) =>{
  try{
    const {data} =  await ApiWeather.get(`/city?city=${city}&units=metric`)
    console.log(data)
    return data

  }catch(error){
    return null
  }
  
}

export default ApiWeather