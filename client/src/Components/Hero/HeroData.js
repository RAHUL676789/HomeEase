import CarWash from "../../assets/CarWash.svg";
import HardWare from "../../assets/computer.svg";
import Beautician from "../../assets/Beauty.svg";
import Cleaning from "../../assets/Cleaning.svg";
import Electrician from "../../assets/Electrician.svg";
import Plumber from "../../assets/Tech.svg";

const heroData = [
  {
    id: 1,
    title: "Professional Home Cleaning Services",
    desc: "Experience spotless living with expert cleaners equipped with modern tools. Book your hygienic space today!",
    img: Cleaning,
    btnText: "Schedule Cleaning",
    category:"cleaning"
  },
  {
    id: 2,
    title: "Reliable Plumbing, On Time Every Time",
    desc: "From leaky taps to pipe installations — get skilled plumbers at your doorstep in minutes.",
    img: Plumber,
    btnText: "Book a Plumber",
    category:"plumber"
  },
  {
    id: 3,
    title: "Certified Electricians for Safe Repairs",
    desc: "We offer quick and safe electrical fixes, installations, and maintenance from verified professionals.",
    img: Electrician,
    btnText: "Get Electric Help",
    category:"electrician"
  },
  {
    id: 4,
    title: "Salon-Style Beauty at Home",
    desc: "Enjoy professional beautician services from the comfort of your home. Flexible and affordable packages.",
    img: Beautician,
    btnText: "Book Beautician",
    category:"Beautician"
  },
  {
    id: 5,
    title: "AC Repair & Maintenance You Can Trust",
    desc: "Beat the heat with timely AC servicing, gas refill, and installation — done by trained experts.",
    img: HardWare,
    btnText: "Fix My AC",
    category:"maintenance"
    

  },
  {
    id: 6,
    title: "Hassle-Free Car Wash at Your Location",
    desc: "Book eco-friendly and professional car cleaning — exterior and interior — from your phone.",
    img: CarWash,
    btnText: "Wash My Car",
    category:"Car-Wash"

  },
];

export default heroData;
