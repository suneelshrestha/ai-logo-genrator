'use client';

import axios from 'axios';
import {useEffect, useState} from 'react';

export default function ImageLoadingPage() {
  const [progress, setProgress] = useState(0);
  const [activePixels, setActivePixels] = useState<boolean[]>(Array(36).fill(false));
  const [isMounted, setIsMounted] = useState(false);
  const [AIprompt, setAIprompt] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [started, setStarted] = useState<boolean>(false);
  const [dimage, setDimage] = useState<string | null>(null);

  // Only run client-side effects after mounting
  useEffect(() => {
    setIsMounted(true);

    // Simulate progress for demo purposes
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 2;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 800);

    // Randomly activate/deactivate pixels
    const pixelInterval = setInterval(() => {
      setActivePixels((prev) => prev.map(() => Math.random() < 0.5));
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(pixelInterval);
    };
  }, []);

  // Generate the logo
  const generateLogo = async (prompt: string) => {
    setStarted(true);
    const timeNow = new Date().getTime();
    const timeNowString = timeNow.toString();
    try {
      const res = await axios.post(
        '/api/hf',
        {prompt: prompt}, // Send as an object with a prompt property
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200) {
        console.log('res', res.data.image);
        setImage(res.data.image);
        setDimage(res.data.image);
        const finalTime = new Date().getTime();
        const finalTimeString = finalTime.toString();

        const totalTime = finalTime - timeNow;
        const totalTimeString = totalTime.toString();
        console.log('totalTime', totalTimeString);
        setStarted(false);
      }
    } catch (error) {
      console.error('Error generating the logo image:', error);
      setStarted(false);
    }
  };

  useEffect(() => {
    const storedPrompt = localStorage.getItem('finalPrompt');
    if (storedPrompt) {
      setAIprompt(storedPrompt);
      generateLogo(storedPrompt);
    } else {
      console.log('no prompt found');
    }
  }, [1]);

  return (
    <div className="">
      <div className="">
        {started ? (
          <div className="">
            <div className="flex  flex-col items-center justify-center  mt-14 p-4">
              <div className="relative">
                {/* Main card */}
                <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-xl backdrop-blur-sm">
                  <div className="flex flex-col items-center space-y-6 text-center">
                    {/* Dynamic loading animation */}
                    <div className="relative h-32 w-32">
                      {/* Canvas-like grid for image generation effect */}
                      <div className="grid h-full w-full grid-cols-6 grid-rows-6 gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
                        {Array.from({length: 36}).map((_, i) => {
                          const delay = (i % 6) * 0.1 + Math.floor(i / 6) * 0.1;
                          return (
                            <div
                              key={i}
                              className={`rounded-sm ${
                                isMounted && activePixels[i] ? 'animate-pulse bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-gray-200'
                              }`}
                              style={{
                                animationDelay: `${delay}s`,
                                animationDuration: '1.5s',
                              }}
                            />
                          );
                        })}
                      </div>

                      {/* Overlay with scanning effect - only shown after client-side mount */}
                      {isMounted && (
                        <div
                          className="absolute left-0 top-0 h-full w-1 animate-[scan_2s_linear_infinite] bg-gradient-to-b from-transparent via-white to-transparent opacity-70"
                          style={{boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.5)'}}
                        ></div>
                      )}
                    </div>

                    {/* Text content */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-800">Creating Your Masterpiece</h2>
                      <p className="text-gray-600">Your image is being carefully generated. This process may take a moment.</p>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full space-y-2">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ease-in-out"
                          style={{width: `${progress}%`}}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500">Please be patient while we work our magic...</p>
                    </div>

                    {/* Additional info */}
                    <div className="w-full rounded-xl bg-blue-50 p-4">
                      <p className="text-sm text-gray-600">
                        Complex images may take longer to generate. The page will automatically update when your image is ready.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <div className=" flex items-center justify-center mt-16">
              <div className=" w-[50%] h-[50%] flex items-center justify-center flex-col gap-4 ">
                {image === null ? (
                  <div className="">Error generating image</div>
                ) : (
                  <img className=" w-[40%] aspect-square rounded-md" src={image ?? undefined} alt="" />
                )}
                <div className="flex w-[40%] gap-2 justify-between ">
                  <a
                    href={image ?? ''}
                    download="image.png"
                    className="bg-red-500 border-[1px] border-black text-white font-semibold px-3 py-1 rounded-md hover:text-red-500 hover:bg-white cursor-pointer"
                  >
                    Download
                  </a>
                  <div className="bg-black text-white border-[1px] border-black font-semibold px-3 py-1 rounded-md  cursor-pointer hover:text-black hover:bg-white">
                    Dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
