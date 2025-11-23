"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


interface cardsProps {
    titulo: string
    tituloDesc?: string;
    icone: React.ReactNode;
    dados: React.ReactNode;
    onclick?: () => void;
}

const cards: React.FC<cardsProps> = ({ titulo, tituloDesc, icone, dados, onclick }) => (
    <section className="flex flex-col rounded-lg w-full mb-2.5 ">
        < Card onClick={onclick} className="  transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
            <CardHeader>
                <div className="flex items-center justify-center"  >
                    <CardTitle className="text-[15px] text-gray-800 select-none
                    sm:text-lg">
                        {titulo}
                    </CardTitle>
                    <span className="ml-auto w-4 h-5 ">{icone}</span>
                </div>
                <CardDescription className="text-xs">
                    {tituloDesc}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p className=" text-base sm:text-lg font-bold">
                    {dados}
                </p>
            </CardContent>
        </Card >
    </section >
)
export default cards;