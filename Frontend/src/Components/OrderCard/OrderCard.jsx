import React, { useState } from 'react'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetSingleProductDataQuery } from '../../services/FetchData/fetchData';
import OrderDetails from '../../Pages/OrderDetails/OrderDetails';

function OrderCard({element,id}) {
    console.log(element);
    const [isOpen,setIsOpen]=useState(false)
    const [singleOrderId,setSingleOrderId]=useState("")
    const {data}=useGetSingleProductDataQuery(element.productId)
    console.log(data);
  return (
    <>
    {isOpen &&  <OrderDetails close={()=>setIsOpen(false)} id={singleOrderId}/>}
   
    {data && data.data && data.data.attributes &&(
        <div className="col-12">
        <div
          class="card mb-3 border-0 rounded-0"
          style={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              cursor: "pointer"
          }}
          onClick={()=>{setIsOpen(true);
            setSingleOrderId(id)
           }}
        >
          <div class="row g-0">
            <div class="col-4 col-md-2 ">
              <img src={`${data.data.attributes.image.data[0].attributes.url}`} class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-8 col-md-10">
              <div class="card-body position-relative  ">
                <h5 class="card-title">{data.data.attributes.title}</h5>
                <p class="card-text">
                {data.data.attributes.titleOne.slice(0,25)}...
                </p>
                <div className="d-none d-md-flex gap-5  ">
                {element.size.length!==0 &&(<p className="card-text">Size:{element.size}</p>) }
                
                  <p className="card-text">Qty : {element.qty}</p>
                  <p className="card-text">Price :₹{element.price}</p>
                  
                </div>
                <p className="card-text fw-bold ">{element.cancel ? (<span className='text-danger'>Order Canceled</span>):(<span className='text-primary'>Order Successfull</span>)}</p>
               <span className="position-absolute " style={{right:"3%",top:"48%"}} ><FontAwesomeIcon icon={faChevronRight} /></span>
              </div>
            </div>
          </div>
        </div>
      </div>)}
       
    </>
  )
}

export default OrderCard
