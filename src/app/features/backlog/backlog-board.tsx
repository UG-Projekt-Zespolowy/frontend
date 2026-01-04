import { IssueCard, IssueSearch, type Issue } from "@/app/features/board/issues";
import { BACKLOG_MIN_HEIGHT } from "@/app/features/backlog/constants/backlog-board.constants";

const MOCK_BACKLOG_ISSUES: readonly Issue[] = [
    { id: "6", title: "Backlog Issue 1", description: "Description for backlog issue 1" },
    { id: "7", title: "Backlog Issue 2", description: "Description for backlog issue 2" },
];

export function BacklogBoard() {
    const allIssues: readonly Issue[] = MOCK_BACKLOG_ISSUES;

    return (
        <div>
            <div className="mb-6">
                <IssueSearch issues={allIssues} />
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-white/30" style={{ minHeight: `${BACKLOG_MIN_HEIGHT}px` }}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-purple-200">
                    Backlog
                </h2>
                {allIssues.length > 0 ? (
                    <div className="space-y-3">
                        {allIssues.map((issue) => (
                            <IssueCard key={issue.id} issue={issue} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-8 italic">No issues in the backlog.</div>
                )}
            </div>
        </div>
    );
}