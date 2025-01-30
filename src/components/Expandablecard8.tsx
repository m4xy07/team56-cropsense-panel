import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer,
} from "@/components/morphing-dialog";
import { PlusIcon } from "lucide-react";
import { RainStatusChart } from "./Charts8";
import { useEffect, useState } from "react";

export function MorphingDialogBasicEight() {
  const [raining, setRaining] = useState<string | null>(null);

  useEffect(() => {
    const fetchRainingStatus = async () => {
      try {
        const response = await fetch("http://157.245.196.80:3000/data");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const latestRaining = data[data.length - 1]?.raining; // Fetch the latest raining status
          setRaining(latestRaining);
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching raining status:", error);
      }
    };

    fetchRainingStatus();
  }, []);

  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <MorphingDialogTrigger
        style={{
          borderRadius: "12px",
        }}
        className="flex max-w-[270px] md:w-[150px] md:h-[100px] items-center justify-center flex-col overflow-hidden border border-zinc-950/10 bg-black dark:border-zinc-50/10 dark:bg-zinc-900"
      >
        <div className="flex grow flex-row items-center justify-between px-3 py-2">
          <div>
            <MorphingDialogTitle className="text-zinc-950 text-center dark:text-zinc-50">
              Rain
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-zinc-700 text-center dark:text-zinc-400">
              {raining !== null ? raining : "Loading..."}
            </MorphingDialogSubtitle>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{
            borderRadius: "24px",
          }}
          className="pointer-events-auto dark relative flex h-auto w-full flex-col overflow-hidden border bg-black border-zinc-50/10 dark:bg-zinc-900 sm:w-[800px]"
        >
          <RainStatusChart />
          <MorphingDialogClose className="text-zinc-50" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
