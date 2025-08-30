import { useEffect } from 'react'
import { useForm } from "react-hook-form"

const EditService = ({ service, close, handleServiceUpdate }) => {
  const divClass = "flex flex-col gap-1"
  const inputClass = `px-4 py-3 border border-gray-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-500`
  const labelClass = `text-gray-800 font-medium text-sm`
  const errorClass = "text-red-600 font-semibold text-sm"
  const daysOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: service?.title || "",
      description: service?.description || "",
      price: service?.price || "",
      duration: service?.duration || "",
      discount: service?.discount || "",
      availableDays: service?.availableDays || [],
      location: service?.location || "",
    }
  });

  // 🔄 Update form when service prop changes
  useEffect(() => {
    if (service) {
      reset({
        title: service.title || "",
        description: service.description || "",
        price: service.price || "",
        duration: service.duration || "",
        discount: service.discount || 0,
        availableDays: service.availableDays || [],
        location: service.location || "",
      });
    }
  }, [service, reset]);


  const onSubmit = (data) => {
  const payload = { ...data, id: service._id }; 
  handleServiceUpdate(payload);
};

  return (
    <div className="h-screen w-screen bg-black/20 fixed inset-0 z-50">
      <div className="w-full overflow-y-scroll md:w-[75%] bg-white h-screen mx-auto rounded">
        
        {/* Header */}
        <div className="sticky top-0 border-b border-b-gray-300 py-2 px-4 w-full bg-white flex justify-between items-center">
          <h1 className="text-lg font-semibold">Edit Service</h1>
          <i onClick={close} className="ri-close-line cursor-pointer text-xl"></i>
        </div>

        {/* Body */}
        <div className="py-5 px-4 mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

            {/* Title */}
            <div className={divClass}>
              <label className={labelClass}>Title</label>
              <input
                {...register("title", {
                  required: "service title required",
                  minLength: { value: 3, message: "title should be at least 3 characters" },
                  maxLength: { value: 20, message: "title should be less than 20 characters" }
                })}
                type="text"
                className={inputClass}
              />
              {errors.title && <p className={errorClass}>{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className={divClass}>
              <label className={labelClass}>Description</label>
              <textarea
                {...register("description", {
                  required: "description is required",
                  minLength: { value: 10, message: "min length is 10" }
                })}
                className={inputClass}
              />
              {errors.description && <p className={errorClass}>{errors.description.message}</p>}
            </div>

            {/* Price */}
            <div className={divClass}>
              <label className={labelClass}>Price</label>
              <input
                {...register("price", {
                  required: "price is required",
                  min: { value: 0, message: "price should be valid" }
                })}
                type="number"
                className={inputClass}
              />
              {errors.price && <p className={errorClass}>{errors.price.message}</p>}
            </div>

            {/* Duration */}
            <div className={divClass}>
              <label className={labelClass}>Duration</label>
              <select
                {...register("duration", { required: "service duration is required" })}
                className={inputClass}
              >
                <option value="">Choose duration</option>
                <option value="1hour">1 hour</option>
                <option value="3hour">3 hours</option>
                <option value="half-Day">Half day</option>
                <option value="full-Day">Full day</option>
                <option value="other">Other</option>
              </select>
              {errors.duration && <p className={errorClass}>{errors.duration.message}</p>}
            </div>

            {/* Discount */}
            <div className={divClass}>
              <label className={labelClass}>Discount (%)</label>
              <input
                {...register("discount", {
                  min: { value: 0, message: "min discount is 0" },
                  max: { value: 100, message: "max discount is 100" }
                })}
                type="number"
                className={inputClass}
              />
              {errors.discount && <p className={errorClass}>{errors.discount.message}</p>}
            </div>

            {/* Available Days */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Available Days *</label>
              <div className="flex flex-wrap gap-3">
                {daysOptions.map((day, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm capitalize">
                    <input
                      type="checkbox"
                      {...register("availableDays", {
                        required: "please select at least one day"
                      })}
                      value={day}
                      className="accent-teal-500"
                    />
                    {day}
                  </label>
                ))}
              </div>
              {errors.availableDays && <p className={errorClass}>{errors.availableDays.message}</p>}
            </div>

            {/* Location */}
            <div className={divClass}>
              <label className={labelClass}>Location</label>
              <input
                {...register("location", { required: "location is required" })}
                type="text"
                className={inputClass}
              />
              {errors.location && <p className={errorClass}>{errors.location.message}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-between px-4 py-2 mb-3">
              <button
                type="button"
                onClick={close}
                className="px-5 py-1 rounded-3xl font-semibold bg-gray-300 cursor-pointer active:translate-y-0.5"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-1 rounded-3xl font-semibold bg-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-150 cursor-pointer active:-translate-y-0.5"
              >
                Apply Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditService
