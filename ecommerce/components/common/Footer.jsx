
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
      Link: '/profile?tab=1'
    }, {
      name: "Login / Register",
      Link: '/login'
    },
    {
      name: "Cart",
      Link: '/cart'
    },
    {
      name: 'Whishlist',
      Link: '/wishlist'
    }],
    QuickLink: [{
      name: 'Privacy Policy',
      Link: "/policy"
    },
    {
      name: 'Terms Of Use',
      Link: "term-of-use"
    },
    {
      name: 'FAQ',
      Link: "/faq"
    },
    {
      name: 'Contact',
      Link: "/contact"
    },
    ]
  }


  const handleSubmitEmailData = () => {

  }

  return (
    <div className='w-full text-main-text bg-primary-color  border-b shadow-black shadow-xl border-matext-main-text py-5'>
      <div className='flex md:flex-row flex-col gap-4 flex-1'>
        <div className="flex-[0.5] items-start  flex gap-5 md:flex-row flex-col justify-between px-4">

          {/* 1 */}
          <div className="flex flex-col gap-3">
            <h3 className='font-bold text-[24px]'>Exclusive</h3>
            <h4 className='text-[20px]  font-medium'>Subscribe</h4>
            <p className='text-[13px] font-normal'>Get 10% off your first order</p>
            <div className='border flex  items-center gap-2 rounded-md p-1  border-matext-main-text'>
              <div>
                <input type="email" name="" id="" placeholder='Enter your email' className='outline-none h-full w-full text-16px bg-transparent' />
              </div>
              <div className='cursor-pointer' onClick={handleSubmitEmailData}>
                <BiMailSend className='h-6 w-6' />
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
                    return <Link href={value?.Link} key={index} className='text-main-text '  >
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
                    return <Link href={value?.Link} key={index} className='text-main-text '  >
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