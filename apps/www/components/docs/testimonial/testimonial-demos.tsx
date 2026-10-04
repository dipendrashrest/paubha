"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { Testimonial, TestimonialGrid } from "@paubha/registry/ui/testimonial";
import { ComponentPlayground } from "../_shared/component-playground";

export function TestimonialHero() {
  return (
    <ComponentPlayground
      code={`<Testimonial
  quote="Paubha’s glow-focus alone feels like a real brand."
  author="Ava Ruiz"
  role="Design lead"
  avatar={<Avatar initials="AR" alt="Ava Ruiz" size="sm" />}
/>`}
    >
      <div className="w-full max-w-md">
        <Testimonial
          quote="Paubha’s glow-focus alone feels like a real brand."
          author="Ava Ruiz"
          role="Design lead"
          avatar={<Avatar initials="AR" alt="Ava Ruiz" size="sm" />}
        />
      </div>
    </ComponentPlayground>
  );
}

export function TestimonialGridDemo() {
  return (
    <ComponentPlayground
      code={`<TestimonialGrid>
  <Testimonial quote="…" author="Jules" />
  <Testimonial quote="…" author="Sam" />
</TestimonialGrid>`}
    >
      <TestimonialGrid className="w-full max-w-3xl">
        <Testimonial
          quote="Copy-paste registry means we own the code."
          author="Jules Kim"
          role="Staff engineer"
        />
        <Testimonial
          quote="Figma and code finally match."
          author="Sam Lee"
          role="Product designer"
        />
      </TestimonialGrid>
    </ComponentPlayground>
  );
}
