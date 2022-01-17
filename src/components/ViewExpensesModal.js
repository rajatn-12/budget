
import React from "react";
import {  Modal, Button , Stack} from "react-bootstrap";

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";


{/* in order to get "budget" we pass "BudgetId" */}
export default function ViewExpensesModal({budgetId, handleClose })
 
{
    
    
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense} = 
    useBudgets()

    const expenses = getBudgetExpenses(budgetId);
    {/* Used to get list of"Expenses" by clicking on "View Expemses" of particuakr Budget ID */}

    const budget =  
    UNCATEGORIZED_BUDGET_ID === budgetId ? {name:"Uncategorized", id: UNCATEGORIZED_BUDGET_ID} : budgets.find(b => b.id === budgetId)

    /* in order to get actual Budget */
    return (
        <Modal show={budgetId != null} onHide={handleClose} >
             
               
                   <Modal.Header closeButton>
                       <Modal.Title>
                           
                           <Stack direction="horizontal" gap="2">

                               {/* This is "Header" Section when we click on "View Expenses" */}
                               
                                  <div>Expenses - {budget?.name}</div>
                                  {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                      <Button onClick={() => {
                                          deleteBudget(budget)
                                          handleClose()
                                      }} 
                                      variant="outline-danger"
                                      >
                                          Delete</Button>
                                  )}
                           </Stack>
                           </Modal.Title>
                   </Modal.Header>
                   <Modal.Body>

                       {/* This is used to show the Expenses in Body */}

                       <Stack direction="vertical" gap="3">
                           {expenses.map(expense => (
                               <Stack direction="horizontal" gap="2" key={expense.id}>
                                      <div className="me-auto fs-4">{expense.description}</div>
                                      <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                                      <Button 
                                      onClick={() => deleteExpense(expense)}
                                      
                                      //Used To delete Expenses (unnecssary)

                                      size="sm" 
                                      variant="outline-danger">
                                          &times;
                                      </Button>
                                   </Stack>
                           ))}
                       </Stack>
                       </Modal.Body>
             
        </Modal>
    )
}