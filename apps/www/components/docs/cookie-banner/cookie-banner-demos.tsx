"use client";

import { Button } from "@paubha/registry/ui/button";
import { CookieBanner } from "@paubha/registry/ui/cookie-banner";
import { ComponentPlayground } from "../_shared/component-playground";

export function CookieBannerHero() {
  return (
    <ComponentPlayground
      code={`<CookieBanner
  actions={
    <>
      <Button variant="secondary" size="sm">Decline</Button>
      <Button size="sm">Accept</Button>
    </>
  }
/>`}
    >
      <div className="w-full">
        <CookieBanner
          actions={
            <>
              <Button variant="secondary" size="sm">
                Decline
              </Button>
              <Button size="sm">Accept</Button>
            </>
          }
        />
      </div>
    </ComponentPlayground>
  );
}
