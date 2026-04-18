type QuestionResult = {
    id: number;
    correct_option: string;
    selected_option: string;
    type?: string; 
    subject: string;
    system: string;
};

type SubjectProgress = {
    subject: string;
    correct_option: number;
    total: number;
    percentage: number;
    system: never;
};

type SystemProgress = {
    system: string;
    correct_option: number;
    total: number;
    percentage: number;
    subject: never;
};

type Progress = SubjectProgress | SystemProgress;

interface ProgressBarsProps {
    data: QuestionResult[];
    type: 'subject' | 'system';
}


const getProgress = (data: QuestionResult[], type: 'subject' | 'system'): Progress[] => {
    const result: Record<string, { correct_option: number; total: number }> = {};

    data.forEach((item) => {
        const key = item[type]; 

        if (!result[key]) {
            result[key] = { total: 0, correct_option: 0 };
        }

        result[key].total += 1;
        if (item.correct_option === item.selected_option) {
            result[key].correct_option += 1;
        }
    });

    return Object.entries(result).map(([key, { correct_option, total }]) => ({
        [type]: key,
        correct_option,
        total,
        percentage: Math.round((correct_option / total) * 100),
    })) as Progress[]; // type assertion
};


export const ProgressBars: React.FC<ProgressBarsProps> = ({ data, type }) => {
    const progressData = getProgress(data, type);

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
                    <th style={{ textTransform: 'capitalize' }}>{type}</th>
                    <th style={{ textAlign: 'right' }}>Score</th>
                </tr>
            </thead>
            <tbody>
                {progressData.map((entry) => {
                    const key = type === 'subject' ? entry.subject : entry.system;
                    const { correct_option, total, percentage } = entry;

                    return (
                        <tr key={key} style={{ borderBottom: '1px solid #eee', height: '50px' }}>
                            <td>
                                <div style={{ fontWeight: 500, marginBottom: '4px' }}>{key}</div>
                                <div
                                    style={{
                                        backgroundColor: '#eee',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        height: '16px',
                                        width: '100%',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${percentage}%`,
                                            height: '100%',
                                            backgroundColor:
                                                percentage >= 70 ? '#4caf50' : percentage >= 50 ? '#ffc107' : '#f44336',
                                            transition: 'width 0.3s ease',
                                        }}
                                    />
                                </div>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                {correct_option}/{total} ({percentage}%)
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
