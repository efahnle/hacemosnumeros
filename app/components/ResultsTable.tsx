import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineUp, AiOutlineUser, AiOutlineTeam } from "react-icons/ai";


interface DebtMap {
  [key: string]: {
    [key: string]: number;
  };
}

interface ResultsTableProps {
  debtMap: DebtMap;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ debtMap }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (persona: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [persona]: !prev[persona]
    }));
  };

  return (
    <div className="overflow-x-auto text-center object-top text-xs sm:text-l md:text-2xl items-center p-2 mt-12">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="text-lg px-1 py-0.5 sm:px-4 sm:py-2 lg:px-8 lg:py-4 border-b">Persona</th>
            <th className="text-lg text-nowrap px-1 py-0.5 sm:px-4 sm:py-2 lg:px-8 lg:py-4 border-b">Debe o Cobra</th>
            <th className="text-lg px-1 py-0.5 sm:px-4 sm:py-2 lg:px-8 lg:py-4 border-b">Total</th>
            <th className="text-lg px-1 py-0.5 sm:px-4 sm:py-2 lg:px-8 lg:py-4 border-b">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(debtMap).map(persona => {
            const owesToOthers = Object.keys(debtMap[persona]).filter(to => debtMap[persona][to] > 0);
            const owedByOthers = Object.keys(debtMap).filter(from => debtMap[from][persona] > 0);
            const owesTotal = owesToOthers.reduce((acc, to) => acc + debtMap[persona][to], 0);
            const owedTotal = owedByOthers.reduce((acc, from) => acc + debtMap[from][persona], 0);

            return (
              <React.Fragment key={persona}>
                <tr style={{ backgroundColor: owesTotal > 0 ? "rgb(252 165 165)" : "rgb(134 239 172)"}}>
                  <td className="text-base px-1 py-0.5 border-b">{persona}</td>
                  <td className="text-base px-1 py-0.5 border-b">


                    {owesTotal > 0 ? (
                      <span className="flex  justify-center items-center">
                        Debe ({owesToOthers.length})
                        {owesToOthers.length === 1 ? <AiOutlineUser className="ml-2" /> : <AiOutlineTeam className="ml-2" />}
                      </span>
                    ) : owedTotal > 0 ? (
                      <span className="flex justify-center items-center">
                        Cobra ({owedByOthers.length})
                        {owedByOthers.length === 1 ? <AiOutlineUser className="ml-2" /> : <AiOutlineTeam className="ml-2" />}
                      </span>
                    ) : (
                      'None'
                    )}

                  </td>
                  <td className="text-base px-1 py-0.5 border-b">
                    ${owesTotal > 0 ? owesTotal.toFixed(2) : owedTotal > 0 ? owedTotal.toFixed(2) : 0}
                  </td>
                  <td className="text-base px-1 py-0.5 border-b">
                    {(owesTotal > 0 || owedTotal > 0) && (
                      <button onClick={() => toggleRow(persona)}>
                        {expandedRows[persona] ? <AiOutlineUp /> : <AiOutlineDown /> }
                      </button>
                    )}
                  </td>
                </tr>
                {expandedRows[persona] && (
                  <>
                    {owesToOthers.map((to, index) => (
                      <tr key={`${persona}-owes-${to}-${index}`} className="bg-gray-100 text-red-400">
                        <td className="text-sm px-1 py-0.5 border-b">{persona}</td>
                        <td className="text-sm px-1 py-0.5 border-b">Debe a {to}</td>
                        <td className="text-sm px-1 py-0.5 border-b">${debtMap[persona][to].toFixed(2)}</td>
                        <td className="text-sm px-1 py-0.5 border-b"></td>
                      </tr>
                    ))}
                    {owedByOthers.map((from, index) => (
                      <tr key={`${persona}-owed-${from}-${index}`} className="bg-gray-100 text-green-600">
                        <td className="text-sm px-1 py-0.5 border-b">{persona}</td>
                        <td className="text-sm px-1 py-0.5 border-b">Cobra de {from}</td>
                        <td className="text-sm px-1 py-0.5 border-b">${debtMap[from][persona].toFixed(2)}</td>
                        <td className="text-sm px-1 py-0.5 border-b"></td>
                      </tr>
                    ))}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
