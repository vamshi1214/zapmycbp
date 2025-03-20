import React, { useState } from 'react';
// Import your loading spinner component or use a library like react-spinners
import { ClipLoader } from 'react-spinners'; // Example using react-spinners
import './ProjectForm.css'; // Make sure to create this CSS file

const ProjectForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    
    // Set loading to true before sending the request
    setIsLoading(true);
    
    try {
      console.log("Submitting data to backend:", formData);
      const response = await fetch('http://localhost:8000/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate report: ${response.statusText}`);
      }
      
      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'project-report.docx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      // Always set loading to false when done
      setIsLoading(false);
    }
  };
  
  return (
    <div className="project-form-container">
      {/* Loading overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <ClipLoader size={60} color={"#4A90E2"} loading={true} />
            <p>Generating your document...</p>
          </div>
        </div>
      )}
      
      {/* Your existing form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fieldName"
          onChange={(e) => setFormData({...formData, fieldName: e.target.value})}
        />
        {/* Other form fields */}
      </form>
    </div>
  );
};

export default ProjectForm; 