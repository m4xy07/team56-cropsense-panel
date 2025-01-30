import { useEffect, useState } from 'react';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/morphing-dialog';
import { PlusIcon } from 'lucide-react';
import { PressureChart } from './Charts6';

export function MorphingDialogBasicSix() {
  const [pres, setPres] = useState<number | null>(null);

  useEffect(() => {
    const fetchPres = async () => {
      try {
        const response = await fetch('http://157.245.196.80:3000/data');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const latestPres = data[data.length - 1]?.pres;

          if (latestPres !== undefined) {
            const convertedPres = parseFloat((latestPres / 100).toFixed(2)); // APPLYING FORMULA
            setPres(convertedPres);
          }
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching pres:", error);
      }
    };

    fetchPres();
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
        style={{ borderRadius: '12px' }}
        className='flex max-w-[270px] md:w-[150px] md:h-[100px] items-center justify-center flex-col overflow-hidden border border-zinc-950/10 bg-black dark:border-zinc-50/10 dark:bg-zinc-900'
      >
        <div className='flex grow flex-row items-center justify-between px-3 py-2'>
          <div>
            <MorphingDialogTitle className='text-zinc-950 text-center dark:text-zinc-50'>
              Pressure
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className='text-zinc-700 text-center dark:text-zinc-400'>
              {pres !== null ? `${pres} hPa` : 'Loading...'}
            </MorphingDialogSubtitle>
          </div>
          
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{ borderRadius: '24px' }}
          className='pointer-events-auto dark relative flex h-auto w-full flex-col overflow-hidden border bg-black border-zinc-50/10 dark:bg-zinc-900 sm:w-[800px]'
        >
          <PressureChart />
          <MorphingDialogClose className='text-zinc-50' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
