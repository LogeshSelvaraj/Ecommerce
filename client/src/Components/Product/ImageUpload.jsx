import React,{useState} from 'react'
import {CircularProgress} from '@material-ui/core'
import {Avatar,Badge} from 'antd'
import  Resizer from "react-image-file-resizer"
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ImageUpload = ({images,setImages}) => {
    const {user}=useSelector((state)=>({...state}))
    const [imageLoading, SetImageLoading] = useState(false);

    const addImages = (e) => {
        SetImageLoading(true)
        const files=e.target.files
          for(let i=0;i<files.length;i++){
            Resizer.imageFileResizer(files[i],728,728,"JPEG",100,0,uri =>{
                axios.post(`${process.env.REACT_APP_BACKEND_API_DOMAIN}/product-image`,{image:uri},{
                headers:{
                     token: user ? user.token : ""
                }
              }).then(res=>{
                setImages(prev=>[...prev,res.data])
                SetImageLoading(false)
              }).catch(()=>
              {
                SetImageLoading(false)  
                console.log("cloudinary image upload error")
            }
              )
            },
            "base64")
          }
      };
    
      const removeImage=(public_id)=>{
    
          axios.post(`${process.env.REACT_APP_BACKEND_API_DOMAIN}/product-image-remove`,{public_id},
          {
            headers:{
                 token: user ? user.token : ""
            }
          }).then(()=>{
            const remainingImages= images.filter((img)=>{
              return img.public_id !==public_id
            })
           setImages(remainingImages)
          }).catch(()=>{
            toast.error("Image removal failed")
          })
      }




    return (
        <div className="form-group">
        {images&& images.map(image=>{
          return <Badge count={"X"} key={image.public_id} style={{cursor:"pointer"}} onClick={()=>removeImage(image.public_id)}
          style={{marginRight:"40px"}}
          ><Avatar style={{marginRight:"40px"}}  size={100}  shape="square" src={image.url}/></Badge>
        })}
        <br/>
        <label className="btn   btn-dark mt-3">{imageLoading ? <CircularProgress size={20}/>:`Images`}
          <input
            className="form-control w-50"
            id="input"
            multiple
            hidden
            accept=".jpeg, .png, .jpg"
            onChange={addImages}
            type="file"
          />
          </label>
        </div>
    )
}

export default ImageUpload
