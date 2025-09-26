import { Icons } from "@/components/icons";
import { OrbitingCircles } from "@/components/ui/orbiting-circle";
import { SiSlack, SiNotion, SiGoogledrive, SiSupabase, SiGooglegemini, SiAmazon } from "react-icons/si";

export function SecondBentoAnimation() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>
      <div className="pointer-events-none absolute top-0 left-0 h-20 w-full bg-gradient-to-b from-background to-transparent z-20"></div>

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 size-16 bg-secondary p-2 rounded-full z-30 md:bottom-0 md:top-auto">
        <Icons.logoIcon className="fill-white size-10" />
      </div>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center translate-y-0 md:translate-y-32">
          <OrbitingCircles
            index={0}
            iconSize={60}
            radius={100}
            reverse
            speed={1}
          >
            <SiSlack className="text-[#4A154B] size-12" />
            <SiNotion className="text-black dark:text-white size-12" />
          </OrbitingCircles>

          <OrbitingCircles index={1} iconSize={60} speed={0.5}>
            <SiGoogledrive className="text-[#4285F4] size-12" />
            <SiSupabase className="text-[#3ECF8E] size-12" />
          </OrbitingCircles>

          <OrbitingCircles
            index={2}
            iconSize={60}
            radius={230}
            reverse
            speed={0.5}
          >
            <SiGooglegemini className="text-[#8E75B2] size-12" />
            <SiAmazon className="text-[#FF9900] size-12" />
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
}
