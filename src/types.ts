export type Dimension = 
  | 'powerAmbition' 
  | 'ruleIntegrity' 
  | 'socialResponsibility' 
  | 'emotionalDetachment' 
  | 'strategicManeuvering';

export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  suggestion: string;
  famousQuotes: string[];
  image: string;
  traits: string[];
  vector: Record<Dimension, number>;
}

export interface Option {
  text: string;
  scores: Partial<Record<Dimension, number>>;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}
