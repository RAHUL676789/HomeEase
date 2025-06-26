// import PartnerFeatures from "../components/PartnerFeatures";
// import PartnerForm from "../components/PartnerForm";
import { useState } from "react";
import PartnerFeatures from "../Components/Parterner/PartnerFeature";
import PartnerForm from "../Components/Parterner/PartnerForm";
import PartnerForm2 from "../Components/Parterner/PartnerForm2";
import Preview from "../Components/Parterner/Preview";

const BecomePartner = () => {
  const TotalStep = 2;
  const [step, setstep] = useState(0);
  const [preview, setpreview] = useState({});


  const handlePreviData = (data)=>{
    console.log(data);
    console.log(preview);
          setpreview((prev)=>{
            return {
              ...prev,
              ...data
            }
          });
          nextStep();
       
  }

  const nextStep = ()=>{
     if(step !== TotalStep){
        setstep((prev)=>prev + 1);
     }
  }

  const prevStep = ()=>{
    if(step == 1){
       setstep((prev)=>prev - 1);
    }
  }

  const onCancel = ()=>{
    setstep(0);

  }

  const handlePreviewSubmit = () =>{
    console.log("api backedn call")
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-4 text-teal-700">
        Become a Service Partner
      </h1>
      <p className="text-center text-lg text-gray-600 mb-10">
        Join EaseHome to earn more, work flexible hours, and grow your customer base.
      </p>

      <PartnerFeatures />
      <div className="mt-12">
         
          {step === 0 && <PartnerForm handlePreviData = {handlePreviData} />}
         { step === 1 && <PartnerForm2 handlePreviData={handlePreviData} prevStep={prevStep}/>}
         {step === TotalStep && <Preview data={preview} onCancel={onCancel} submit = {handlePreviewSubmit}/>}
         
      </div>
    </div>
  );
};

export default BecomePartner;
