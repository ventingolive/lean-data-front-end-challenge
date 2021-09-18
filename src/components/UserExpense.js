import React, { useState, useEffect } from 'react'
import { expenseCategories, ExpenseCategroyEnum } from './Utils'

function UserExpense({ users, onUpdate }) {
    const [inEditMode, setInEditMode] = useState({ status: false, rowKey: null })
    const [availableUsers, setAvailableUsers] = useState({})
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [newUserFullName, setNewUserFullName] = useState('');
    const [editCategory, setEditCategory] = useState('')
    const [editFullName, setEditFullName] = useState('')

    function fetchUserData() {
        let tempUserData = [];
        for (let i = 0; i < users.length; i++) {
            tempUserData.push({ id: users[i].id + '-' + ExpenseCategroyEnum.FOOD, fullName: users[i].firstName + ' ' + users[i].lastName, Category: ExpenseCategroyEnum.FOOD, Cost: users[i].expenses.Food })
            tempUserData.push({ id: users[i].id + '-' + ExpenseCategroyEnum.TRAVEL, fullName: users[i].firstName + ' ' + users[i].lastName, Category: ExpenseCategroyEnum.TRAVEL, Cost: users[i].expenses.Travel })
            tempUserData.push({ id: users[i].id + '-' + ExpenseCategroyEnum.HEALTH, fullName: users[i].firstName + ' ' + users[i].lastName, Category: ExpenseCategroyEnum.HEALTH, Cost: users[i].expenses.Health })
            tempUserData.push({ id: users[i].id + '-' + ExpenseCategroyEnum.SUPPLIES, fullName: users[i].firstName + ' ' + users[i].lastName, Category: ExpenseCategroyEnum.SUPPLIES, Cost: users[i].expenses.Supplies })
        }
        return tempUserData;
    }

    const onEdit = ({ id, currentFirstName, currentLastName }) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        let myAvailableUsers = [];
        for (let i = 0; i < users.length; i++) {
            myAvailableUsers.push(users[i].firstName + ' ' + users[i].lastName)
        }
        setAvailableUsers(myAvailableUsers)
    }

    const onDelete = ({ id }) => {
        const filteredUsers = users.filter((user) => user.id !== id);
        onUpdate(filteredUsers)
    }

    const onAdd = () => {
        // const filteredUsers = users.slice()
        // filteredUsers.push({ firstName: newUserFirstName, lastName: newUserLastName, totalExpense: 0, id: users[filteredUsers.length - 1].id + 1 })
        // onUpdate(filteredUsers)
    }

    const updateUserInfo = ({ id }) => {
        // reset inEditMode and unit price state values
        onCancel();
        //TODO update/add new expense
    }
    const onSave = ({ id }) => {
        updateUserInfo({ id });
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setFirstName(null);
        setLastName(null);
    }
    return (
        <div>
            <h1>User Expenses</h1>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Category</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.length > 0 &&
                        fetchUserData().map((user) => (
                            <tr key={user.id}>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === user.id ? (
                                            <select name="users" onChange={(event) => setEditFullName(event.target.value)}>
                                                {availableUsers.map((user) => (
                                                    <option value={user}>{user}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            user.fullName
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === user.id ? (
                                            <select name="categories" onChange={(event) => setEditCategory(event.target.value)}>
                                                {expenseCategories().map((category) => (
                                                    <option value={category.name}>{category.name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            user.Category
                                        )
                                    }
                                </td>
                                <td>{user.Cost}</td>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === user.id ? (
                                            <React.Fragment>
                                                <button
                                                    className={"btn-success"}
                                                    onClick={() => onSave({ id: user.id, newFirstName: firstName, newLastName: lastName })}
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    className={"btn-secondary"}
                                                    style={{ marginLeft: 8 }}
                                                    onClick={() => onCancel()}
                                                >
                                                    Cancel
                                                </button>
                                            </React.Fragment>
                                        ) : (
                                            <>
                                                <button
                                                    className={"btn-primary"}
                                                    onClick={() => onEdit({ id: user.id, currentFirstName: user.firstName, currentLastName: user.lastName })}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className={"btn-primary"}
                                                    style={{ marginLeft: 8 }}
                                                    onClick={() => onDelete({ id: user.id })}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <input value={newUserFullName} onChange={(event) => setNewUserFullName(event.target.value)} />
            <select name="categories">
                {expenseCategories().map((category) => (
                    <option value={category.name}>{category.name}</option>
                ))}
            </select>
            <button
                className={"btn-primary"}
                onClick={() => onAdd()}
            >
                Add
            </button>
        </div>
    )
}

export default UserExpense
