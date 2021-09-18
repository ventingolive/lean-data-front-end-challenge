import React, { useState } from 'react'
import '../App.css'

function Users({ users, onUpdate }) {
    const [inEditMode, setInEditMode] = useState({ status: false, rowKey: null })
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [newUserFirstName, setNewUserFirstName] = useState('');
    const [newUserLastName, setNewUserLastName] = useState('');

    const onEdit = ({ id, currentFirstName, currentLastName }) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setFirstName(currentFirstName);
        setLastName(currentLastName);
    }

    const onDelete = ({ id }) => {
        const filteredUsers = users.filter((user) => user.id !== id);
        onUpdate(filteredUsers)
    }

    const onAdd = () => {
        const filteredUsers = users.slice()
        filteredUsers.push({firstName: newUserFirstName, lastName: newUserLastName, totalExpense: 0, id: users[filteredUsers.length - 1].id + 1})
        onUpdate(filteredUsers)
    }

    const updateUserInfo = ({ id, newFirstName, newLastName }) => {
        // reset inEditMode and unit price state values
        onCancel();
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].firstName = newFirstName
                users[i].lastName = newLastName
            }
        }
        onUpdate(users)
    }
    const onSave = ({ id, newFirstName, newLastName }) => {
        updateUserInfo({ id, newFirstName, newLastName });
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
    
    const generateExpenseTotal = (user) => {
        return user.expenses.Food + user.expenses.Travel + user.expenses.Health + user.expenses.Supplies
    }
    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Total Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === user.id ? (
                                            <input value={firstName}
                                                onChange={(event) => setFirstName(event.target.value)}
                                            />
                                        ) : (
                                            user.firstName
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === user.id ? (
                                            <input value={lastName}
                                                onChange={(event) => setLastName(event.target.value)}
                                            />
                                        ) : (
                                            user.lastName
                                        )
                                    }
                                </td>
                                <td>{generateExpenseTotal(user)}</td>
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
            <input value={newUserFirstName} onChange={(event) => setNewUserFirstName(event.target.value)} />
            <input value={newUserLastName} onChange={(event) => setNewUserLastName(event.target.value)} />
            <button
                className={"btn-primary"}
                onClick={() => onAdd()}
            >
                Add
            </button>
        </div>
    )
}

export default Users
