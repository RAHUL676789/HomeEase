const PartnerFeatures = () => {
  const features = [
    {
      title: "Easy Registration",
      desc: "Quick signup with mobile & ID verification.",
    },
    {
      title: "Verified Leads Daily",
      desc: "Jobs from genuine customers near you.",
    },
    {
      title: "Timely Payments",
      desc: "Weekly payouts directly to your bank.",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
          <p className="text-gray-600">{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default PartnerFeatures;
