import { useEffect, useRef, useState } from "react"
import { type Props as TransactionProps } from "./Transaction"
import { actions } from "astro:actions"
import TransactionList from "./TransactionList"



interface Props {
    initialTransactions : TransactionProps['transaction'][]
    budgets : TransactionProps['budgets']
    actionButton : TransactionProps['actionButton']
}

export default function InfiniteTransactionList({initialTransactions, actionButton, budgets} : Props) {

    const [transactions, setTransactions] = useState(initialTransactions)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isAtEnd, setIsAtEnd] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const handleMoreTransactionsClick = async () => {

        if( isLoading ) return
        
        setIsLoading(true)
        const moreTransactions = await actions.transaction.index({filter : 'recent', page })

        if( !moreTransactions.data.list ) {
            setIsAtEnd(true)
            return
        }

        setTransactions(prev => [...prev, ...moreTransactions.data.list])
        setPage(prev => prev + 1)
        setIsLoading(false)
    }

    useEffect(() => {
        const observer = new IntersectionObserver( (entries) => {
            if (entries[0].isIntersecting) handleMoreTransactionsClick()
        },
        {
            root: null,          
            rootMargin: "500px",
            threshold: 0
        })

        const btn = buttonRef.current as HTMLButtonElement
        observer.observe(btn)

        return () => observer.unobserve(btn)

    }, [buttonRef, page])

    return(
        <>
            <TransactionList
                transactions={transactions}
                budgets={budgets}
                actionButton={actionButton}
            />

            { !isAtEnd && (
                <button 
                    className="px-4 py-2 mt-4 font-semibold cursor-pointer bg-blue/20 hover:bg-blue/40 active:scale-[98%] rounded w-full text-center "
                    onClick={handleMoreTransactionsClick}
                    ref={buttonRef}
                >
                    { isLoading ? 'Loading more transactions...' : 'More Transactions'}
                </button>
            )}
        </>
    )
}