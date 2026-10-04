import { LogoCloudItem } from "@paubha/registry/ui/logo-cloud";

const MARKS = [
  { name: "Northwind", letter: "N" },
  { name: "Helix", letter: "H" },
  { name: "Parcel", letter: "P" },
  { name: "Orbit", letter: "O" },
  { name: "Kite", letter: "K" },
  { name: "Summit", letter: "S" },
] as const;

function Monogram({ letter }: { letter: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      width="36"
      height="36"
      aria-hidden="true"
      className="text-fg-secondary"
    >
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fill="currentColor"
        fontSize="14"
        fontWeight="600"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {letter}
      </text>
    </svg>
  );
}

export function BrandMarks() {
  return (
    <>
      {MARKS.map((mark) => (
        <LogoCloudItem key={mark.name} name={mark.name} className="text-[0px]">
          <Monogram letter={mark.letter} />
        </LogoCloudItem>
      ))}
    </>
  );
}
