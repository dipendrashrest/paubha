"use client";

import {
  Avatar,
  AvatarAddButton,
  AvatarGroup,
  AvatarLabelGroup,
  AvatarProfilePhoto,
} from "@paubha/registry/ui/avatar";
import { ComponentPlayground } from "../_shared/component-playground";

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
const addButtonSizes = ["md", "lg", "xl"] as const;

const portrait = (fill: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="${fill}"/><circle cx="40" cy="30" r="14" fill="#ffffff" fill-opacity="0.9"/><ellipse cx="40" cy="72" rx="24" ry="20" fill="#ffffff" fill-opacity="0.9"/></svg>`,
  )}`;

const maya = portrait("#2450EA");
const rio = portrait("#1C3FD1");
const ken = portrait("#1E37A9");
const ana = portrait("#3B63F5");

export function AvatarHero() {
  return (
    <ComponentPlayground
      code={`<Avatar src="/maya.jpg" alt="Maya Chen" />
<Avatar initials="MC" alt="Maya Chen" />
<Avatar src="/maya.jpg" alt="Maya Chen" indicator="online" />`}
    >
      <Avatar src={maya} alt="Maya Chen" />
      <Avatar initials="MC" alt="Maya Chen" />
      <Avatar src={maya} alt="Maya Chen" indicator="online" />
    </ComponentPlayground>
  );
}

export function AvatarSizes() {
  return (
    <ComponentPlayground
      code={sizes
        .map(
          (size) => `<Avatar size="${size}" initials="MC" alt="Maya Chen" />`,
        )
        .join("\n")}
    >
      {sizes.map((size) => (
        <Avatar key={size} size={size} initials="MC" alt="Maya Chen" />
      ))}
    </ComponentPlayground>
  );
}

export function AvatarImageFallback() {
  return (
    <ComponentPlayground
      code={`<Avatar src="/broken.jpg" alt="Maya Chen" initials="MC" />
<Avatar alt="Maya Chen" />
<Avatar initials="MC" />`}
    >
      <Avatar src="/broken.jpg" alt="Maya Chen" initials="MC" />
      <Avatar alt="Maya Chen" />
      <Avatar initials="MC" />
    </ComponentPlayground>
  );
}

const indicators = ["online", "offline", "company", "verified"] as const;
const profileSizes = ["sm", "md", "lg"] as const;
const labelGroupSizes = ["sm", "md", "lg", "xl"] as const;

export function AvatarTypes() {
  return (
    <ComponentPlayground
      code={`<Avatar type="image" src="/maya.jpg" alt="Maya Chen" />
<Avatar type="initials" alt="Maya Chen" />
<Avatar type="icon" alt="Unknown user" />`}
    >
      <Avatar type="image" src={maya} alt="Maya Chen" />
      <Avatar type="initials" alt="Maya Chen" />
      <Avatar type="icon" alt="Unknown user" />
    </ComponentPlayground>
  );
}

export function AvatarIndicators() {
  return (
    <ComponentPlayground
      code={indicators
        .map(
          (indicator) =>
            `<Avatar src="/maya.jpg" alt="Maya Chen" indicator="${indicator}" />`,
        )
        .join("\n")}
    >
      {indicators.map((indicator) => (
        <Avatar
          key={indicator}
          src={maya}
          alt="Maya Chen"
          indicator={indicator}
        />
      ))}
    </ComponentPlayground>
  );
}

export function AvatarProfilePhotoExample() {
  return (
    <ComponentPlayground
      code={`<AvatarProfilePhoto size="sm" alt="Maya Chen" verified />
<AvatarProfilePhoto size="md" src="/maya.jpg" alt="Maya Chen" verified />
<AvatarProfilePhoto size="lg" type="icon" alt="Unknown user" />`}
    >
      <div className="flex items-end gap-4">
        {profileSizes.map((size) => (
          <AvatarProfilePhoto
            key={size}
            size={size}
            src={size === "md" ? maya : undefined}
            type={size === "lg" ? "icon" : undefined}
            alt={size === "lg" ? "Unknown user" : "Maya Chen"}
            verified={size !== "lg"}
          />
        ))}
      </div>
    </ComponentPlayground>
  );
}

export function AvatarGroupExample() {
  return (
    <ComponentPlayground
      code={`<AvatarGroup max={3}>
  <Avatar src="/maya.jpg" alt="Maya Chen" />
  <Avatar src="/rio.jpg" alt="Rio Patel" />
  <Avatar src="/ken.jpg" alt="Ken Okada" />
  <Avatar src="/ana.jpg" alt="Ana Silva" />
  <Avatar initials="JD" alt="Jordan Diaz" />
</AvatarGroup>`}
    >
      <AvatarGroup max={3}>
        <Avatar src={maya} alt="Maya Chen" />
        <Avatar src={rio} alt="Rio Patel" />
        <Avatar src={ken} alt="Ken Okada" />
        <Avatar src={ana} alt="Ana Silva" />
        <Avatar initials="JD" alt="Jordan Diaz" />
      </AvatarGroup>
    </ComponentPlayground>
  );
}

export function AvatarLabelGroupExample() {
  return (
    <ComponentPlayground
      code={`<AvatarLabelGroup
  size="md"
  avatar={<Avatar src="/maya.jpg" alt="Anastasia Upton" initials="AU" />}
  name="Anastasia Upton"
  secondaryText="anastasia@example.com"
/>`}
    >
      <div className="flex flex-col gap-4">
        {labelGroupSizes.map((size) => (
          <AvatarLabelGroup
            key={size}
            size={size}
            avatar={<Avatar src={maya} alt="Anastasia Upton" initials="AU" />}
            name="Anastasia Upton"
            secondaryText="anastasia@example.com"
          />
        ))}
      </div>
    </ComponentPlayground>
  );
}

export function AvatarAddButtonSizes() {
  return (
    <ComponentPlayground
      code={addButtonSizes
        .map((size) => `<AvatarAddButton size="${size}" aria-label="Add" />`)
        .join("\n")}
    >
      {addButtonSizes.map((size) => (
        <AvatarAddButton key={size} size={size} />
      ))}
    </ComponentPlayground>
  );
}

export function AvatarAddButtonWithGroup() {
  return (
    <ComponentPlayground
      code={`<AvatarGroup max={3}>
  <Avatar src="/maya.jpg" alt="Maya Chen" />
  <Avatar src="/rio.jpg" alt="Rio Patel" />
  <Avatar src="/ken.jpg" alt="Ken Okada" />
</AvatarGroup>
<AvatarAddButton aria-label="Add team member" />`}
    >
      <div className="flex items-center gap-3">
        <AvatarGroup max={3}>
          <Avatar src={maya} alt="Maya Chen" />
          <Avatar src={rio} alt="Rio Patel" />
          <Avatar src={ken} alt="Ken Okada" />
        </AvatarGroup>
        <AvatarAddButton aria-label="Add team member" />
      </div>
    </ComponentPlayground>
  );
}
