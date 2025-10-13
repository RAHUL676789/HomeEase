import React from 'react'
import { useSelector } from 'react-redux'
import PartnerHome from '../../Components/Parterner/PartnerHome';

import HomeDash from './HomeDash';

const Home = () => {
    const {user} = useSelector((state)=>state.user);
    const {partner} = useSelector((state)=>state.partner);
   
    if(partner){
       return <PartnerHome></PartnerHome>
    }
 return (
 <HomeDash></HomeDash>
 )
}

export default Home
