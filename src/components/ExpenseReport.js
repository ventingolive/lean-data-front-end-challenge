import React, { useState, useEffect } from 'react'
import CompanyExpense from './CompanyExpense'
import UserExpense from './UserExpense'
import Users from './Users'
import { User, fetchUsers } from './Utils'

function ExpenseReport() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(fetchUsers());
    }, []);
    return (
        <div>
            <Users users={users} onUpdate={setUsers}/>
            <UserExpense users={users} onUpdate={setUsers}/>
            <CompanyExpense users={users}/>
        </div>
    )
}

export default ExpenseReport
