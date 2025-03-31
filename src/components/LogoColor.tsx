import React, {useState} from 'react';
import logocolorsCombo from '../../declare/declareColors';
import formdataInterface, {ChildProps} from '../../declare/declare.interface';

export default function LogoColor(props: {handelGetInfo: ChildProps; formData: formdataInterface}) {
  const [selectedColor, setSelectedColor] = useState<string>(props.formData.color ?? '');
  return (
    <>
      <div className="">
        <div className=" text-3xl font-semibold text-[#FF0062]">Choose Your Color Palette</div>
        <div className=" text-lg font-medium  text-gray-500">
          Pick the colors that reflect your brands personality and create a lasting impression.
        </div>
        <div className="py-4">
          <div className="grid grid-cols-3 gap-3 py-2">
            {logocolorsCombo.map((item, index) => (
              <div key={index}>
                <div
                  className={`w-full cursor-pointer flex flex-row ${
                    selectedColor === item.name ? 'border-2 border-black p-1 rounded-xl' : ' p-1 rounded-xl'
                  }`}
                  key={index}
                  onClick={() => {
                    setSelectedColor(item.name);
                    props.handelGetInfo('color', item.name);
                  }}
                >
                  {item.colors.map((color, index) => (
                    <div
                      style={{
                        backgroundColor: color,
                        height: 70,
                        width: '20%',
                      }}
                      key={index}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:w-[90%] py-3"></div>
      </div>
    </>
  );
}
