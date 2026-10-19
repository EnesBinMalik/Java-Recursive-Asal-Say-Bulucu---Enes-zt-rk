export interface CallStep {
  stepIndex: number;
  type: 'call' | 'check' | 'return';
  sayi: number;
  bolen: number;
  depth: number;
  conditionDescription: string;
  result?: boolean;
  status: 'active' | 'success' | 'failure' | 'waiting';
  codeLine: number;
}

export interface SimulationResult {
  input: number;
  isPrime: boolean;
  steps: CallStep[];
  executionTimeMs: number;
  totalCalls: number;
  finalDivisor: number;
  reason: string;
}

export interface ScenarioItem {
  number: number;
  expectedResult: boolean;
  note: string;
}
