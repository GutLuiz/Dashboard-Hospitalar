import { icons } from "lucide-react";
import type { IconeProps } from "@/types/icone";

export function Icone({ nome, size = 18, color = "black" }: IconeProps) {
  const IconComponent = icons[nome];
  return <IconComponent size={size} color={color} />;
}