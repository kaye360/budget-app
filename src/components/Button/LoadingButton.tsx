import { CircleCheckIcon, CirclePlusIcon, LoaderCircleIcon, type LucideProps, SaveIcon } from "lucide-react"
import { useEffect, useState, type ButtonHTMLAttributes, type ForwardRefExoticComponent, type RefAttributes } from "react"
import { LoadingButtonBadge } from "./LoadingButtonBadge"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    state : ReturnType<typeof useLoadingButtonStatus>,
    icon? : ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    badge? : 'add' 
}

export function LoadingButton({state, title, type, icon, badge, ...props } : Props) {

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
            className="shrink-0 active:scale-90 relative"
            disabled={state.status !== 'initial'}
            title={title ?? 'Save Changes'}
            {...props}
        >
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