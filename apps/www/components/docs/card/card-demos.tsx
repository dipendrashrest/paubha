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

// Brand-gradient stand-in so the media slot never renders as a blank white block.
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20400%20200%22%20preserveAspectRatio=%22xMidYMid%20slice%22%3E%3Cdefs%3E%3ClinearGradient%20id=%22g%22%20x1=%220%22%20y1=%220%22%20x2=%221%22%20y2=%221%22%3E%3Cstop%20offset=%220%22%20stop-color=%22%236187F9%22/%3E%3Cstop%20offset=%220.55%22%20stop-color=%22%232450EA%22/%3E%3Cstop%20offset=%221%22%20stop-color=%22%231E3485%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%22400%22%20height=%22200%22%20fill=%22url%28%23g%29%22/%3E%3Ccircle%20cx=%22330%22%20cy=%2230%22%20r=%2290%22%20fill=%22%23BFD0FE%22%20fill-opacity=%220.22%22/%3E%3Ccircle%20cx=%2260%22%20cy=%22190%22%20r=%22110%22%20fill=%22%2393B0FD%22%20fill-opacity=%220.2%22/%3E%3Crect%20x=%22150%22%20y=%2270%22%20width=%22100%22%20height=%2260%22%20rx=%2212%22%20fill=%22%23FFFFFF%22%20fill-opacity=%220.18%22/%3E%3C/svg%3E";

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
