// import PartnerFeatures from "../components/PartnerFeatures";
// import PartnerForm from "../components/PartnerForm";
import PartnerFeatures from "../Components/Parterner/PartnerFeature";
import PartnerForm from "../Components/Parterner/PartnerForm";
import PartnerForm2 from "../Components/Parterner/PartnerForm2";

const BecomePartner = () => {
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
        <PartnerForm2 />
      </div>
    </div>
  );
};

export default BecomePartner;
