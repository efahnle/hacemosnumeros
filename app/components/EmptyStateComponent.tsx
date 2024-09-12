import EmptyStateExpenses from "@/app/ui/images/empty-state-expenses.png";
import Image from "next/image";


const EmptyStateComponent = ({ onCreateNew }: { onCreateNew: () => void }) => {
    return (
        <div className="text-center">
            <p className="text-lg mt-8">Todavia no agregaste ningún gasto en esta juntada </p>
            <div  className="flex items-center justify-center object-center ">
                <Image
                    src={EmptyStateExpenses}
                    alt="Picture of freepik"
                    width={300}
                    height={300}
                />
            </div>

            <button onClick={onCreateNew} className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md">
                Agregá tu primer gasto
            </button>
        </div>
    );
};

export default EmptyStateComponent;
