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
import { useEffect, useState } from 'react';

  export function MorphingDialogBasicNine() {

    const [best_crop, setBestCrop] = useState<string | null>(null);
    
      useEffect(() => {
        const fetchBestCrop = async () => {
          try {
            const response = await fetch("http://157.245.196.80:3000/data");
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (Array.isArray(data) && data.length > 0) {
              const latestBestCrop = data[data.length - 1]?.best_crop;
              setBestCrop(latestBestCrop);
            } else {
              console.warn("API returned an empty or invalid response.");
            }
          } catch (error) {
            console.error("Error fetching best crop status:", error);
          }
        };
    
        fetchBestCrop();
      }, []);

    return (
        <div
          style={{
            borderRadius: '12px',
          }}
          className='flex max-w-[270px] md:w-[150px] md:h-[100px] items-center justify-center flex-col overflow-hidden border border-zinc-950/10 bg-black dark:border-zinc-50/10 dark:bg-zinc-900'
        >
          
          <div className='flex grow flex-row items-center justify-between px-3 py-2'>
            <div>
              <div className='text-zinc-950 text-center dark:text-zinc-50'>
                Best Crop
              </div>
              <div className='text-zinc-700 text-center dark:text-zinc-400'>
                {best_crop !== null ? best_crop : "Loading..."}
              </div>
            </div>
          </div>
        </div>
    );
  }
  