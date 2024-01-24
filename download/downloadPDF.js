const downloadPdf = () => {
  const pdfFile = document.createElement('a');
  pdfFile.href = this.pdfUrl;
  pdfFile.target = '_blank';
  pdfFile.download = this.pdfFileName;

  // Simulate a click on the element <a>
  document.body.appendChild(pdfFile);
  pdfFile.click();
  document.body.removeChild(pdfFile);
}
