import { cn } from "@paubha/registry/lib/cn";
import Image from "next/image";

/** Local Unsplash photos in /public/examples/photos (downloaded, not hotlinked). */
export const PHOTOS = {
  "team-laptops": {
    w: 1400,
    h: 934,
    alt: "Five people working on laptops around a wooden table",
  },
  "office-corridor": {
    w: 1400,
    h: 935,
    alt: "Long glass-walled office corridor with a kitchen and lounge",
  },
  "desk-topdown": {
    w: 1400,
    h: 933,
    alt: "Overhead view of a shared desk covered in laptops, notebooks and phones",
  },
  skyscrapers: {
    w: 1400,
    h: 931,
    alt: "Glass office towers against a clear blue sky",
  },
  "meeting-bw": {
    w: 1400,
    h: 933,
    alt: "Two colleagues discussing a website on laptops, seen through glass",
  },
  "ux-wall": {
    w: 1400,
    h: 933,
    alt: "A hand pinning a user-flow map onto a wall of app screens",
  },
  "all-hands": {
    w: 1400,
    h: 787,
    alt: "A teammate presenting to the company in a brick-walled office",
  },
  boardroom: {
    w: 1400,
    h: 933,
    alt: "A presenter addressing a team around a boardroom table",
  },
  discussion: {
    w: 1400,
    h: 933,
    alt: "Hands gesturing in a meeting beside a laptop showing a design board",
  },
  "laptop-code": {
    w: 1400,
    h: 932,
    alt: "Laptop showing code on a bright desk next to a monitor",
  },
  "code-closeup": {
    w: 1400,
    h: 935,
    alt: "Close-up of syntax-highlighted code on a screen",
  },
  "pair-programming": {
    w: 1400,
    h: 933,
    alt: "Two developers working side by side at a bright desk",
  },
  "pair-review": {
    w: 1400,
    h: 933,
    alt: "Colleagues reviewing code together on a laptop",
  },
  "open-office": {
    w: 1400,
    h: 933,
    alt: "A large open-plan office with rows of people at laptops",
  },
  "window-desk": {
    w: 1400,
    h: 933,
    alt: "A laptop on a long desk beside a tall window and a plant",
  },
  "cafe-laughing": {
    w: 1400,
    h: 933,
    alt: "Three colleagues laughing together over laptops at a wooden table",
  },
  "server-aisle": {
    w: 1400,
    h: 935,
    alt: "An engineer with a tablet beside a glass wall of server racks",
  },
  "wireframe-sketch": {
    w: 1400,
    h: 933,
    alt: "A hand sketching app wireframes on paper",
  },
  "analytics-laptop": {
    w: 1400,
    h: 933,
    alt: "Hands typing on a laptop showing an analytics dashboard",
  },
  "notes-table": {
    w: 1400,
    h: 933,
    alt: "Hands taking notes at a long wooden meeting table",
  },
  "sticky-notes": {
    w: 1400,
    h: 933,
    alt: "A teammate presenting sticky notes on a whiteboard to a workshop",
  },
} as const;

export type PhotoName = keyof typeof PHOTOS;

export function Photo({
  name,
  className,
  imgClassName,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  alt,
}: {
  name: PhotoName;
  /** Wrapper classes: set the aspect ratio and radius here, e.g. "aspect-[4/3] rounded-lg". */
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Override the default alt text; pass "" when the image is decorative. */
  alt?: string;
}) {
  const p = PHOTOS[name];
  return (
    <div className={cn("relative overflow-hidden bg-bg-tertiary", className)}>
      <Image
        src={`/examples/photos/${name}.jpg`}
        alt={alt ?? p.alt}
        width={p.w}
        height={p.h}
        priority={priority}
        sizes={sizes}
        className={cn("size-full object-cover", imgClassName)}
      />
    </div>
  );
}

/** Headshots: 320px square crops, faces centered. */
export const PEOPLE = [
  {
    src: "/examples/photos/person-1.jpg",
    name: "Maren Holloway",
    role: "Design Lead",
  },
  {
    src: "/examples/photos/person-2.jpg",
    name: "Dario Quintela",
    role: "Staff Engineer",
  },
  {
    src: "/examples/photos/person-3.jpg",
    name: "Leila Marchetti",
    role: "Product Manager",
  },
  {
    src: "/examples/photos/person-4.jpg",
    name: "Tomás Aguilar",
    role: "Engineering Manager",
  },
  {
    src: "/examples/photos/person-5.jpg",
    name: "Ingrid Solheim",
    role: "Head of Design Systems",
  },
  {
    src: "/examples/photos/person-6.jpg",
    name: "Walter Brandt",
    role: "VP Engineering",
  },
] as const;

export function Headshot({
  index,
  size = 48,
  className,
}: {
  index: 0 | 1 | 2 | 3 | 4 | 5;
  size?: number;
  className?: string;
}) {
  const p = PEOPLE[index];
  return (
    <Image
      src={p.src}
      alt={p.name}
      width={size}
      height={size}
      className={cn("rounded-full object-cover", className)}
      style={{ width: size, height: size }}
    />
  );
}
