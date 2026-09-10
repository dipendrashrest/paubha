"use client";

import { Card, CardContent, CardDescription, CardImage, CardTitle } from "@paubha/registry/ui/card";
import { ComponentPlayground } from "../_shared/component-playground";

export function CardHero() {
  return (
    <ComponentPlayground
      code={`<Card>
  <CardImage src="/photo.jpg" alt="" />
  <CardContent>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>
      A brief description of the card content goes here.
    </CardDescription>
  </CardContent>
</Card>`}
    >
      <div className="w-[280px]">
        <Card>
          <CardImage src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7" alt="" />
          <CardContent>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>
              A brief description of the card content goes here.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </ComponentPlayground>
  );
}

export function CardVariants() {
  return (
    <ComponentPlayground
      code={`<Card variant="default">...</Card>
<Card variant="outlined">...</Card>
<Card variant="elevated">...</Card>`}
    >
      <div className="flex flex-wrap gap-4">
        {(["default", "outlined", "elevated"] as const).map((variant) => (
          <div key={variant} className="w-[220px]">
            <Card variant={variant}>
              <CardImage src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7" alt="" className="h-24" />
              <CardContent>
                <CardTitle>{variant}</CardTitle>
                <CardDescription>Card content preview.</CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </ComponentPlayground>
  );
}

export function CardInteractive() {
  return (
    <ComponentPlayground
      code={`<Card onClick={() => console.log("clicked")}>
  <CardContent>
    <CardTitle>Clickable card</CardTitle>
    <CardDescription>
      Entire card is a role="button" — Enter/Space activates it.
    </CardDescription>
  </CardContent>
</Card>`}
    >
      <div className="w-[280px]">
        <Card onClick={() => {}}>
          <CardContent>
            <CardTitle>Clickable card</CardTitle>
            <CardDescription>
              Entire card is a role="button" — Enter/Space activates it.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </ComponentPlayground>
  );
}
