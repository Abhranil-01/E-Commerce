import React from 'react'
import './loader.scss'

function Loader() {
  return (
    <div className='position-fixed  vw-100 vh-100  d-flex align-items-center justify-content-center bg-white ' style={{zIndex:"999",top:"80px"}}  >
    
      <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
    </div>
  )
}

export default Loader
