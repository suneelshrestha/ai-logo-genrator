import React from 'react';
import formdataInterface, {ChildProps} from '../../declare/declare.interface';

export default function LogoDes(props: {handelGetInfo: ChildProps; formData: formdataInterface}) {
  return (
    <>
      <div className="">
        <div className=" text-3xl font-semibold text-[#FF0062]">Describe Your Logo Vision</div>
        <div className=" text-lg font-medium  text-gray-500">
          Share your ideas, themes, or inspirations to create a logo that perfectly represents your brand or project.
        </div>
        <div className="sm:w-[90%] py-3">
          <input
            className=" border-[1px] border-gray-200 outline-none rounded-md w-full px-3 sm:px-6 py-1 sm:py-2 text-base sm:text-xl "
            type="text"
            name="desc"
            value={props.formData.desc || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handelGetInfo(e.target.name, e.target.value)}
            id=""
            placeholder="Enter your log description"
          />
        </div>
      </div>
    </>
  );
}
