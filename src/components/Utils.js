export const User = {
    firstName: '',
    lastName: '',
    id: 0
}

export const fetchUsers = () => {
    return [
        { firstName: 'Jim', lastName: 'Bob', expenses: generateExpenses(), id: 0 },
        { firstName: 'Ben', lastName: 'Hogan', expenses: generateExpenses(), id: 1 },
        { firstName: 'Jane', lastName: 'Doe', expenses: generateExpenses(), id: 2 },
        { firstName: 'Random', lastName: 'Person', expenses: generateExpenses(), id: 3 },
        { firstName: 'Michael', lastName: 'Scott', expenses: generateExpenses(), id: 4 },
        { firstName: 'Dwight', lastName: 'Schrute', expenses: generateExpenses(), id: 5 }
    ]
}

export const expenseCategories = () => {
    return [{name: ExpenseCategroyEnum.FOOD}, {name: ExpenseCategroyEnum.TRAVEL}, {name: ExpenseCategroyEnum.HEALTH}, {name: ExpenseCategroyEnum.SUPPLIES}]
}

export const ExpenseCategroyEnum = {
    FOOD: 'Food',
    TRAVEL: 'Travel',
    HEALTH: 'Health',
    SUPPLIES: 'Supplies'
}
function generateExpenses() {
    return {
        Food: Math.floor(Math.random() * 100),
        Travel: Math.floor(Math.random() * 100),
        Health: Math.floor(Math.random() * 100),
        Supplies: Math.floor(Math.random() * 100)
    }
}