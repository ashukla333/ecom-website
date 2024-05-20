
"use client"
import Link from 'next/link';
import React from 'react'
import { BiMailSend } from "react-icons/bi";
import { IoLogoFacebook } from 'react-icons/io';
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  const footerData = {
    account: [{
      name: "My Account",
      Link: ''
    }, {
      name: "Login / Register",
      Link: ''
    },
    {
      name: "Cart",
      Link: ''
    },
    {
      name: 'Whishlist',
      Link: ''
    },
    {
      name: "Shop",
      Link: ''
    }],
    QuickLink: [{
      name: 'Privacy Policy',
      Link: ""
    },
    {
      name: 'Terms Of Use',
      Link: ""
    },
    {
      name: 'FAQ',
      Link: ""
    },
    {
      name: 'Contact',
      Link: ""
    },
    ]
  }


  const handleSubmitEmailData = () => {

  }

  return (
    <div className='w-full text-white bg-black border-b border-white py-5'>
      <div className='flex md:flex-row flex-col gap-4 flex-1'>
        <div className="flex-[0.5] items-start  flex gap-5 md:flex-row flex-col justify-between px-4">

          {/* 1 */}
          <div className="flex flex-col gap-2">
            <h3 className='font-bold text-[24px]'>Exclusive</h3>
            <h4 className='text-[20px]  font-medium'>Subscribe</h4>
            <p className='text-[13px] font-normal'>Get 10% off your first order</p>
            <div className='border flex gap-2 rounded-md p-1  border-white'>
              <div>
                <input type="email" name="" id="" placeholder='Enter your email' className='outline-none h-full w-full text-16px bg-transparent' />
              </div>
              <div className='cursor-pointer' onClick={handleSubmitEmailData}>
                <BiMailSend className='h-8 w-8' />
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="flex flex-col gap-2">
            <h3 className='font-bold text-[20px]'>Support</h3>
            <h4 className='text-[14px]  font-normal'>
              Vijay nagar tisgaon road , Kalyan (E), 421306
            </h4>
            <h4 className='text-[14px]  font-normal'>
              amanshukla3747@gmail.com
            </h4>
            <h4 className='text-[14px]  font-normal'>
              +91 000000 000
            </h4>
          </div>
        </div>
        {/*  */}
        <div className="flex-[0.5]">

          <div className="flex flex-1 md:flex-row flex-col justify-around items-start md:p-0 px-4 gap-5 ">
            {/* 3 */}
            <div className="flex gap-3 flex-col">
              <h3 className='font-bold text-[20px]'>Account</h3>
              <div className='flex flex-col gap-2 '>
                {
                  footerData?.account.map((value, index) => {
                    return <Link href={value?.Link} key={index} className='text-white '  >
                      {value?.name}
                    </Link>
                  })
                }
              </div>
            </div>
         
            <div className="flex gap-3 flex-col">
              <h3 className='font-bold text-[20px]'>Quick Link</h3>
              <div className='flex flex-col gap-2 '>
                {
                  footerData?.QuickLink.map((value, index) => {
                    return <Link href={value?.Link} key={index} className='text-white '  >
                      {value?.name}
                    </Link>
                  })
                }
            
            </div>
            </div>
            <div className="">
            <div className="flex gap-3 flex-col">
              <h3 className='font-bold text-[20px]'>Social Media</h3>
              <div className='flex flex-row gap-4 '>
              <IoLogoFacebook className='h-7 w-7' />
              <FaXTwitter className='h-6 w-6' />
              <BsInstagram  className='h-6 w-6'/>
              <FaLinkedin className='h-7 w-7' />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer