import axios from 'axios'

const baseUrl='http://118.195.166.188:8083'
export default function (url,method='GET',param) {
  method=method.toUpperCase()
  if(method==='GET'){
    let str=''
    if(param instanceof Object){
      str='?'
      Object.keys(param).map(item=>{
        str+=item+'='+param[item]+'&'
      })
      str=str.slice(0,str.length-1)
    }else {
      str=`/${param}`
    }
    url+=str
    return axios.get(baseUrl+url)
  }else if(method==='POST'){
    return axios.post(baseUrl+url,param)
  }else if(method==='GET&POST'){
    let str = '/'+param.id
    url+=str
    delete param.id
    return axios.post(baseUrl+url,param)
  }
}
