'use client';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import React, {useState} from 'react';

export default function Navbar() {
  const {data: session} = useSession();
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      <div className=" w-full border-b border-gray-300">
        <div className=" flex justify-between items-center px-[10%] w-full py-3 sm:py-4">
          <div className="">
            <Link href={'/'}>
              <div className=" text-xl sm:text-2xl font-semibold font-serif text-black ">LogoGenie</div>
            </Link>
          </div>
          {session && (session?.user?.name?.length ?? 0) >= 0 ? (
            <div className=" flex gap-4 items-center" onClick={() => setIsActive(!isActive)}>
              {session.user?.image ? (
                <div className="">
                  <img
                    src={session.user?.image ?? ''}
                    // alt={session.user?.name ? `${session.user.name}'s profile picture` : 'User profile'}
                    className="w-11 aspect-square rounded-full object-cover cursor-pointer border-2 border-gray-700"
                  />
                </div>
              ) : (
                <div className="w-11 aspect-square rounded-full object-cover cursor-pointer bg-blue-400 text-white text-center text-sm"></div>
              )}

              {/* show signout */}
              <div className=" w-10">
                {isActive && (
                  <div
                    className=""
                    onClick={() => {
                      setIsActive(false);
                    }}
                  >
                    <div className=" text-center text-red-500  cursor-pointer" onClick={() => signOut()}>
                      Signout
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="">
              <div className="">
                <Link href={'/login'}>
                  <div className=" bg-[#FF0062] text-sm sm:text-base font-semibold px-6 py-2 rounded-lg text-white cursor-pointer ">
                    login / signup
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
