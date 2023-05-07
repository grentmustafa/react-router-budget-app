//rrd imports
import { redirect } from "react-router-dom";

//helpers
import { deleteItem } from "../helpers";

//library
import { toast } from "react-toastify";

export async function logoutAction() {
  //delete the user
  deleteItem({
    key: "userName",
  });

  //delete the budgets
  deleteItem({
    key: "budgets",
  });

  //delete the expenses
  deleteItem({
    key: "expenses",
  });

  toast.success("You've deleted your account!");

  //return redirect
  return redirect("/");
}
