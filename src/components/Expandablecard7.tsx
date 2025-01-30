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
import { MoistureChart } from './Charts7';
import { useEffect, useState } from 'react';
  
  export function MorphingDialogBasicSeven() {

    const [moisture, setMoisture] = useState<number | null>(null);
                    
                      useEffect(() => {
                        const fetchMoisture = async () => {
                          try {
                            const response = await fetch('http://157.245.196.80:3000/data');
                    
                            if (!response.ok) {
                              throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                    
                            const data = await response.json();
                    
                            if (Array.isArray(data) && data.length > 0) {
                              const latestMoisture = data[data.length - 1]?.moisture; // FIXED HERE
                              setMoisture(latestMoisture);
                            } else {
                              console.warn("API returned an empty or invalid response.");
                            }
                          } catch (error) {
                            console.error("Error fetching alt:", error);
                          }
                        };
                    
                        fetchMoisture();
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
                Moisture
              </MorphingDialogTitle>
              <MorphingDialogSubtitle className='text-zinc-700 text-center dark:text-zinc-400'>
                {moisture !== null ? `${moisture}` : 'Loading...'}
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
            <MoistureChart/>
            <MorphingDialogClose className='text-zinc-50' />
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    );
  }
  