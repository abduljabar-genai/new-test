const {fetch:originalFetch}=window
import { useAuth } from "../context/AuthContext"
window.fetch=async (...args)=>
{

 const {login}=useAuth()
  const {resource,config}=args

  const response=await originalFetch(resource,config)

  if(response.status==401)
  {
    const response=await originalFetch('/refresh',config)
    if(response.ok)
    {
           login(response.token)
           config.headers.Authorization=token
        response=await originalFetch(resource,config)

           if(!response.ok)
           {
           throw new Error("")
           }
    }


  }

  return response

}