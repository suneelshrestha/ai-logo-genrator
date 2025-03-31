'use client';
import React, {useEffect, useState} from 'react';
import formdataInterface, {ChildProps} from '../../declare/declare.interface';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {NextRequest, NextResponse} from 'next/server';

export default function LogoIdeas(props: {handelGetInfo: ChildProps; formDatas: formdataInterface}) {
  const genAI = new GoogleGenerativeAI('AIzaSyDG6QVd7m7bkz0xHRn0UwYpWGg-b7YbpRY');
  const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
  const model2 = genAI.getGenerativeModel({model: 'gemini-2.5-pro-exp-03-25'});
  const [ideas, setIdeas] = useState<string[] | undefined>();
  const [selectedIdea, setSelecteIdea] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const prompt = `Generate 4 logo ideas for a brand named ${props.formDatas.title}. The brand specializes in ${props.formDatas.desc} with a ${
    props.formDatas.style
  } style. The logos should be described in around 2-3 words each, focusing on elements like ${
    props.formDatas.title + props.formDatas.desc
  }. The color palette should be ${props.formDatas.color}, and the style should evoke a sense of ${
    props.formDatas.style
  } please avoid the colon in the response`;

  const prompt2 = `Create a stunning logo for '${props.formDatas.title}' that embodies '${props.formDatas.desc}'. Use a '${props.formDatas.style}' design with a '${props.formDatas.color}' color scheme. Ensure bold outlines, thematic elements, and well-balanced typography that enhances brand identity. The logo must be unique, versatile, and include the full brand name.`;

  // generate prompt to generate logo
  const generateLogoPrompt = async () => {
    try {
      const res = await model.generateContent(prompt2);
      const content = res?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
      // Check if content is defined before parsing
      console.log('content', content);

      if (content) {
        // Remove the backticks and any unwanted text around the JSON
        const jsonString = content.replace(/^```json\n|\n```$/g, '');
        // Parse the cleaned content to extract the prompt
        // const finalPrompt = parsedContent.prompt;
        localStorage.setItem('finalPrompt', JSON.stringify(jsonString));
      } else {
        console.log('Content is undefined');
      }
    } catch (error) {
      console.log('Error generating prompt:', error);
    }
  };

  // function to get the ideas
  const fetchIdeas = async () => {
    setIsLoading(true);
    try {
      const res = await model.generateContent(prompt);
      setTimeout(() => {
        const content = res?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!content) {
          return NextResponse.json({message: 'Error generating the content'}, {status: 404});
        }

        const ideasArray = content
          .split('\n')
          .map((line) => line.trim())
          .filter((item) => item !== '')
          .map((item) => item.replace(/^\d+\.\s*/, '')); // Remove numbering
        setIdeas(ideasArray);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log('Error generating ideas', error);
      setIsLoading(false);
    }
  };

  // process only if theera all the info

  useEffect(() => {
    if (props.formDatas && props.formDatas.title !== 'undefined' && (props.formDatas.style?.length ?? 0) >= 0) {
      fetchIdeas();
      generateLogoPrompt();
    } else {
      setError('! You have not provided necessary information');
    }
    localStorage.setItem('finalPrompt', JSON.stringify(null));
  }, []);
  return (
    <>
      <div className="">
        <div className=" text-3xl font-semibold text-[#FF0062]">Select Your Design Idea</div>
        <div className=" text-lg font-medium  text-gray-500">
          Choose a design style that aligns with your vision, or skip to receive a random suggestion.
        </div>

        {/* show loader if the loading is active */}
        {isLoading && (
          <div className="my-5 flex justify-center">
            <span className="loader w-36 aspect-square  "></span>
          </div>
        )}

        {/* show error if any error */}
        {error && <div className="">{error && <div className=" text-center text-red-500 font-medium mt-3">{error}</div>}</div>}

        {/* displyt the ideas */}
        <div className=" grid grid-cols-2 gap-2 my-3">
          {ideas?.map((item, index) => (
            <div
              className={`px-4 rounded-xl py-1 cursor-pointer hover:border-gray-500 border-gray-300 border-[2px] ${
                selectedIdea === item ? 'border-gray-500 shadow-2xl' : ''
              }`}
              key={index}
              onClick={() => {
                setSelecteIdea(item);
                props.handelGetInfo('ideas', item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
