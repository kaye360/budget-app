import { XIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

export default function CancelButton( 
    { onClick, title, ...props } : ButtonHTMLAttributes<HTMLButtonElement>
) {
    return (
        <button 
            type="button"
            className="ml-2"
            onClick={onClick}
            title={title ?? 'Cancel'}
            {...props}
        >
            <XIcon className="stroke-slate-400 group-hover:stroke-slate-900 transition-colors hover" />
        </button>
    )
}