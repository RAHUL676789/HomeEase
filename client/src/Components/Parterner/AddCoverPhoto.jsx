import  { useEffect, useState ,useRef} from 'react';
import cover1 from "../../assets/cover1.jpg";
import cover2 from "../../assets/cover2.jpg";
import cover3 from "../../assets/cover3.jpg";
import cover4 from "../../assets/cover4.jpg";
import cover5 from "../../assets/cover5.jpg";
import cover6 from "../../assets/cover6.jpg";
import cover7 from "../../assets/cover7.jpg";
import axios from "../../utils/axios/axiosinstance.js"
import { useSelector,useDispatch } from "react-redux"
import { setPartner } from '../../redux/partnerSlice.js';
import Loader from '../Other/Loader.jsx';
import { uploadFile } from '../../utils/cloudinary/uploadFile.js';
import { useEditableImage } from '../../Hooks/useEditableImage.js';


const AddCoverPhoto = ({ handleAddCoverPhoto,handleSetToast,handleNextEditCoverPhoto ,backImage,updateField}) => {
    const ImageCovers = [cover1, cover2, cover3, cover4, cover5, cover6, cover7];
    const [checkboxBg, setcheckboxBg] = useState("");
    const [loadedImages, setLoadedImages] = useState(Array(ImageCovers.length).fill(false));
    const [coverPhoto, setcoverPhoto] = useState(null);
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const [pid, setpid] = useState("")
    const coverPhotoFileRef = useRef()
   

    useEffect(() => {
        const body = document.querySelector("body");
        body.style.overflow = 'hidden';
        return () => {
            body.style.overflow = "auto";
        };
    }, []);

    const handleImageLoad = (index) => {
        setLoadedImages(prev => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });
    };

    const partner = useSelector((state) => state.partner)
//    const {backImage,updateField} = useEditableImage();


    // const handleNextEditCoverPhoto = ()=>{

    // }
   
    const handleApply = async () => {
        setisLoading(true);
        if (!coverPhoto) {
             handleSetToast("error","coverPhoto required");
             setisLoading(false);
            return;
        }
        
        try {
            const response = await axios.put(`/api/partner/${partner?.partner?._id}`, { backGroundImage: {
                url:coverPhoto,
                pid:pid
            } });
            console.log(response);
            dispatch(setPartner(response.data.data))
            setisLoading(false);
            handleAddCoverPhoto();
            handleSetToast("success",response.data.message)

        } catch (error) {
            handleSetToast("error",error.message || "someting went wrong");
            setisLoading(false);
        }

    }

    const hanldeInputChangeFile = async(e)=>{
        setisLoading(true);
        try {
            const response = await uploadFile(e.target.files[0]);
            console.log(response);
            setisLoading(false);
        } catch (error) {
            console.log(error);
            setisLoading(false);
        }
    }

  const handlePicClick = (item) => {
  if (checkboxBg === item) {
    setcheckboxBg("");
    updateField("url", "");
  } else {
    setcheckboxBg(item);
    updateField("url", item);
  }
};

    return (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/10 z-50'>
            {isLoading && <Loader/>}
          
            <div className='md:w-[75%] mx-auto h-screen overflow-y-scroll bg-white shadow-md shadow-gray-500 rounded-lg pb-6'>
                <div className='flex justify-between border-b sticky top-0 left-0 border-b-gray-300 py-2 px-5 bg-white z-50'>
                    <h2 className='text-2xl font-semibold'>Add Cover Photo</h2>
                    <i onClick={() => handleAddCoverPhoto()} className='ri-close-line text-3xl cursor-pointer'></i>
                </div>

                <div className='px-5'>
                    <input onChange={hanldeInputChangeFile} ref={coverPhotoFileRef} type="file"  className='hidden'/>
                    <h2 className='font-semibold text-2xl my-0.5'>Upload a photo</h2>
                    <p className='opacity-70 text-lg mb-2'>Showcase your interest, work or top moments</p>
                    <button onClick={()=>coverPhotoFileRef.current.click()}  className='border rounded-3xl px-3 py-1 hover:border-2 transition-all duration-150 mb-3'>Upload Photo</button>
                </div>

                <div className='px-3 border-b border-b-gray-500 pb-6 mb-4'>
                    <h2 className='text-xl font-medium mb-4'>Choose an image</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-5 '>
                        {
                            ImageCovers.map((item, i) => (
                                <div key={i} className='flex justify-center items-center gap-2'>
                                    <label htmlFor={`cover-${i}`} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            id={`cover-${i}`}
                                            type='checkbox'
                                            className='accent-teal-600 hidden'
                                            checked={item}
                                            onChange={() => setcoverPhoto(item)}
                                        />
                                        <div onClick={() =>handlePicClick(item)} className={`h-6.5 w-6.5 border rounded-full flex ${checkboxBg === item ? "bg-rose-600" : ""} justify-center items-center`}>
                                            {checkboxBg === item &&
                                                <span className='h-3.5 w-3.5 bg-white border rounded-full'></span>
                                            }
                                        </div>
                                        <div className='h-32 w-72 rounded overflow-hidden'>
                                            {!loadedImages[i] && (
                                                <div className="h-full w-full bg-gray-300 animate-pulse rounded"></div>
                                            )}
                                            <img
                                                src={item}
                                                alt={`cover-${i}`}
                                                className={`h-32 w-72 object-cover rounded transition-opacity duration-300 ${loadedImages[i] ? 'opacity-100' : 'opacity-0'} `}
                                                onLoad={() => handleImageLoad(i)}
                                            />
                                        </div>
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>

               { backImage?.url &&  <div className='ml-auto flex justify-end'>
                    <button onClick={()=>handleNextEditCoverPhoto()}  className='border bg-blue-600 px-7 py-1.5 rounded-3xl font-semibold text-white cursor-pointer'>Next</button>
                </div> }
            </div>
        </div>
    );
};

export default AddCoverPhoto;
