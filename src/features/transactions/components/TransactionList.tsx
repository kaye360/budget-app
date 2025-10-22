

export default function TransactionList({children} : {children : any}) {
    return(
        <div className="
            grid gap-2
            [&>form:nth-of-type(odd)]:bg-blue/10
            [&>astro-island:nth-of-type(odd)_form]:bg-blue/10
            [&:has(.selected)]:[&_form:not(.selected)]:opacity-20
            [&_form]:opacity-100 [&_form]:transition-opacity
        ">
            {children}
        </div>
    )
}