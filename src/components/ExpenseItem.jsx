import { Link, useFetcher } from "react-router-dom";
import {
  wait,
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
  deleteItem,
} from "../helpers";

//library
import { TrashIcon } from "@heroicons/react/24/solid";

// library imports
import { toast } from "react-toastify";

//action
export async function expenseAction({ request }) {
  await wait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //delete expense
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}
/* eslint-disable react/prop-types */
const ExpenseItem = ({ expense, showBudget = true }) => {
  const fetcher = useFetcher();
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createAt)}</td>
      <td>
        {showBudget && (
          <Link
            to={`/budget/${budget.id}`}
            style={{
              "--accent": budget.color,
            }}
          >
            {budget.name}
          </Link>
        )}
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
