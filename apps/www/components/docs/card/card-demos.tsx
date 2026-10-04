"use client";

import { Button } from "@paubha/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardEyebrow,
  CardFooter,
  CardHeader,
  CardImage,
  CardMeta,
  CardTitle,
} from "@paubha/registry/ui/card";
import { ArrowRight } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

const PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7";

export function CardHero() {
  return (
    <ComponentPlayground
      code={`<Card>
  <CardImage src="/photo.jpg" alt="" />
  <CardContent>
    <CardHeader>
      <CardEyebrow>DESIGN GUIDE · 6 MIN READ</CardEyebrow>
      <CardTitle>Designing for clarity</CardTitle>
      <CardDescription>
        Make complex interfaces easier to read, navigate and trust.
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <CardMeta>Product team · Oct 04, 2026</CardMeta>
      <Button variant="link" size="sm" trailingIcon={<ArrowRight />}>
        Read the guide
      </Button>
    </CardFooter>
  </CardContent>
</Card>`}
    >
      <div className="w-[333px] max-w-full">
        <Card>
          <CardImage src={PLACEHOLDER} alt="" />
          <CardContent>
            <CardHeader>
              <CardEyebrow>DESIGN GUIDE · 6 MIN READ</CardEyebrow>
              <CardTitle>Designing for clarity</CardTitle>
              <CardDescription>
                Make complex interfaces easier to read, navigate and trust.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <CardMeta>Product team · Oct 04, 2026</CardMeta>
              <Button variant="link" size="sm" trailingIcon={<ArrowRight />}>
                Read the guide
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </ComponentPlayground>
  );
}

export function CardStates() {
  return (
    <ComponentPlayground
      code={`<Card disabled>
  ...
  <CardFooter>
    <CardMeta>Access unavailable</CardMeta>
    <Button variant="link" size="sm" disabled>Read the guide</Button>
  </CardFooter>
</Card>

<Card error>
  ...
  <CardFooter>
    <CardMeta>Couldn’t sync. Try again.</CardMeta>
    <Button variant="link" size="sm">Retry sync</Button>
  </CardFooter>
</Card>`}
    >
      <div className="flex flex-wrap gap-4">
        <div className="w-[300px] max-w-full">
          <Card disabled>
            <CardContent>
              <CardHeader>
                <CardEyebrow>DESIGN GUIDE · 6 MIN READ</CardEyebrow>
                <CardTitle>Designing for clarity</CardTitle>
                <CardDescription>
                  Make complex interfaces easier to read, navigate and trust.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <CardMeta>Access unavailable</CardMeta>
                <Button
                  variant="link"
                  size="sm"
                  disabled
                  trailingIcon={<ArrowRight />}
                >
                  Read the guide
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
        <div className="w-[300px] max-w-full">
          <Card error>
            <CardContent>
              <CardHeader>
                <CardEyebrow>DESIGN GUIDE · 6 MIN READ</CardEyebrow>
                <CardTitle>Designing for clarity</CardTitle>
                <CardDescription>
                  Make complex interfaces easier to read, navigate and trust.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <CardMeta>Couldn’t sync. Try again.</CardMeta>
                <Button variant="link" size="sm" trailingIcon={<ArrowRight />}>
                  Retry sync
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
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
              <CardImage src={PLACEHOLDER} alt="" className="h-24" />
              <CardContent className="p-4">
                <CardHeader className="gap-1">
                  <CardTitle className="text-body-md">{variant}</CardTitle>
                  <CardDescription className="text-body-sm">
                    Card content preview.
                  </CardDescription>
                </CardHeader>
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
    <CardHeader>
      <CardTitle>Clickable card</CardTitle>
      <CardDescription>
        Entire card is a role="button"; Enter/Space activates it.
      </CardDescription>
    </CardHeader>
  </CardContent>
</Card>`}
    >
      <div className="w-[333px] max-w-full">
        <Card onClick={() => {}}>
          <CardContent>
            <CardHeader>
              <CardTitle>Clickable card</CardTitle>
              <CardDescription>
                Entire card is a role="button"; Enter/Space activates it.
              </CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
      </div>
    </ComponentPlayground>
  );
}
