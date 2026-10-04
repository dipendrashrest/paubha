"use client";

import { Badge } from "@paubha/registry/ui/badge";
import { ArrowRight, Bell, Star } from "lucide-react";
import { ComponentPlayground } from "../_shared/component-playground";

const variants = ["gray", "brand", "success", "warning", "error"] as const;

export function BadgeHero() {
  return (
    <ComponentPlayground
      code={`<Badge>Gray</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>`}
    >
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </ComponentPlayground>
  );
}

export function BadgeFillStyles() {
  return (
    <ComponentPlayground
      code={`<Badge variant="brand" fill="subtle">Subtle</Badge>
<Badge variant="brand" fill="outline">Outline</Badge>
<Badge variant="brand" fill="solid">Solid</Badge>`}
    >
      <Badge variant="brand" fill="subtle">
        Subtle
      </Badge>
      <Badge variant="brand" fill="outline">
        Outline
      </Badge>
      <Badge variant="brand" fill="solid">
        Solid
      </Badge>
    </ComponentPlayground>
  );
}

export function BadgeSizes() {
  return (
    <ComponentPlayground
      code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
    >
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </ComponentPlayground>
  );
}

export function BadgeWithDot() {
  return (
    <ComponentPlayground
      code={`<Badge variant="success" showDot>Active</Badge>`}
    >
      <Badge variant="success" showDot>
        Active
      </Badge>
    </ComponentPlayground>
  );
}

export function BadgeDismissible() {
  return (
    <ComponentPlayground
      code={`<Badge
  dismissible
  dismissLabel="Remove Design category"
  onDismiss={() => alert("Removed")}
>
  Design
</Badge>`}
    >
      <Badge
        dismissible
        dismissLabel="Remove Design category"
        onDismiss={() => alert("Removed")}
      >
        Design
      </Badge>
    </ComponentPlayground>
  );
}

export function BadgeWithIcons() {
  return (
    <ComponentPlayground
      code={`<Badge variant="brand" leadingIcon={<Star />}>Featured</Badge>
<Badge variant="success" trailingIcon={<ArrowRight />}>Completed</Badge>`}
    >
      <Badge variant="brand" leadingIcon={<Star />}>
        Featured
      </Badge>
      <Badge variant="success" trailingIcon={<ArrowRight />}>
        Completed
      </Badge>
    </ComponentPlayground>
  );
}

export function BadgeIconOnly() {
  return (
    <ComponentPlayground
      code={`<Badge iconOnly aria-label="Notifications"><Bell /></Badge>
<Badge iconOnly size="md" variant="brand" fill="solid" aria-label="Notifications">
  <Bell />
</Badge>`}
    >
      <Badge iconOnly aria-label="Notifications">
        <Bell />
      </Badge>
      <Badge
        iconOnly
        size="md"
        variant="brand"
        fill="solid"
        aria-label="Notifications"
      >
        <Bell />
      </Badge>
    </ComponentPlayground>
  );
}
