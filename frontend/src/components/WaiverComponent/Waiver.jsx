import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
import releaseWaiver from "./WAIVER FORM 2021.docx.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const InnerWaiver = styled.div`
  padding: 10px;
  border: 10px;
  overflow-x: scroll;
  overflow-y: scroll;
  transform: scale(0.85);
  @media (max-width: 1300px) {
    padding: unset;
  }
`;

export default function Waiver() {
  return (
    <InnerWaiver>
      <Document file={releaseWaiver}>
        <Page pageNumber={1} />
      </Document>
    </InnerWaiver>
  );
}
