import React, { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icone } from "@/components/Icone/icone";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GraficoContainerProps {
  titulografico: string;
  children: ReactNode;
  onclick?: () => void;
  textoInfo: string;
  showButton?: boolean;
}

const Grafico: React.FC<GraficoContainerProps> = ({
  titulografico,
  children,
  onclick,
  showButton = false,
  textoInfo,
}) => (
    <Card className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{titulografico}</CardTitle>
        <div className="flex items-center ">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex items-center justify-center bg-muted rounded-md w-8 h-8 hover:bg-muted/50 transition-colors cursor-pointer">
                 <Icone nome="CircleQuestionMark"/>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle hidden />
                <AlertDialogDescription>{textoInfo}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction className="cursor-pointer">Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {showButton && (
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8 cursor-pointer hover:bg-muted/50"
              onClick={onclick}
            >
             <Icone nome="ArrowUpRight"/>
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
export default Grafico;
