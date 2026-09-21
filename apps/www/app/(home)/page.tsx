import { LandingHero } from "@/components/home/landing-hero";
import { LandingMosaic } from "@/components/home/landing-mosaic";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-bg-primary">
      <LandingHero />
      <LandingMosaic />
      <p className="pb-10 text-center text-ui-lg font-medium text-fg-primary">
        Built by Dipendra Shrestha.
      </p>
    </div>
  );
}
