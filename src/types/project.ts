export interface TeamMember {
  name: string;
  rollNumber: string;
  gender: string;
}

export interface ProjectResult {
  codeOutput: string;
  resultImages: string[];
  aiGeneratedContent: boolean | string;
}

export interface ProjectData {
  projectCode: string;
  projectDescription: string;
  department: string;
  mainProfessor: string;
  mainProfessor_designation: string;
  professorDepartment: string;
  secondaryProfessor: string;
  secondaryProfessor_designation: string;
  course: string;
  teamMembers: TeamMember[];
  result?: ProjectResult;
}