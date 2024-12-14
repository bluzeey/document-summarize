export interface Document {
  id: string;
  title: string;
}

export interface DocumentsQueryResult {
  documents: Document[];
}

export interface SummarizeDocumentMutationResult {
  summarizeDocument: {
    summary: string;
  };
}
