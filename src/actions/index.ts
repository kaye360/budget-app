import { budget } from "../features/budgets/budgets.actions";
import { summary } from "../features/budgets/summaries.actions";
import { accounts } from "../features/settings/settings.actions";
import { transaction } from "../features/transactions/actions/transaction.actions";

export const server = {
    transaction,
    budget,
    summary,
    accounts,
}