type DebtMap = Record<string, Record<string, number>>;

export default function initialize_debtmap ( participants: string[]) {
    const debtmap : DebtMap = {};

    participants.forEach(participant => {
        debtmap[participant] = {};
    })

    return debtmap;
}