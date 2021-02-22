export const userState=(props) =>{
    return({
        type:"LOGIN_USER",
        payload:{
            email:props.email,
            token:props.token
        }
    })
}

export const userSidebarLinks=()=>{
    return({
        type:"LOGINAS_USER"
    })
}

export const adminSidebarLinks = () => {
  return {
    type: "LOGINAS_ADMIN",
  };
};