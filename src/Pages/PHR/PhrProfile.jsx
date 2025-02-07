import React from 'react'
import { PhrAssets } from '../../assets/PHR/assets'
import Update from '../../CommonComponents/Update/Update'

const PhrProfile = () => {
  return (
    <>
      <div className='py-3 px-8 bg-[#F3FBFF]'>

        <div className='flex justify-between items-center '>
          <div className='flex gap-4'>
            <img src={PhrAssets.Profile} alt="profile" />
            <div className='flex flex-col gap-2'>
              <p className='font-semibold  landing-5 text-md'>John Dsouza</p>
              <div className='flex gap-1 text-[#374151] text-base'>
                <p>Indian(AmericanIndian)</p>
                <p>. 34</p>
                <p>. Male</p>
                <p>. 06/02/1990</p>
              </div>
            </div>
          </div>
          <div className='flex gap-2'>
           <Update/>
          </div>   
        </div>
        
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-4 px-3'>

          <div className='flex flex-col text-sm landing-5'>
            <p className='text-[#6B7280]'>Email</p> 
            <p>healthcapita@gmail.com</p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>Alternative Email</p> 
            <p>healthcapita@gmail.com</p>
          </div>

          <div className='flex flex-col'>
            <div className='flex gap-2'>
            <img src={PhrAssets.Phone_icon} alt='phone' />
            <p className='text-[#6B7280]'>Mobile</p> 
          </div>
            <p>+973-85236923</p>
          </div>

          <div className='flex flex-col'>
            <div className='flex gap-2'>
            <img src={PhrAssets.Landphone_icon} alt='phone' />
            <p className='text-[#6B7280]'>Landline No</p> 
          </div>
            <p>+973-77000335</p>
          </div>


          <div className='flex flex-col'>
            <div className='flex gap-2'>
            <img src={PhrAssets.Bloodgroup_icon} alt='phone' />
            <p className='text-[#6B7280]'>Blood group</p> 
          </div>
            <p>O-ve</p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>Rhesus Factor</p> 
            <p>-ve</p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>Height:</p> 
            <p>5'-8"</p>
          </div>


          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>Weight:</p> 
            <p>52 kg</p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>Marital status</p> 
            <p>Married</p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>Spouse name</p> 
            <p>Marry D'souza</p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>No of children</p> 
            <p>2</p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>Address</p> 
            <p>31, Building 184,
 Road No-126,Block 338,
 Adliya, Kingdom Of Bahrain</p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>Area, Governate</p> 
            <p>06/02/1990</p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>P.O. Box</p> 
            <p>98723</p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[#6B7280]'>Country</p> 
            <p>Bahrain</p>
          </div>
          
        </div>
       </div>
    </>
  )
}

export default PhrProfile
