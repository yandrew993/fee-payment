import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generate PDF from HTML element using jsPDF
 * @param {HTMLElement} element - Element to convert to PDF
 * @param {string} filename - PDF filename
 */
export const downloadPDFFromElement = async (element, filename) => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    let heightLeft = canvas.height * imgWidth / canvas.width;
    let position = 0;

    // Add image to PDF, creating new pages as needed
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, heightLeft);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - canvas.height * imgWidth / canvas.width;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, heightLeft);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/**
 * Download PDF from URL
 * @param {string} url - URL to PDF endpoint (can be relative or absolute)
 * @param {string} filename - PDF filename
 */
export const downloadPDFFromURL = async (url, filename) => {
  try {
    // Convert relative URLs to absolute URLs pointing to the API server
    let fullUrl = url;
    if (url.startsWith('/')) {
      fullUrl = `http://localhost:3000${url}`;
    }
    
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};

/**
 * Generate inline PDF preview
 * @param {HTMLElement} element - Element to convert
 * @returns {Promise<string>} - Data URL of PDF
 */
export const generatePDFDataURL = async (element) => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating PDF preview:', error);
    throw error;
  }
};
