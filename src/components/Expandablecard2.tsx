import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogTitle,
    MorphingDialogImage,
    MorphingDialogSubtitle,
    MorphingDialogClose,
    MorphingDialogDescription,
    MorphingDialogContainer,
  } from '@/components/morphing-dialog';
  import { PlusIcon } from 'lucide-react';
import { HumidityChart } from './Chart2';
import { useEffect, useState } from 'react';
  
  export function MorphingDialogBasicTwo() {

    const [humidity, setHumidity] = useState<number | null>(null);
    
      useEffect(() => {
        const fetchHumidity = async () => {
          console.log("Fetching humidity..."); // Debug log
          try {
            const response = await fetch('http://157.245.196.80:3000/data');
            console.log("Response received:", response);
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("API Response:", data);
    
            if (Array.isArray(data) && data.length > 0) {
              const latestHumidity = data[data.length - 1]?.humidity; // FIXED HERE
              console.log("Latest humidity:", latestHumidity);
              setHumidity(latestHumidity);
            } else {
              console.warn("API returned an empty or invalid response.");
            }
          } catch (error) {
            console.error("Error fetching humidity:", error);
          }
        };
    
        fetchHumidity();
      }, []);


    return (
      <MorphingDialog
        transition={{
          type: 'spring',
          bounce: 0.05,
          duration: 0.25,
        }}
      >
        <MorphingDialogTrigger
          style={{
            borderRadius: '12px',
          }}
          className='flex max-w-[270px] md:w-[150px] md:h-[100px] items-center justify-center flex-col overflow-hidden border border-zinc-950/10 bg-black dark:border-zinc-50/10 dark:bg-zinc-900'
        >
          
          <div className='flex grow flex-row items-center justify-between px-3 py-2'>
            <div>
              <MorphingDialogTitle className='text-zinc-950 text-center dark:text-zinc-50'>
                Humidity
              </MorphingDialogTitle>
              <MorphingDialogSubtitle className='text-zinc-700 text-center dark:text-zinc-400'>
                {humidity !== null ? `${humidity.toFixed(2)}%` : 'Loading...'}
              </MorphingDialogSubtitle>
            </div>
            
          </div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent
            style={{
              borderRadius: '24px',
            }}
            className='pointer-events-auto dark relative flex h-auto w-full flex-col overflow-hidden border bg-black border-zinc-50/10 dark:bg-zinc-900 sm:w-[800px]'
          >
            <HumidityChart/>
            
            <MorphingDialogClose className='text-zinc-50' />
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    );
  }
  