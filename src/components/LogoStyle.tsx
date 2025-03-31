'use client';

import React, {useState} from 'react';
import logostyles from '../../declare/declare.style';
import formdataInterface, {ChildProps} from '../../declare/declare.interface';

export default function LogoStyle(props: {handelGetInfo: ChildProps; formData: formdataInterface}) {
  const [selectedStyle, setSelectedStyle] = useState<string>(props.formData.style ?? '');
  return (
    <>
      <div className=" -mt-6">
        <div className=" text-3xl font-semibold text-[#FF0062]">Choose Your Logo Style</div>
        <div className=" text-lg font-medium  text-gray-500">Select the type of logo design that best represents your brands unique identity.</div>
        <div className="sm:w-[90%] py-3">
          <div className=" grid grid-cols-3 gap-4">
            {logostyles.map((item, index) => (
              <div
                className={`p-1 hover:border-[2px] border-gray-400 rounded-lg overflow-hidden ${
                  selectedStyle === item.name ? 'border-[2px] shadow-2xl' : ''
                }`}
                key={index}
                onClick={() => {
                  setSelectedStyle(item.name);
                  props.handelGetInfo('style', item.name);
                }}
              >
                <div className="">
                  <img className=" w-full aspect-[12/9] object-cover " src={item.image} alt="" />
                </div>
                <div className=" text-sm font-medium text-center">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
