import { EllipsisVerticalIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

export default function EditButton( 
    { onClick, title, ...props } : ButtonHTMLAttributes<HTMLButtonElement>
) {
    return (
        <button 
            title={ title ?? 'Edit' }
            onClick={onClick}
            {...props}
        >
            <EllipsisVerticalIcon className="text-base-text/60 hover:text-red"/>
        </button>
    )
}