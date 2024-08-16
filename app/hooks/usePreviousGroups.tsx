"use client"

import { useState, useEffect } from "react";
import { Group } from "@/app/interfaces/Interfaces"
import { getPreviousGroups } from "@/app/lib/LocalStorageWrapper";

export const usePreviousGroups = () => {
    const [groups, setGroups] = useState<Group[]>([]);


    // Load initial tags from localStorage if they exist
    useEffect(() => {
        const storedTags = getPreviousGroups();
        if (storedTags) {
            setGroups(storedTags);
        }
    }, []);

    return {groups, setGroups}
}