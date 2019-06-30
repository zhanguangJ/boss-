import axios from 'axios'
export default function ajax(url,date={},type="GET"){
    if(type === 'GET'){
        let paramStr = '';
        Object.keys(date).forEach(key =>{
            paramStr += key + '=' + date[key] +'&'
        })
        if(paramStr){
            paramStr = paramStr.substring(0,paramStr.length-1)
        }
        //使用axios发送请求
        return axios.get(url + '?' + paramStr)
    }else{
        return axios.post(url,date)
    }
}