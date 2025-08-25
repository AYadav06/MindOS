import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const UseContent = () => {
    const [contents,setContents]=useState([]);

    function ContentData(){
        axios.get('http://localhost:3000/api/v1/content',{
            headers:{
                 "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            if (response.data.content) {
                setContents(response.data.content)
            }
        })
        .catch(error => {
            console.error("Error fetching content:", error);
            setContents([]);
        })
    }
 useEffect(()=>{
    ContentData()
    let interval=setInterval(()=>{
        ContentData()

    },10 * 1000)
    return () =>{
        clearInterval(interval)
    }
 },[])


  return {contents,ContentData}
}
