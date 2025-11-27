require("dotenv").config();
const mongoose = require("mongoose");
const serviceSchema = require("../models/serviceSchema.js");
const adminSchema = require("../models/adminSchema.js");
const bcrypt = require("bcrypt")

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/HomeEase")

}

main().then((res) => console.log("connect")).catch((e) => console.log(e))

const demoServices = [
  {
    title: "Basic Plumbing Fix",
    description: "Repair leaking taps, clogged sinks, and minor pipe issues.",
    price: 500,
    category: "plumbing",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Bhopal, Madhya Pradesh",
    availableDays: ["Monday", "Wednesday", "Friday"],
    duration: "1 hour",
    discount: 10,
    isActive: true,
    tags: ["pipes", "tap", "kitchen"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Electrical Wiring Check",
    description: "Inspection and fixing of electrical wiring and circuits.",
    price: 800,
    category: "electrical",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Indore, Madhya Pradesh",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    duration: "2 hours",
    discount: 5,
    isActive: true,
    tags: ["wires", "electricity", "safety"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Deep Home Cleaning",
    description: "Full house cleaning including floors, windows, and bathrooms.",
    price: 2500,
    category: "cleaning",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Delhi, India",
    availableDays: ["Saturday", "Sunday"],
    duration: "5 hours",
    discount: 20,
    isActive: true,
    tags: ["deep clean", "hygiene", "home"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "AC Repair Service",
    description: "Air conditioner inspection, cleaning, and minor repairs.",
    price: 1200,
    category: "repair",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Mumbai, Maharashtra",
    availableDays: ["Monday", "Tuesday"],
    duration: "3 hours",
    discount: 15,
    isActive: true,
    tags: ["cooling", "AC", "maintenance"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Bridal Makeup",
    description: "Professional bridal makeup with premium products.",
    price: 5000,
    category: "beauty",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Jaipur, Rajasthan",
    availableDays: ["Friday", "Saturday", "Sunday"],
    duration: "4 hours",
    discount: 25,
    isActive: true,
    tags: ["makeup", "wedding", "beauty"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Pipe Replacement",
    description: "Replacement of damaged water and sewage pipes.",
    price: 1500,
    category: "plumbing",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Lucknow, Uttar Pradesh",
    availableDays: ["Monday", "Thursday"],
    duration: "2 hours",
    discount: 8,
    isActive: true,
    tags: ["pipe", "repair", "water"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Fan & Light Installation",
    description: "Install or replace ceiling fans and lights.",
    price: 600,
    category: "electrical",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Pune, Maharashtra",
    availableDays: ["Wednesday", "Saturday"],
    duration: "1.5 hours",
    discount: 12,
    isActive: true,
    tags: ["installation", "fan", "light"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Sofa & Carpet Cleaning",
    description: "Steam cleaning and deep sanitization of upholstery.",
    price: 1800,
    category: "cleaning",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Hyderabad, Telangana",
    availableDays: ["Sunday"],
    duration: "3 hours",
    discount: 18,
    isActive: true,
    tags: ["sofa", "carpet", "clean"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Refrigerator Repair",
    description: "Fix cooling issues, gas refill, and minor component repairs.",
    price: 1400,
    category: "repair",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Chennai, Tamil Nadu",
    availableDays: ["Tuesday", "Friday"],
    duration: "2.5 hours",
    discount: 10,
    isActive: true,
    tags: ["fridge", "cooling", "repair"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Party Makeup",
    description: "Get styled for parties with professional beauty service.",
    price: 2000,
    category: "beauty",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Bhopal, Madhya Pradesh",
    availableDays: ["Saturday"],
    duration: "2 hours",
    discount: 20,
    isActive: true,
    tags: ["makeup", "party", "beauty"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Bathroom Fitting",
    description: "Installation and repair of bathroom fittings and accessories.",
    price: 1000,
    category: "plumbing",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Kolkata, West Bengal",
    availableDays: ["Thursday"],
    duration: "2 hours",
    discount: 15,
    isActive: true,
    tags: ["bathroom", "tap", "shower"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Inverter Repair",
    description: "Fix inverter not charging, wiring faults, and battery issues.",
    price: 1300,
    category: "electrical",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Nagpur, Maharashtra",
    availableDays: ["Monday", "Friday"],
    duration: "2 hours",
    discount: 10,
    isActive: true,
    tags: ["inverter", "battery", "repair"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Kitchen Cleaning",
    description: "Deep cleaning of chimney, gas stove, and kitchen tiles.",
    price: 900,
    category: "cleaning",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Delhi, India",
    availableDays: ["Tuesday"],
    duration: "2 hours",
    discount: 5,
    isActive: true,
    tags: ["kitchen", "chimney", "tiles"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Laptop Repair",
    description: "Fix software issues, hardware replacements, and cleaning.",
    price: 2000,
    category: "repair",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Bangalore, Karnataka",
    availableDays: ["Wednesday", "Saturday"],
    duration: "4 hours",
    discount: 12,
    isActive: true,
    tags: ["laptop", "software", "hardware"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Hair Styling",
    description: "Trendy hairstyles and professional hair treatments.",
    price: 1200,
    category: "beauty",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Mumbai, Maharashtra",
    availableDays: ["Friday", "Saturday"],
    duration: "2 hours",
    discount: 10,
    isActive: true,
    tags: ["hair", "styling", "salon"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Leak Detection Service",
    description: "Find and repair hidden leaks in walls or underground.",
    price: 1700,
    category: "plumbing",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Ahmedabad, Gujarat",
    availableDays: ["Monday", "Thursday"],
    duration: "3 hours",
    discount: 8,
    isActive: true,
    tags: ["leak", "pipe", "repair"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Switch Board Installation",
    description: "Install or replace electrical switch boards.",
    price: 500,
    category: "electrical",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Surat, Gujarat",
    availableDays: ["Tuesday"],
    duration: "1 hour",
    discount: 5,
    isActive: true,
    tags: ["switch", "board", "electric"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "Office Cleaning",
    description: "Cleaning of office spaces, workstations, and restrooms.",
    price: 3500,
    category: "cleaning",
    serviceProvider: new mongoose.Types.ObjectId(),
    serviceProvide: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Noida, Uttar Pradesh",
    availableDays: ["Sunday"],
    duration: "6 hours",
    discount: 25,
    isActive: true,
    tags: ["office", "clean", "workspace"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  },
  {
    title: "TV Repair",
    description: "Fix display, sound, and wiring issues in LED TVs.",
    price: 1600,
    category: "repair",

    serviceProvider: new mongoose.Types.ObjectId('68ca89ca1c059f013cbe885a'),
    location: "Patna, Bihar",
    availableDays: ["Thursday", "Saturday"],
    duration: "3 hours",
    discount: 15,
    isActive: true,
    tags: ["tv", "display", "sound"],
    gallery: new mongoose.Types.ObjectId(),
    reviews: []
  }
];



const hashPass = async (password) => {
  console.log(password)
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hash = await bcrypt.hash(password, salt);
  console.log(hash);
  return hash;
}


const pushMany = async () => {
  try {
    const hash = await hashPass("123456");
    const admin = await adminSchema.insertOne({ fullName: "Rahul Kumar Lodhi", password: hash, email: "radayaram315@gmail.com" })
    console.log(admin);
    mongoose.connection.close(); // close connection after seeding
  } catch (error) {
    console.log("❌ Error inserting services:", error.message);
    mongoose.connection.close();
  }
};

pushMany();