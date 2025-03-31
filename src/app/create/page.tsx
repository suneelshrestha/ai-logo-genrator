'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import React, {Suspense, useState} from 'react';
import formdataInterface from '../../../declare/declare.interface';
import LogoTitle from '@/components/LogoTitle';
import LogoColor from '@/components/LogoColor';
import LogoDes from '@/components/LogoDes';
import LogoStyle from '@/components/LogoStyle';
import LogoIdeas from '@/components/LogoIdeas';
import {useSession} from 'next-auth/react';

function CreatePageContent() {
  const [step, setStep] = useState<number>(1);
  const params = useSearchParams();
  const [title, setTitle] = useState<string | null>(params?.get('title') ?? '');
  const [formData, setFormdata] = useState<formdataInterface>({
    title: title || '',
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();
  const {data: session} = useSession();

  // handel the functio to add the info to the formdata
  const handelGetInfo = (name: string, value: string) => {
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handel the page Change
  const handelPageChange = () => {
    if (session) {
      router.push('/generatelogo');
    } else {
      router.push('/login');
    }
    localStorage.setItem('formData', JSON.stringify(formData));
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[80%] xl:w-[40%] border-[2px] border-gray-200 drop-shadow-2xl rounded-lg mt-20 px-8 flex flex-col gap-2 py-16">
          {/* show the logo differetn state */}
          {step === 1 ? (
            <LogoTitle handelGetInfo={handelGetInfo} formData={formData} />
          ) : step === 2 ? (
            <LogoDes handelGetInfo={handelGetInfo} formData={formData} />
          ) : step === 3 ? (
            <LogoColor handelGetInfo={handelGetInfo} formData={formData} />
          ) : step === 4 ? (
            <LogoStyle handelGetInfo={handelGetInfo} formData={formData} />
          ) : (
            <LogoIdeas handelGetInfo={handelGetInfo} formDatas={formData} />
          )}

          {/* buttons for continue and previous */}
          <div className="">
            <div className="sm:w-[90%] flex justify-between">
              {/* previous button */}
              {step !== 1 && (
                <div className="">
                  <div
                    className="w-full text-center px-3 sm:px-4 py-2 text-sm sm:text-base  border-[1px] border-gray-300 text-black rounded-md cursor-pointer font-medium flex gap-1 items-center"
                    onClick={() => setStep(step - 1)}
                  >
                    <div className="">
                      <img className="w-4" src="/icons/back.png" alt="" />
                    </div>
                    <div className="">Previous</div>
                  </div>
                </div>
              )}

              {step === 5 ? (
                <div className="">
                  <div
                    className="w-full text-center px-3 sm:px-4 py-2 text-sm sm:text-base  bg-[#FF0062] text-white rounded-md cursor-pointer font-semibold flex gap-2 items-center"
                    onClick={handelPageChange}
                  >
                    <div className="">Generate</div>
                    <div className="">
                      <img className="w-4 rotate-180" src="/icons/back.png" alt="" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="">
                  {/* continue button */}
                  <div className="">
                    <div
                      className="w-full text-center px-3 sm:px-4 py-2 text-sm sm:text-base  bg-[#FF0062] text-white rounded-md cursor-pointer font-semibold flex gap-2 items-center"
                      onClick={() => setStep(step + 1)}
                    >
                      <div className="">Continue</div>
                      <div className="">
                        <img className="w-4 rotate-180" src="/icons/back.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePageContent />
    </Suspense>
  );
}
