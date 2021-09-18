import React, { useState, useEffect } from 'react'
import Users from './Users'

function CompanyExpense({ users }) {
    const [companyData, setcompanyData] = useState(null)
    const transformUserData = () => {
        if (Array.isArray(users) && users.length > 0 && !companyData) {
            let tempData = {
                'Food': 0,
                'Travel': 0,
                'Health': 0,
                'Supplies': 0
            }
            for (let i = 0; i < users.length; i++) {
                tempData.Food += users[i].expenses.Food
                tempData.Travel += users[i].expenses.Travel
                tempData.Health += users[i].expenses.Health
                tempData.Supplies += users[i].expenses.Supplies
            }
            setcompanyData(tempData)
        }
    }
    transformUserData()
    return (
        <div>
            <h1>Company Expense</h1>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Total Expense</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Food</td>
                        <td>{companyData ? companyData.Food : 0}</td>
                    </tr>
                    <tr>
                        <td>Travel</td>
                        <td>{companyData ? companyData.Travel : 0}</td>
                    </tr>
                    <tr>
                        <td>Health</td>
                        <td>{companyData ? companyData.Health : 0}</td>
                    </tr>
                    <tr>
                        <td>Supplies</td>
                        <td>{companyData ? companyData.Supplies: 0}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CompanyExpense
