"use client";

import { Faq } from "@paubha/registry/ui/faq";
import { ComponentPlayground } from "../_shared/component-playground";

export function FaqHero() {
  return (
    <ComponentPlayground
      code={`<Faq
  items={[
    {
      question: "Is Paubha really free?",
      answer: "Yes. The entire catalog ships under MIT.",
    },
    {
      question: "Can we use it commercially?",
      answer: "Yes, modify and ship without royalties.",
    },
  ]}
/>`}
    >
      <div className="w-full max-w-xl">
        <Faq
          items={[
            {
              question: "Is Paubha really free?",
              answer: "Yes. The entire catalog ships under MIT.",
            },
            {
              question: "Can we use it commercially?",
              answer: "Yes, modify and ship without royalties.",
            },
          ]}
        />
      </div>
    </ComponentPlayground>
  );
}
