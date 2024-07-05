import React, { useEffect, useState } from 'react'
import CatagoryCard from '../../Components/Catagory Card/CatagoryCard'
import { NavLink } from 'react-router-dom'
import { useGetCategoriesQuery } from '../../services/FetchData/fetchData'
import { useDispatch, useSelector } from 'react-redux'
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAlert, setLogout } from '../../services/UserauthSlice/UserauthSlice'
import AutoSlider from '../../Components/AutoSlider/AutoSlider'
import LazyLoad from 'react-lazy-load'

function Home() {
  const dispatch=useDispatch()
  const { data, isError, isLoading } = useGetCategoriesQuery({params:"?populate=*"})
const [loader,setLoader]=useState(false)
const loginAlert=useSelector((state)=>state.userInfo.loginAlert)
const logOutAlert=useSelector((state)=>state.userInfo.logOutAlert)
useEffect(()=>{
  if(loginAlert){
toast.success("Welcome to D-Sport")
  }
  dispatch(setAlert(false))
},[loginAlert])
useEffect(()=>{
  if(logOutAlert){
    toast.success("Thank You")
      }
      dispatch(setLogout(false))
},[logOutAlert])
console.log(data);
  if (isLoading) {
    return <div className='container-fluid 'style={{margin:"70px 0px"}}>
           <div className="row my-5">
        <div className="col-12 text-center">
          <h2>Explore Sports Items</h2>
        </div>
      </div>
    </div>
  }

  return (
    <>
{/* <Loader/> */}
      <div className="container-fluid " style={{margin:"70px 0px"}}>

      <div className="row my-5">
        <div className="col-12 text-center">
          <h2>Explore Sports Items</h2>
        </div>
      </div>
        <div className="row row-cols-1 row-cols-md-2 g-4 ">
          {data && data.data.map((element) => (
            <LazyLoad>
               <CatagoryCard key={element.id} id={element.id} title={element.attributes.title} image={element.attributes.image.data.attributes.url}  />
            </LazyLoad>
           
          ))}
        </div>
      
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}

export default Home
