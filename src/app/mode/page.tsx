'use client';

import React from 'react';

export default function page() {
  return (
    <div className=" flex justify-center">
      <div className=" xl:w-6/12  mt-16">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="flex flex-col py-4 rounded-lg hover:border-gray-700 border-2  border-gray-400 bg-card shadow-sm overflow-hidden">
            <div className="p-6 pb-3">
              <h3 className="text-2xl font-semibold text-foreground">Free</h3>
              <p className="text-sm text-muted-foreground mt-1">Perfect for getting started</p>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </div>
            <div className="p-6 pt-3 flex-1">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>5 credits</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>No need to signin</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Longer wait times</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Limited Design Options and Quality</span>
                </li>
              </ul>
            </div>
            <div className="p-6 pt-0">
              <button className="w-full py-2 hover:bg-black hover:text-white cursor-pointer hover:border-white  px-4 rounded-md border border-border bg-background hover:bg-muted transition-colors text-foreground font-medium">
                Get Started
              </button>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="flex py-4 flex-col rounded-lg hover:border-gray-700 border-2  border-gray-400 bg-card shadow-sm overflow-hidden">
            <div className="p-6 pb-3">
              {/* <div className="bg-primary text-primary-foreground text-sm font-medium  py-1 rounded-full w-fit mb-2">Popular</div> */}
              <h3 className="text-2xl font-semibold text-foreground">Pro</h3>
              <p className="text-sm text-muted-foreground mt-1">For fast and unlimited credits</p>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground ml-1">/month</span>
                <span className="text-muted-foreground ml-1">(Needs to be logged in)</span>
              </div>
            </div>
            <div className="p-6 pt-3 flex-1">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Unlimited credits</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Authorized</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>Low waiting time</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span>High quality</span>
                </li>
              </ul>
            </div>
            {/* get started pro */}
            <div className="p-6 pt-0">
              <button className="w-full py-2 hover:bg-black hover:text-white cursor-pointer hover:border-white  px-4 rounded-md border border-border bg-background hover:bg-muted transition-colors text-foreground font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
