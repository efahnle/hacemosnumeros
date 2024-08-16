export interface ExpenseItem {
    payer: string;
    description: string;
    participants: [string];
    amount: number;
}

export interface DebtMap {
    [key: string]: {
        [key: string]: number;
    };
}

export interface Balance {
    person: string;
    amount: number;
}

export interface iTag {
    tags: string[];
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    maxTags: number;
}

export interface Group {
    group_name: string;
    names: string[];
    expenses: ExpenseItem[];
}