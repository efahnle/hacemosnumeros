"use client"

import { ExpenseItem, Group } from "@/app/interfaces/Interfaces";

const LOCAL_STORAGE_KEY = "data";


function getSavedData(): Group[] {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : [];
}

function saveData(data: Group[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export function initializeDataForNewGroup(groupName: string, names: string[]): number {
    const savedData = getSavedData();
    const newGroup: Group = {
        group_name: groupName,
        names,
        expenses: []
    };

    savedData.push(newGroup);
    saveData(savedData);

    return savedData.length - 1; // Return the index of the newly added group
}

export function getDataInIndex(index: number): Group {
    const savedData = getSavedData();
    return savedData[index];
}

export function deleteExpenseInGroup(expenseIndex: number, groupIndex: number): void {
    const savedData = getSavedData();
    if (savedData[groupIndex]) {
        savedData[groupIndex].expenses.splice(expenseIndex, 1);
        saveData(savedData);
    }
}

export function getPreviousGroups(): Group[] {
    return getSavedData();
}

export function addExpenseToGroup(expense: ExpenseItem, groupIndex: number): void {
    const savedData = getSavedData();

    if (savedData[groupIndex]) {
        savedData[groupIndex].expenses.push(expense);
        saveData(savedData);
    } else {
        console.error(`Group at index ${groupIndex} does not exist.`);
    }
}


export function getExpenseFromGroup(expenseIndex: number, groupIndex: number): ExpenseItem {
    const group_data = getDataInIndex(groupIndex);
    return group_data.expenses[expenseIndex];
}

export function updateExpenseInGroup(expenseIndex: number, groupIndex: number, newExpenseData: ExpenseItem): void {
    const savedData = getSavedData();

    if (savedData[groupIndex] && savedData[groupIndex].expenses[expenseIndex]) {
        savedData[groupIndex].expenses[expenseIndex] = newExpenseData;
        saveData(savedData);
    } else {
        console.error(`Expense at index ${expenseIndex} in group ${groupIndex} does not exist.`);
    }
}