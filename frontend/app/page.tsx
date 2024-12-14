"use client";

import { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { Button } from "@/components/ui/button";
import DocumentList from "@/components/home/DocumentList";
import SummaryDisplay from "@/components/home/SummaryDisplay";
import { Document } from "@/lib/definitions";

const GET_DOCUMENTS = gql`
  query GetDocuments {
    documents {
      id
      title
    }
  }
`;

const SUMMARIZE_DOCUMENT = gql`
  query SummarizeDocument($id: ID!) {
    summarizeDocument(id: $id)
  }
`;

export default function Home() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [summary, setSummary] = useState<string>("");
  const { loading, error, data } = useQuery(GET_DOCUMENTS);

  const [fetchSummary] = useLazyQuery(SUMMARIZE_DOCUMENT, {
    onCompleted: (data) => {
      if (data?.summarizeDocument) {
        setSummary(data.summarizeDocument);
      }
    },
    onError: (error) => {
      console.error("Error summarizing document:", error);
    },
  });

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
    setSummary("");
  };

  const handleFetchSummary = () => {
    if (selectedDocument) {
      fetchSummary({ variables: { id: selectedDocument.id } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Document Summary App</h1>
      <DocumentList
        documents={data?.documents}
        onSelect={handleDocumentSelect}
        selectedDocumentId={selectedDocument?.id}
      />
      {selectedDocument && (
        <div className="mt-4">
          <Button onClick={handleFetchSummary}>Fetch Summary</Button>
        </div>
      )}
      {summary && <SummaryDisplay summary={summary} />}
    </div>
  );
}
