import { Info } from "lucide-react";

export default function AlertComp() {
  return (
    <div className="rounded-lg mt-6 border max-w-fit mx-auto items-center justify-center border-border px-4 py-3">
      <p className="text-sm">
        <Info
          className="-mt-0.5 me-3 inline-flex text-blue-500"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        If your crop fails then you can avail crop insurance from this <a href="#" className="underline">these links</a>, and it can help you recover financially!
      </p>
    </div>
  );
}