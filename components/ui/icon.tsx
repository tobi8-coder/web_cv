import {
  Award,
  Blocks,
  Braces,
  Cloud,
  Database,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
  Server,
  Wrench,
  type LucideProps,
} from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";

/**
 * Maps the string keys used in `lib/data.ts` to concrete icon components, so
 * the data layer never has to import React components.
 */
const registry = {
  blocks: Blocks,
  code: Braces,
  layout: MonitorSmartphone,
  server: Server,
  database: Database,
  wrench: Wrench,
  cloud: Cloud,
  award: Award,
  mail: Mail,
  phone: Phone,
  map: MapPin,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
} as const;

export type IconName = keyof typeof registry;

export function Icon({
  name,
  ...props
}: { name: IconName } & Omit<LucideProps, "ref"> & { size?: number }) {
  const Component = registry[name];
  return <Component aria-hidden="true" {...props} />;
}
