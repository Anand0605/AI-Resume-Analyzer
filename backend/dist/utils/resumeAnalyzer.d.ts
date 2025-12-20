interface AnalysisResult {
    skills: string[];
    score: number;
}
declare const analyzeResume: (text: string) => AnalysisResult;
export default analyzeResume;
