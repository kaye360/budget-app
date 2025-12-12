import { CircleCheckIcon, CirclePlusIcon, LoaderCircleIcon, type LucideProps, SaveIcon } from "lucide-react"
import { useEffect, useState, type ButtonHTMLAttributes, type ForwardRefExoticComponent, type RefAttributes } from "react"
import { LoadingButtonBadge } from "./LoadingButtonBadge"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    state : ReturnType<typeof useLoadingButtonStatus>,
    icon? : ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    badge? : 'add' 
    text? : string
    className? : string
}

export function LoadingButton({state, title, type, icon, badge, text, className = '', ...props } : Props) {

    // Automatically switch from 'complete' status back to 'initial' status after 1 second
    useEffect( () => {
        if (state.status === 'complete') {
            const timer = setTimeout(state.setAsInitial, 1000)
            return () => clearTimeout(timer)
        }
    }, [state.status])

    const Icon = icon ?? SaveIcon

    return (
        <button 
            type={type ?? 'button'}
            className={`shrink-0 active:scale-90 flex items-center justify-center gap-2 hover:bg-blue/40 rounded font-semibold text-sm ${text ? 'px-3 py-2 w-full bg-blue/60' : 'px-1 py-1 max-w-fit'} ${className}`}
            disabled={state.status !== 'initial'}
            title={title ?? 'Save Changes'}
            {...props}
        >
            { text ?? text}
            <span className="relative inline-block">
                { state.status === 'initial' && (
                    <>
                        { badge === 'add' && <LoadingButtonBadge.Add /> }
                        <Icon className="w-[24px] h-[24px] hover:stroke-red cursor-pointer" />
                    </>
                )}
                { state.status === 'loading' && (
                    <LoaderCircleIcon className="w-[24px] h-[24px] animate-spin" />
                )}
                { state.status === 'complete' && (
                    <CircleCheckIcon className="w-[24px] h-[24px]" />
                )}
            </span>
        </button>
    )
}

export function useLoadingButtonStatus() {
    const [status, setStatus] = useState<'initial' | 'loading' | 'complete'>('initial')
    return { 
        status, 
        setAsInitial : () => setStatus('initial'),
        setAsLoading : () => setStatus('loading'),
        setAsComplete : () => setStatus('complete'),
        isInitial : () => status === 'initial',
        isLoading : () => status === 'loading',
        isComplete : () => status === 'complete'
    }
}