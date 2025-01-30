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

export function MorphingDialogBasicTen() {

  const [recommended_fertilizer, setRecFert] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRecFert = async () => {
      try {
        const response = await fetch("http://157.245.196.80:3000/data");
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (Array.isArray(data) && data.length > 0) {
          const latestRecFert = data[data.length - 1]?.recommended_fertilizer;
          setRecFert(latestRecFert);
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching best crop status:", error);
      }
    };
  
    fetchRecFert();
  }, []);

  return (
      <div
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[270px] md:w-[250px] md:h-[100px] items-center justify-center flex-col overflow-hidden border border-zinc-950/10 bg-black dark:border-zinc-50/10 dark:bg-zinc-900'
      >
        
        <div className='flex grow flex-row items-center justify-between px-3 py-2'>
          <div>
            <div className='text-zinc-950 text-center dark:text-zinc-50'>
              Recommended Fertilizer
            </div>
            <div className='text-zinc-700 text-center dark:text-zinc-400'>
              {recommended_fertilizer !== null ? recommended_fertilizer : "Loading..."}
            </div>
          </div>
        </div>
      </div>
  );
}
