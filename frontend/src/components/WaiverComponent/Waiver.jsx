import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const InnerWaiver = styled.div`
  padding-bottom: 10px;
  border: 10px;
  height: 80vh;
  margin-top: 150px;
  overflow-x: scroll;
  overflow-y: scroll;
  transform: scale(0.75);
  @media (max-width: 1300px) {
    padding: unset;
  }
  .react-pdf__Page__canvas {
    height: 90% !important;
  }
`;

export default function Waiver() {
  return (
    <InnerWaiver>
      <Document file={`${process.env.PUBLIC_URL}/WAIVER FORM 2021.docx.pdf`}>
        <Page pageNumber={1} />
      </Document>
    </InnerWaiver>
  );
}
