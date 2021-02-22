import React,{useState} from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import  {useHistory} from "react-router-dom"

const RatingModal = ({children}) => {
    const [modalVisible,setModalVisible]=useState(false)
    const {user}=useSelector(state=>({...state}))
    const history=useHistory()

    const loginCheck=()=>{
      if(user){
        setModalVisible(true)
      }else{
          history.push({
            pathname:"/login",
            state:{from:window.location.pathname}
          })
      }
      
    }

    return (
        <>
                <div className="mt-3"></div>
                  <i onClick={loginCheck}>
                    <span className="d-block btn btn-primary w-75 m-auto">
                      <i className="fa fa-star "></i>{" "}{user? "Leave Rating": "Login to leave rating"} 
                    </span>
                  </i>
                  <Modal
                  title="Leave your rating"
                  centered
                    visible={modalVisible}
                    onOk={()=>
                    {setModalVisible(false)
                    toast.success("Thank for your feedback")
                    }}
                    onCancel={()=>setModalVisible(false)}
                  >
                    {children}
                  </Modal>
        </>
    )
}

export default RatingModal
