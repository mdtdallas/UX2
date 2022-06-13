import React from 'react'
import AwardCard from '../components/AwardCard';
import AwardsList from '../components/AwardsList';
import CatDetailsCard from '../components/CatDetailsCard';
import Cat1 from '../img/catnew.png';


const CatProfile = () => {
  return (
    <div className='mb-4'>
        <h1 className='display-3 text-center p-3'>Cat Profile</h1>
        <CatDetailsCard/>
        <AwardsList/>
        <AwardCard/>
    </div>
  )
}

export default CatProfile