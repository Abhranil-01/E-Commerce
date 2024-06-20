import React from 'react'
import LogoBar from '../../Components/Logo/LogoBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddressForm from '../../Components/AddressForm/AddressForm'

function CheckOutPage() {
  return (
    <>
           <LogoBar />
          
           <div className="container-fluid my-5">
            <div className="row">
              <div className="col-md-9 col-11 mx-auto p-0">
            
         
                 
             <div className='bg-primary col  py-2 d-flex justify-content-between align-items-center  '>
             <h4 className="text-white ms-3 ">Delivery Address</h4>
             <button className='btn text-white fw-bold border-0 '><span className='me-1'><FontAwesomeIcon icon={faPlus}/></span>Add Address</button>
             </div>
              

           
             
               
              </div>
            </div>
          </div>
    </>
  )
}

export default CheckOutPage
