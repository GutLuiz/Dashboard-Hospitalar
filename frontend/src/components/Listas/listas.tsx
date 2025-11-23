import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Icone } from "@/components/Icone/icone";

import { ArrowUpRight, CircleQuestionMark } from "lucide-react"

interface ListaProps<T> {
    dados: T[];
    colunas: string[];
    renderItem: (item: T, index: number) => React.ReactNode;
    titulo: string;
    onClick?: () => void;
    showButton?: boolean;
    textoInfo: string;
    
}
export default function Lista<T>({
    dados,
    colunas,
    renderItem,
    titulo,
    showButton = false,
    textoInfo,
    onClick,
}: ListaProps<T>) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
            <div className="flex items-center justify-between border-b px-4 py-3">
                <h3 className="text-lg font-semibold">{titulo}</h3>
                <div className="flex items-center gap-2">
                        <AlertDialog >
                                <AlertDialogTrigger className="flex items-center justify-center bg-muted rounded-md size-8 hover:bg-muted/50 transition-colors cursor-pointer">
                                    <Icone nome="CircleQuestionMark"/>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle hidden></AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {textoInfo}
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogAction>Continuar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                        </AlertDialog>
                    {showButton && (
                        <Button variant="secondary" size="icon" className="size-8 cursor-pointer" onClick={onClick}>
                            <Icone nome="ArrowUpRight"/>
                        </Button>
                    )}
                </div>
            </div>
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        {colunas.map((col, idx) => (
                            <TableHead key={idx} className={idx === colunas.length - 1 ? "text-right" : ""}>
                                {col}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dados.map((item, index) => (
                        <TableRow key={index}>
                            {renderItem(item, index)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
