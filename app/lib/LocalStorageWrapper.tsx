"use client"

const LOCAL_STORAGE_KEY = "data"

export function initializeExpensesForNewGroup(groupName: string, names: [string]) {
    const tmp_saved_data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let saved_data = tmp_saved_data ? JSON.parse(tmp_saved_data) : [];
    const new_data = {
        'group_name': groupName,
        'names': names,
        'expenses': []
    }

    if (saved_data) {
        saved_data.push(new_data)
    } else {
        saved_data = [new_data]
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saved_data));

}
