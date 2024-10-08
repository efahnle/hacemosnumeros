import { ExpenseItem, Group } from "@/app/interfaces/Interfaces";

const LOCAL_STORAGE_KEY = "data";

// Non exported internal functions

function getSavedData(): Group[] {
    if (typeof window !== 'undefined') {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : [];
    }
    return []; 
}

function saveData(data: Group[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

function updateGroupInIndex(groupIndex: number, group: Group){
    let allgroups = getSavedData();
    allgroups[groupIndex] = group;
    saveData(allgroups);
}

function handleExpenseReassignmentOrDeletion(groupIndex: number, removedParticipants: string[]) {
    let newgroupdata = getDataInIndex(groupIndex);
    const filteredExpenses = newgroupdata.expenses.filter(expense => !removedParticipants.includes(expense.payer));

    const updatedExpenses = filteredExpenses.map(expense => {
        const newParticipants = expense.participants.filter(participant => !removedParticipants.includes(participant));
        return {
            ...expense,
            participants: newParticipants
        };
    });
    newgroupdata.expenses = updatedExpenses;
    
    updateGroupInIndex(groupIndex,newgroupdata);
}


// Public exported functions

export function initializeDataForNewGroup(groupName: string, names: string[]): number {
    const savedData = getSavedData();
    const newGroup: Group = {
        group_name: groupName,
        names,
        expenses: []
    };

    savedData.push(newGroup);
    saveData(savedData);

    return savedData.length - 1;
}

// GETs
export function getDataInIndex(index: number): Group {
    const savedData = getSavedData();
    return savedData[index];
}

export function getPreviousGroups(): Group[] {
    return getSavedData();
}

export function getExpensesFromGroup(groupIndex: number): ExpenseItem[] {
    const group_data = getDataInIndex(groupIndex);
    if (group_data) {
        return group_data.expenses;
    } else {
        console.error(`Group at index ${groupIndex} does not exist.`);
        return [];
    }
}

export function getExpenseFromGroup(expenseIndex: number, groupIndex: number): ExpenseItem  {
    const expenses = getExpensesFromGroup(groupIndex);
    return expenses[expenseIndex];
}


export function getNamesInGroup(groupIndex: number): string[] | undefined {
    const group_data = getDataInIndex(groupIndex);
    return group_data ? group_data.names : undefined;
}

export function getGroupNameInGroup(groupIndex: number): string | undefined {
    const group_data = getDataInIndex(groupIndex);
    return group_data ? group_data.group_name : undefined;
}

//UPDATE
export function updateExpenseInGroup(expenseIndex: number, groupIndex: number, newExpenseData: ExpenseItem): void {
    const savedData = getSavedData();

    if (savedData[groupIndex] && savedData[groupIndex].expenses[expenseIndex]) {
        savedData[groupIndex].expenses[expenseIndex] = newExpenseData;
        saveData(savedData);
    } else {
        console.error(`Expense at index ${expenseIndex} in group ${groupIndex} does not exist.`);
    }
}

export function updateGroupNameAndParticipants(groupIndex: number, newGroupName: string, newNames: string[], removedParticipants: string[]): void {
    const savedData = getSavedData();

    if (savedData[groupIndex]) {
        savedData[groupIndex].group_name = newGroupName;
        savedData[groupIndex].names = newNames;

        saveData(savedData);
    } else {
        console.error(`Group at index ${groupIndex} does not exist.`);
    }
    handleExpenseReassignmentOrDeletion(groupIndex, removedParticipants);
}


//ADD
export function addExpenseToGroup(expense: ExpenseItem, groupIndex: number): void {
    const savedData = getSavedData();

    if (savedData[groupIndex]) {
        savedData[groupIndex].expenses.push(expense);
        saveData(savedData);
    } else {
        console.error(`Group at index ${groupIndex} does not exist.`);
    }
}

//DELETE
export function deleteExpenseInGroup(expenseIndex: number, groupIndex: number): void {
    const savedData = getSavedData();
    if (savedData[groupIndex]) {
        savedData[groupIndex].expenses.splice(expenseIndex, 1);
        saveData(savedData);
    }
}

export function deleteGroup(groupIndex: number): void {
    const savedData = getSavedData();
    if (savedData[groupIndex]) {
        savedData.splice(groupIndex, 1);
        saveData(savedData);
    }
}