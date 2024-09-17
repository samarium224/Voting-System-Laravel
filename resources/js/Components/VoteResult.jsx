import React from "react";

export default function VoteResult({ candidates_info, totalvotes }) {
  return (
    <>
      {candidates_info.map((candidate) => {
        // Calculate the percentage of votes for the candidate
        const votePercentage = totalvotes ? (candidate.got_votes / totalvotes) * 100 : 0;

        return (
          <div className="flex px-6 py-4 flex-col gap-1.5" key={candidate.id}>
            <div className="basis-1/6 dark:text-white text-slate-800 text-lg">{candidate.name}</div>
            <div className="basis-5/6 mt-1">
              <span id="ProgressLabel" className="sr-only dark:text-slate-100 text-slate-800">
                {candidate.name} - {votePercentage.toFixed(2)}%
              </span>

              <span
                role="progressbar"
                aria-labelledby="ProgressLabel"
                aria-valuenow={votePercentage.toFixed(2)}
                aria-valuemin="0"
                aria-valuemax="100"
                className="block rounded-full bg-gray-200"
              >
                {/* Dynamic width using template literal */}
                <span
                  className={`block h-4 rounded-full bg-indigo-600 text-center text-[10px]/4`}
                  style={{ width: `${votePercentage}%` }}
                >
                  <span className="font-bold text-white">
                    {candidate.got_votes} votes ({votePercentage.toFixed(2)}%)
                  </span>
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
