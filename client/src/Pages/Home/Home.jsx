import React from 'react'
import { useSelector } from 'react-redux'
import SlideItem from '../../Components/Hero/SlideItem';
import PartnerHome from '../../Components/Parterner/PartnerHome';
import HeroSlider from '../../Components/Hero/HeroSlider';

const Home = () => {
    const {user} = useSelector((state)=>state.user);
    const {partner} = useSelector((state)=>state.partner);
   
    if(partner){
       return <PartnerHome></PartnerHome>
    }
 return (
 <HeroSlider></HeroSlider>
 )
}

export default Home
