"use client";


import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex w-full bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 py-5 mt-10">
            {/* Geral */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/home"
                  className="flex h-10 w-10 shrink-0 items-center justify-center 
                  text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icone
                    nome="House"
                    color={pathname === "/home" ? "black" : "gray"}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Geral</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/medico"
                  className="flex h-10 w-10 shrink-0 items-center justify-center 
                  text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icone
                    nome="Stethoscope"
                    color={pathname === "/medico" ? "black" : "gray"}
                  />

                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Vendas</TooltipContent>
            </Tooltip>

            {/* Pedidos */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/pedidos"
                  className="flex h-10 w-10 shrink-0 items-center justify-center 
                  text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icone
                    nome="Hospital"
                    color={pathname === "/pedidos" ? "black" : "gray"}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Pedidos</TooltipContent>
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
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <Icone nome="PanelBottom" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-x flex flex-col">
                <nav className="grid gap-6 text-lg font-medium p-5 text-black">
                  <Link
                    href="/home"
                    className="flex items-center gap-4 px-3 py-2 border border-gray-300 rounded-2xl shadow-sm"
                    onClick={() => setOpen(false)}
                  >
                    <Icone nome="House" />
                    Geral
                  </Link>

                  <Link
                    onClick={() => setOpen(false)}
                    href="/vendas"
                    className="flex items-center gap-4 px-3 py-2 border border-gray-300 rounded-2xl shadow-sm"
                  >
                    <Icone nome="DollarSign" />
                    Vendas
                  </Link>

                  <Link
                    onClick={() => setOpen(false)}
                    href="/pedidos"
                    className="flex items-center gap-4 px-3 py-2 border border-gray-300 rounded-2xl shadow-sm"
                  >
                    <Icone nome="ShoppingBag" />
                    Pedidos
                  </Link>

                  <Link
                    onClick={() => setOpen(false)}
                    href="/clientes"
                    className="flex items-center gap-4 px-3 py-2 border border-gray-300 rounded-2xl shadow-sm"
                  >
                    <Icone nome="User" />
                    Clientes
                  </Link>

                  <Link
                    onClick={() => setOpen(false)}
                    href="/titulos"
                    className="flex items-center gap-4 px-3 py-2 border border-gray-300 rounded-2xl shadow-sm"
                  >
                    <Icone nome="Receipt" />
                    Títulos
                  </Link>
                </nav>

                <SheetDescription className="sr-only">
                  Menu de navegação lateral do aplicativo
                </SheetDescription>

                <SheetFooter className="border-t p-5 relative flex items-start">
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-black">
                        Logicom
                      </span>
                      <span className="text-xs text-gray-500">
                        gustavo@email.com
                      </span>
                    </div>
                  </div>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/"
                    className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center"
                  >
                    <Icone nome="LogOut" />
                  </Link>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <h2 className="text-black">Menu</h2>
          </header>
        </div>
      </div>
    </TooltipProvider>
  );
}
