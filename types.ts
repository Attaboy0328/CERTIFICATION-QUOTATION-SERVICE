
export interface CertItem {
  id: string;
  type: string;
  project: string;
  amount: number;
}

export interface TechnicalService {
  id: string;
  name: string;
  description: string;
  checked: boolean;
  basePrice: number;
}

export interface CertModule {
  id: string;
  type: 'cert';
  title: string;
  items: CertItem[];
}

export interface TechModule {
  id: string;
  type: 'tech';
  title: string;
  services: TechnicalService[];
  fee: number;
  details: {
    minDays: number;
    auditCerts: number;
  };
}

export interface CustomModule {
  id: string;
  type: 'custom';
  title: string;
  blocks: CaseBlock[];
}

export interface TechServiceStep {
  id: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface CaseBlock {
  id: string;
  type: 'text' | 'table' | 'image';
  content?: string;
  tableData?: string[][];
  images?: string[];
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  rowSpacing?: number; // 用于表格行高/间距
  columnWidths?: number[]; // 各列宽度比例
}

export type QuoteModule = CertModule | TechModule | CustomModule;

export interface QuoteData {
  clientName: string;
  clientAddress: string;
  employeeCount: number;
  certStandards: string[];
  certScope: string;
  modules: QuoteModule[];
  travelExpenseOption: 'excluded' | 'included';
  note1Prefix: string;
  note1Count: number;
  note1Suffix: string;
  note3Text: string;
  additionalRemarks: string[];
  certTemplates: string[];
  techServiceSteps: TechServiceStep[];
  caseBlocks: CaseBlock[];
  contact: {
    name: string;
    phone: string;
    email: string;
    jobTitle1: string;
    jobTitle2: string;
    officeAddress: string;
    qrCode: string | null;
  };
  quoteDate: string;
}
