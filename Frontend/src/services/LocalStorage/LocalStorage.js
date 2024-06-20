const storeToken = (value) => {
    if (value) {
      // console.log("Store Token")
      console.log(value)
      localStorage.setItem('access_token', value)
    }
  }
  
  const getToken = () => {
    const access_token = localStorage.getItem('access_token')
    return access_token
  }
  
  const removeToken = () => {
    localStorage.removeItem('access_token')
  }
  
  export { storeToken, getToken, removeToken }