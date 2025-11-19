import { icons } from "lucide-react";

export type IconeNome = keyof typeof icons;

export type IconeProps = {
  nome: IconeNome;
  size?: number;
  color?: string;
};