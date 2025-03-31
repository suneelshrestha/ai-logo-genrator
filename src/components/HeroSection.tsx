'use client';

import Link from 'next/link';
import React, {useState} from 'react';

export default function HeroSection() {
  const [title, setTitle] = useState<string>();
  return (
    <>
      <div className="">
        {/* hero section title */}
        <div className="w-full flex justify-center">
          <div className=" flex flex-col gap-1 sm:gap-3 items-center mt-20 w-[90%] ">
            <div className=" ">
              <div className=" text-center text-2xl md:text-3xl xl:text-[2.7rem] font-semibold text-red-500">AI Logo Maker</div>
            </div>
            <div className="">
              <div className=" text-center text-2xl md:text-3xl xl:text-[2.7rem] font-semibold ">
                Perfect Logos for Apps, Businesses, and Websites
              </div>
            </div>
            <div className=" ">
              <div className=" text-center text-sm sm:text-base">
                Craft unique and professional logos effortlessly with our AI-powered tool. Perfect for apps, businesses, websites, and more!
              </div>
            </div>
          </div>
        </div>

        {/* logo input section */}
        <div className=" flex justify-center mt-10">
          <div className=" w-[80%] sm:w-[60%] xl:w-[50%] gap-2 flex justify-between">
            <div className=" w-8/12 sm:w-9/12 shadow-2xl shadow-gray-300">
              <input
                className=" border-[2px] border-gray-200 outline-none rounded-md w-full px-3 sm:px-6 py-1 sm:py-2 text-base sm:text-xl "
                type="text"
                name="title"
                // value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                id=""
                placeholder="Enter your logo title name"
              />
            </div>
            <div className=" w-4/12 sm:w-3/12">
              <Link href={`/create?title=${title}`}>
                <button className=" w-full text-center py-1 sm:py-2 text-base sm:text-xl bg-[#FF0062] text-white rounded-md cursor-pointer font-medium">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
