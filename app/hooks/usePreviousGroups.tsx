"use client"

import { useState, useEffect } from "react";

interface ExpenseItem {
    payer: string;
    description: string;
    participants: [string];
    amount: number;
  }

export const usePreviousGroups = () => {
    const [groups, setGroups] = useState<ExpenseItem[]>([]);


    // Load initial tags from localStorage if they exist
    useEffect(() => {
        const storedTags = localStorage.getItem('expenses');
        if (storedTags) {
            setGroups(JSON.parse(storedTags));
        }
    }, []);

    return {groups, setGroups}
}