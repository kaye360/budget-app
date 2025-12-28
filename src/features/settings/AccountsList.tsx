import { CreditCardIcon, Trash2Icon } from "lucide-react"
import type { Account, CreateAccount } from "./accounts.schema"
import { useRef, useState, type FormEvent } from "react"
import { actions } from "astro:actions"
import { getFormData } from "../app/form.utils"
import { els } from "../../lib/el"
import { LoadingButton, useLoadingButtonStatus } from "../../components/Button/LoadingButton.tsx"
import CancelButton from "../../components/Button/CancelButton.tsx"
import EditButton from "../../components/Button/EditButton.tsx"

interface Props {
    accounts : Account[]
}

export default function AccountsList( {accounts : initialAccounts} : Props ) {

    const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const saveStatus = useLoadingButtonStatus()
    const createStatus = useLoadingButtonStatus()
    
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

        saveStatus.setAsLoading()

        const response = await actions.accounts.update(accounts)

        if( response.error ) {
            saveStatus.setAsInitial()
            throw new Error(response.error.message)
        }

        lastSavedAccounts.current = accounts
        saveStatus.setAsComplete()
        setIsEditing(false)
    }

    const handleCancel = () => {
        setAccounts(lastSavedAccounts.current)
        setIsEditing(false)
    }

    const handleCreate = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        createStatus.setAsLoading()

        const formData = getFormData(e.currentTarget)
        const createAccount = {
            userId : 1,
            ...formData
        } as CreateAccount

        const response = await actions.accounts.store(createAccount)

        if( response.error ) {
            createStatus.setAsInitial()
            throw new Error( response.error.message )
        }

        createStatus.setAsComplete()

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
            <div className="flex items-end justify-between my-4 bg-red`">
                <h2 className="font-semibold text-lg">
                    Bank Accounts
                </h2>
                { isEditing ? (
                    <>
                        <LoadingButton 
                            state={saveStatus} 
                            onClick={handleSave} 
                            className="ml-auto" 
                        />
                        <CancelButton onClick={handleCancel} />
                    </>
                ) : (
                    <EditButton onClick={ () => setIsEditing(true) } />
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
                                className="max-w-50" 
                                onChange={ (e) => handleChange(account.id, 'name', e.target.value) }
                            />
                            <input 
                                type="number" 
                                name="number" 
                                defaultValue={account.number} 
                                className="max-w-50" 
                                onChange={ (e) => handleChange(account.id, 'number', e.target.value) }
                            />
                            <button 
                                type="button"
                                className=" shrink-0 active:scale-90 ml-auto"
                                title="Hide Transaction"
                                onClick={ () => handleDelete(account.id) }
                            >
                                <Trash2Icon className="w-6 h-6  hover:stroke-red cursor-pointer" />
                            </button>
                        </>
                    ) : (
                        <span>
                            {account.name} - {account.number}
                        </span>
                    )}
                </div>
            ))}

            <section className="my-6">
                <h2 className="font-semibold text-lg">
                    Add New Account
                </h2>

                <form
                    onSubmit={handleCreate}
                    id="create-account-form"
                    className="flex items-center flex-wrap gap-4"
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
                        className="w-fit"
                    />
                    <LoadingButton state={createStatus} badge="add" type="submit" />
                </form>
            </section>
        </div>
    )
}