"use client"

import { ExpenseItem } from "@/app/interfaces/Interfaces";

const LOCAL_STORAGE_KEY = "data";



interface GroupData {
  group_name: string;
  names: string[];
  expenses: ExpenseItem[]; 
}

function getSavedData(): GroupData[] {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : [];
}

function saveData(data: GroupData[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export function initializeDataForNewGroup(groupName: string, names: string[]): number {
  const savedData = getSavedData();
  const newGroup: GroupData = {
    group_name: groupName,
    names,
    expenses: []
  };

  savedData.push(newGroup);
  saveData(savedData);
  
  return savedData.length - 1; // Return the index of the newly added group
}

export function getDataInIndex(index: number): GroupData | undefined {
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

export function getPreviousGroups(): GroupData[] {
  return getSavedData();
}
