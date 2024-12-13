const DocumentViewer = ({ url }) => {
    const handleView = () => {
      if (url) {
        window.open(url, '_blank'); // Opens the document in a new tab
      } else {
        console.error("Document URL is missing");
      }
    };
  
    return (
      <button onClick={handleView} style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
        View Document
      </button>
    );
  };
  
  export default DocumentViewer;