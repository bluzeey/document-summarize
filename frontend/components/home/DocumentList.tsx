import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Document } from "@/lib/definitions";

interface DocumentListProps {
  documents: Document[];
  onSelect: (document: Document) => void;
  selectedDocumentId: string | null;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onSelect,
  selectedDocumentId,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document) => (
          <TableRow
            key={document.id}
            onClick={() => onSelect(document)}
            className={`cursor-pointer ${
              selectedDocumentId === document.id ? "bg-muted" : ""
            }`}
          >
            <TableCell>{document.id}</TableCell>
            <TableCell>{document.title}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentList;
