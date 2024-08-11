"use client"

const LOCAL_STORAGE_KEY = "data"

export function initializeDataForNewGroup(groupName: string, names: string[]) : number {
    const tmp_saved_data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let saved_data = tmp_saved_data ? JSON.parse(tmp_saved_data) : [];
    const new_data = {
        'group_name': groupName,
        'names': names,
        'expenses': []
    }

    const data_length = saved_data.length;

    if (saved_data) {
        saved_data.push(new_data)
    } else {
        saved_data = [new_data]
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saved_data));
    return data_length;
}

export function getDataInIndex(index: number) {
    const tmp_saved_data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let saved_data = tmp_saved_data ? JSON.parse(tmp_saved_data) : [];
    return saved_data[index];
}


export function deleteExpenseInGroup(expense_index: number, group_index: number ){
    const tmp_saved_data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let saved_data = tmp_saved_data ? JSON.parse(tmp_saved_data) : [];
    saved_data[group_index]['expenses'].delete(expense_index);
}