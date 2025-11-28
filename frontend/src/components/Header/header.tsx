"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "@/assets/logoPreto.png";

// Ícones
import { LogOut } from "lucide-react";

// Componentes
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetDescription,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Icone } from "@/components/Icone/icone";

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const active = mounted ? pathname : "";

  return (
    <TooltipProvider>
      <div className="flex w-full bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 py-5 mt-10">
            {/* Geral */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-10 w-10 shrink-0 items-center justify-center 
                  text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icone
                    nome="House"
                    color={active === "/" ? "black" : "gray"}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Geral</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/medicos"
                  className="flex h-10 w-10 shrink-0 items-center justify-center 
                  text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icone
                    nome="Stethoscope"
                    color={active === "/medicos" ? "black" : "gray"}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Medicos</TooltipContent>
            </Tooltip>

            {/* Pedidos */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/internacoes"
                  className="flex h-10 w-10 shrink-0 items-center justify-center 
                  text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icone
                    nome="Hospital"
                    color={active === "/internacoes" ? "black" : "gray"}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Internações</TooltipContent>
            </Tooltip>

            {/* Botão Sair */}
            <div className="mt-auto flex flex-col items-center pb-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className="flex h-10 w-10 shrink-0 items-center justify-center 
                    rounded-full border border-border overflow-hidden text-muted-foreground 
                    transition-colors hover:text-foreground"
                  >
                    <LogOut className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Sair</TooltipContent>
              </Tooltip>
            </div>
          </nav>
        </aside>

        {/* Menu Mobile */}
        <div className="w-full sm:hidden flex flex-col sm:py-4 sm:pl-14">
          <header
            className="w-full sticky top-0 z-30 flex h-14 items-center px-4 border-b gap-4 sm:static
            sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
          >
            {/* ... resto do código igual ... */}
          </header>
        </div>
      </div>
    </TooltipProvider>
  );
}
