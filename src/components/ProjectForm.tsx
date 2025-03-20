import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProjectDetailsSection } from "./project/ProjectDetailsSection";
import { TeamMembersSection } from "./project/TeamMembersSection";
import { ResultsSection } from "./project/ResultsSection";
import { ProjectData, TeamMember } from "@/types/project";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ProjectResultLocal {
  codeOutput: string;
  resultImages: string[];
  aiGeneratedContent: boolean | string;
}

export function ProjectForm() {
  const { toast } = useToast();
  const [showCodeOutput, setShowCodeOutput] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [generateAIContent, setGenerateAIContent] = useState(false);
  const [formData, setFormData] = useState<ProjectData>({
    projectCode: "",
    projectDescription: "",
    department: "",
    mainProfessor: "",
    mainProfessor_designation: "",
    professorDepartment: "",
    secondaryProfessor: "",
    secondaryProfessor_designation: "",
    course: "",
    teamMembers: [{ name: "", rollNumber: "", gender: "" }],
    result: {
      codeOutput: "",
      resultImages: [],
      aiGeneratedContent: false
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Submitting data to backend:", formData);
      const response = await fetch(`${API_URL}/api/generate-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate report: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "project-report.docx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Success!",
        description: "Report generated successfully",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate report",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateField = (field: keyof ProjectData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateMember = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...formData.teamMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, teamMembers: newMembers }));
  };

  const handleAddMember = () => {
    if (formData.teamMembers.length >= 4) {
      toast({
        title: "Maximum members reached",
        description: "You can only add up to 4 team members",
        variant: "destructive",
      });
      return;
    }
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", rollNumber: "", gender: "" }],
    }));
  };

  const handleUpdateResult = (field: keyof ProjectResultLocal, value: any) => {
    console.log('Updating result field:', field, 'with value:', value);
    setFormData(prev => ({
      ...prev,
      result: { ...prev.result, [field]: value }
    }));
  };

  return (
    <div className="project-form-container relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center gap-6 max-w-md w-full mx-4"
            >
              <div className="relative">
                <ClipLoader size={80} color={"#4A90E2"} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">Generating Your Report</h3>
                <p className="text-gray-600">This may take a few moments...</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-blue-500 h-2 rounded-full animate-progress"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-4xl mx-auto p-6">
        <ProjectDetailsSection
          projectDescription={formData.projectDescription}
          projectCode={formData.projectCode}
          department={formData.department}
          professorDepartment={formData.professorDepartment}
          mainProfessor={formData.mainProfessor}
          mainProfessor_designation={formData.mainProfessor_designation}
          secondaryProfessor={formData.secondaryProfessor}
          secondaryProfessor_designation={formData.secondaryProfessor_designation}
          course={formData.course}
          onUpdate={handleUpdateField}
        />

        <TeamMembersSection
          teamMembers={formData.teamMembers}
          onAddMember={handleAddMember}
          onUpdateMember={handleUpdateMember}
        />

        <ResultsSection
          showCodeOutput={showCodeOutput}
          showImageUpload={showImageUpload}
          generateAIContent={generateAIContent}
          result={formData.result}
          onToggleCodeOutput={(checked) => setShowCodeOutput(checked)}
          onToggleImageUpload={(checked) => setShowImageUpload(checked)}
          onToggleAIContent={(checked) => {
            setGenerateAIContent(checked);
            handleUpdateResult('aiGeneratedContent', checked);
          }}
          onUpdateResult={handleUpdateResult}
        />

        <Button type="submit" className="w-full text-xl py-6">
          Generate Report
        </Button>
      </form>
    </div>
  );
}