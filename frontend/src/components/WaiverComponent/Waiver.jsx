import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
import releaseWaiver from "./WAIVER FORM 2021.docx.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const InnerWaiver = styled.div`
  background: #c4c4c4;
  border: 10px;
  width: 47.81%;
  height: 100vh;
  overflow-x: scroll;
`;

const StyledPage = styled(Page)`
  & .react-pdf__Page__canvas {
    width: 94.27vh !important;
    height: 122vh !important;
  }
`;

export default function Waiver() {
  return (
    <InnerWaiver>
      <Document file={releaseWaiver}>
        <StyledPage pageNumber={1} />
      </Document>
    </InnerWaiver>
  );
}
