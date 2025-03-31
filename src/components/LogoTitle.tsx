'use client';
import {useSearchParams} from 'next/navigation';
import React, {useState} from 'react';
import formdataInterface, {ChildProps} from '../../declare/declare.interface';

export default function LogoTitle(props: {handelGetInfo: ChildProps; formData: formdataInterface}) {
  const params = useSearchParams();
  const [title, setTitle] = useState<string | null>();

  return (
    <>
      <div className="">
        <div className=" text-3xl font-semibold text-[#FF0062]">Logo Title</div>
        <div className=" text-lg font-medium  text-gray-500">Add Your Business, App, or Website Name for a Custom Logo</div>
        <div className="sm:w-[90%] py-3">
          <input
            className=" border-[1px] border-gray-200 outline-none rounded-md w-full px-3 sm:px-6 py-1 sm:py-2 text-base sm:text-xl "
            type="text"
            name="title"
            value={props.formData.title !== 'undefined' ? props.formData.title : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handelGetInfo?.(e.target.name, e.target.value)}
            id=""
            placeholder="Enter your logo title name"
          />
        </div>
      </div>
    </>
  );
}
