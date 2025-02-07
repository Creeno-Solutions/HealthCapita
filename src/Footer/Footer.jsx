
import React from "react";
import { HomeAssets } from "../assets/Home/HomeAssets";

function Footer() {

  return (
    
    <div className=" w-full gap-1 pt-16 px-14 bg-[#001940] pb-4 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-between shrink-0 gap-14 "> 
        <div className="flex flex-col items-start gap-4">
          <img src={HomeAssets.logo} alt="Logo" />
          <p className="text-white text-md landing-5">To reach the highest attainable standards of health and productivity, in order to achieve wellbeing, social and economic development and quality of life.</p>
          <div className="flex items-start gap-4">
           <img src={HomeAssets.FacebookIcon} alt="Fb_icon" />
           <img src={HomeAssets.LinkdinIcon} alt="LinkedIn_icon" />
           <img src={HomeAssets.TwitterIcon} alt="Twitter_icon" />
        </div>
        </div>

        <div className="flex flex-col items-start text-md text-white landing-5">
          <p className="text-white text-lg landing-5 font-medium mb-3">Corporate Office</p>
          <p>Capita Technologies WLL</p>
          <p>&#40;C.R No: 112807-01&#41;</p>
          <p>701, Building 58, Entrance - 1,</p>
          <p> Manama Center, Manama-316</p>
          <p>Kingdon Of Bahrain</p>
          <p>Tel: <span className="underline">+97317002072</span></p>
          <p>Email: <span className="underline">support@healthcapita.com</span></p>
        </div>
        

        <div className="flex flex-col items-start gap-4 text-white">
        <p className="text-white text-lg landing-5  mb-2 font-medium">Quick Links</p>
          <p>Blog</p>
          <p>Contact Us</p>
        </div>
        

        <div className="flex flex-col items-start gap-4 text-white">
        <p className="text-lg landing-5 font-medium mb-2">Subscribe to our newsletter</p>
          <input type="email" placeholder="Email" className="bg-[#001940] py-2 pl-3 border w-full sm:w-3/2 text-white border-[#9CA3AF] rounded-lg outline-none" />
          <button className="border rounded-full py-2 px-7">Subscribe</button>
        </div>      
      </div> 
  
      
      <div className="text-center mt-10">
        <p className="text-white">Copyright © 2017- 2023 Capita Technologies WLL, All rights reserved</p>
      </div>

     </div> 
   )
}

export default Footer;