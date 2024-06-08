export interface ObjectiveQuestion {
    id: number;
    type: "objetiva";
    question: string;
    choices: string[];
    correctChoice: string;
  }
  
  export interface DiscursiveQuestion {
    id: number;
    type: "discursiva";
    question: string;
  }
  
  export type Question = ObjectiveQuestion | DiscursiveQuestion;
  
  export interface QuestionarioType {
    id: number;
    title: string;
    description: string;
    questions: Question[];
  }