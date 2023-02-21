import { useState,useEffect } from 'react'
import axios from 'axios';
import './App.css'



function App() {
  const [imageList, setImageList] = useState([])
  const [pageNo,setPageNo] = useState(1);
  const [imageIndex,setImageIndex] = useState(null);

  useEffect(() => {
    const helper = async () => {
      const {data}=await axios.get('https://picsum.photos/v2/list',{params: {page:pageNo ,limit:20 }})
      console.log(data);
      setImageList(data);
    }
    helper();
  },[pageNo])
  const backButton = (pageNo==1)?true:false;
  
  const onImageClick = (index) => {
    if(imageIndex===null){
      setImageIndex(index);
    }
    else{
      setImageIndex(null);
    }
  }

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <div className="container">
      {imageList.map((image,index) => {
        return (
          <div className={imageIndex === index ? 'fullscreen box' : 'box'} key="index" onClick={() => onImageClick(index)}>
          <img src={image.download_url} />
          </div>
        )
      })}
      </div>
      <div className="btn-group">
      <button disabled={backButton} onClick={() => setPageNo(pageNo-1)}>Back</button>
      <button onClick={() => setPageNo(pageNo+1)}>Next</button>
      </div>
      
    </div>
  )
}

export default App
