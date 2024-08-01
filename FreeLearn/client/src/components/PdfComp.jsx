import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import { useState } from 'react';

const PdfDiv = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  overflow: auto;

`;


function PdfComp(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  console.log(props.pdf);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <PdfDiv>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document
        file={props.pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error('Error loading PDF:', error)}
      >
        {numPages &&
          Array.from(new Array(numPages), (el, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
      </Document>
    </PdfDiv>
  );
}

export default PdfComp;
