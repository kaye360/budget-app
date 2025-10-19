

export default function TransactionList({children} : {children : any}) {
    return(
        <div className="grid [&>:nth-of-type(odd)]:bg-blue/10 gap-2 [&:has(.selected)]:[&_form:not(.selected)]:opacity-20 [&_form]:opacity-100 [&_form]:transition-opacity">
            {children}
        </div>
    )
}