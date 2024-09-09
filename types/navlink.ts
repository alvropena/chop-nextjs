import { ReactNode } from "react";

export interface NavLinkProps {
  href: string
  icon: React.ElementType
  children: ReactNode
  isActive: boolean
  lang: string
}
