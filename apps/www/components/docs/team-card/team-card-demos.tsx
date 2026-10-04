"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { TeamCard, TeamCardGrid } from "@paubha/registry/ui/team-card";
import { ComponentPlayground } from "../_shared/component-playground";

export function TeamCardHero() {
  return (
    <ComponentPlayground
      code={`<TeamCardGrid>
  <TeamCard
    avatar={<Avatar initials="AR" alt="Ava Ruiz" size="md" />}
    name="Ava Ruiz"
    role="Design systems"
  />
  <TeamCard
    avatar={<Avatar initials="JK" alt="Jules Kim" size="md" />}
    name="Jules Kim"
    role="Design"
  />
</TeamCardGrid>`}
    >
      <TeamCardGrid className="max-w-lg">
        <TeamCard
          avatar={<Avatar initials="AR" alt="Ava Ruiz" size="md" />}
          name="Ava Ruiz"
          role="Design systems"
        />
        <TeamCard
          avatar={<Avatar initials="JK" alt="Jules Kim" size="md" />}
          name="Jules Kim"
          role="Design"
        />
      </TeamCardGrid>
    </ComponentPlayground>
  );
}
