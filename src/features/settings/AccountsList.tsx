import { CircleCheckIcon, CirclePlusIcon, CreditCardIcon, EllipsisVerticalIcon, LoaderCircleIcon, PlusIcon, SaveIcon, Trash2Icon, Wallet, Wallet2Icon, WalletIcon, XIcon } from "lucide-react"
import type { Account, CreateAccount } from "./accounts.schema"
import { useRef, useState, type FormEvent } from "react"
import { actions } from "astro:actions"
import { sleep } from "../app/app.utils"
import { getFormData } from "../app/form.utils"
import { el, els } from "../../lib/el"

interface Props {
    accounts : Account[]
}

export default function AccountsList( {accounts : initialAccounts} : Props ) {

    const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [saveStatus, setSaveStatus] = useState<'initial' | 'saving' | 'saved'>('initial')
    const [createStatus, setCreateStatus] = useState<'initial' | 'creating' | 'created'>('initial')
    
    const lastSavedAccounts = useRef<Account[]>(initialAccounts)

    const handleChange = (id : number, key : keyof Account, value : string) => {
        setAccounts( prev => {
            const updatedAccounts = [...prev]
            const index = updatedAccounts.findIndex( acc => acc.id === id)
            updatedAccounts[index] = {...updatedAccounts[index], [key] : value}
            return updatedAccounts
        })
    }

    const handleSave = async (e: any) => {

        setSaveStatus('saving')

        const response = await actions.accounts.update(accounts)

        if( response.error ) {
            setSaveStatus('initial')
            throw new Error(response.error.message)
        }

        lastSavedAccounts.current = accounts

        setSaveStatus('saved')
        await sleep(1000)
        setSaveStatus('initial')

        setIsEditing(false)
    }

    const handleCancel = () => {
        setAccounts(lastSavedAccounts.current)
        setIsEditing(false)
    }

    const handleCreate = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setCreateStatus('creating')

        const formData = getFormData(e.currentTarget)
        const createAccount = {
            userId : 1,
            ...formData
        } as CreateAccount

        const response = await actions.accounts.store(createAccount)

        if( response.error ) {
            setCreateStatus('initial')
            throw new Error( response.error.message )
        }

        setCreateStatus('created')
        await sleep(1000)
        setCreateStatus('initial')

        const accountsResponse = await actions.accounts.index()

        if( accountsResponse.error ) {
            return
        }

        setAccounts(accountsResponse.data)
        lastSavedAccounts.current = accountsResponse.data

        els<HTMLInputElement>('#create-account-form input', document, input => {
            input.value = ''
        })
    }

    const handleDelete = async (id: number) => {
        const response = await actions.accounts.destroy(id)

        if( response.error ) {
            throw new Error(response.error.message)
        }

        const accountsResponse = await actions.accounts.index()

        if( accountsResponse.error ) {
            return
        }

        setAccounts(accountsResponse.data)
        lastSavedAccounts.current = accountsResponse.data
    }

    return (
        <div>
            <div className="flex items-end justify-center my-4 bg-red`">
                <h2 className="font-semibold">
                    Bank Accounts
                </h2>
                { isEditing ? (
                    <>
                        <button 
                            className="ml-auto"
                            onClick={handleSave}
                            disabled={saveStatus !== 'initial'}
                            title="Save Changes"
                        >
                            { saveStatus === 'initial' && (
                                <SaveIcon className="w-[24px] h-[24px] hover:stroke-red cursor-pointer" />
                            )}
                            { saveStatus === 'saving' && (
                                <LoaderCircleIcon className="w-[24px] h-[24px] animate-spin" />
                            )}
                            { saveStatus === 'saved' && (
                                <CircleCheckIcon className="w-[24px] h-[24px]" />
                            )}
                        </button>
                        <button 
                            type="button"
                            className="ml-2"
                            onClick={handleCancel}
                            title="Cancel edit"
                        >
                            <XIcon className="stroke-slate-400 group-hover:stroke-slate-900 transition-colors hover" />
                        </button>
                    </>
                ) :  (
                    <button 
                        className="ml-auto"
                        onClick={ () => setIsEditing(true) }
                    >
                        <EllipsisVerticalIcon className="text-base-text/60 hover:text-red"/>
                    </button>
                )}
            </div>
            { accounts.map( account => (
                <div 
                    className="border border-blue/20 rounded-xl mb-4 p-4 flex items-center gap-2 hover:bg-blue/5"
                    key={account.id}
                >
                    <CreditCardIcon size={20} className="shrink-0" />

                    { isEditing ? (
                        <>
                            <input 
                                type="text" 
                                name="name" 
                                defaultValue={account.name} 
                                className="max-w-[200px]" 
                                onChange={ (e) => handleChange(account.id, 'name', e.target.value) }
                            />
                            <input 
                                type="number" 
                                name="number" 
                                defaultValue={account.number} 
                                className="max-w-[200px]" 
                                onChange={ (e) => handleChange(account.id, 'number', e.target.value) }
                            />
                            <button 
                                type="button"
                                className=" shrink-0 active:scale-90 ml-auto"
                                title="Hide Transaction"
                                onClick={ () => handleDelete(account.id) }
                            >
                                <Trash2Icon className="w-[24px] h-[24px]  hover:stroke-red cursor-pointer" />
                            </button>
                        </>
                    ) : (
                        <span>
                            {account.name} - {account.number}
                        </span>
                    )}
                </div>
            ))}

            <form
                onSubmit={handleCreate}
                id="create-account-form"
                className="flex items-center gap-4"
            >
                <label htmlFor="name">
                    Account Name
                </label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    className="w-fit"
                />
                <label htmlFor="number">
                    Account Number
                </label>
                <input 
                    type="number"
                    name="number"
                    id="number"
                    className="w-[6rem]"
                />
                <button className="relative max-h-min">
                    { createStatus === 'initial' && (
                        <>
                            <CreditCardIcon size={28} />
                            <CirclePlusIcon 
                                size={20}
                                className="fill-green-600 stroke-2 stroke-white absolute -bottom-1 -right-2" 
                            />
                        </>
                    )}
                    { createStatus === 'creating' && (
                            <LoaderCircleIcon className="w-[24px] h-[24px] animate-spin" />
                    )}
                    { createStatus === 'created' && (
                            <CircleCheckIcon className="w-[24px] h-[24px]" />
                    )}
                </button>
            </form>
        </div>
    )
}