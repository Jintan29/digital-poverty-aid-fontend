import React from 'react'

//Impoort components
import HumanCapital from '../../components/OverviewCapital/HumanCapital'
import PhysicalCapital from '../../components/OverviewCapital/PhysicalCapital'
import FinancialCapital from '../../components/OverviewCapital/FinancialCapital'
import NaturalCapital from '../../components/OverviewCapital/NaturalCapital'
import SocialCapital from '../../components/OverviewCapital/SocialCapital'




const Capital = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-4">ภาพรวมศักยภาพทุน 5 มิติ</h1>
      <HumanCapital />
      <PhysicalCapital />  
      <FinancialCapital /> 
      <NaturalCapital />
      <SocialCapital />
    </div>
  )
}

export default Capital
