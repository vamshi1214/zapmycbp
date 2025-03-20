import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { CodeEditor } from "../CodeEditor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Electrical and Electronics Engineering",
  "Electronics and Communication Engineering",
  "Mechanical Engineering",
  "Electronics and Instrumentation Engineering",
  "Civil Engineering",
  "Automobile Engineering",
  "Artificial Intelligence & Data Science",
  "CSE-Cyber Security",
  "CSE-Data Science",
  "Computer Science and Business Systems",
  "CSE-AIML",
  "CSE-IoT",
  "Information Technology",
] as const;

interface ProjectDetailsProps {
  projectDescription: string;
  projectCode: string;
  department: string;
  professorDepartment: string;
  mainProfessor: string;
  mainProfessor_designation: string;
  secondaryProfessor: string;
  secondaryProfessor_designation: string;
  course: string;
  onUpdate: (field: string, value: string) => void;
}

export function ProjectDetailsSection({
  projectDescription,
  projectCode,
  department,
  professorDepartment,
  mainProfessor,
  mainProfessor_designation,
  secondaryProfessor,
  secondaryProfessor_designation,
  course,
  onUpdate,
}: ProjectDetailsProps) {
  return (
    <Card className="glass-card p-6 space-y-6">
      <h2 className="text-3xl font-bold text-primary">Project Details</h2>
      
      <div>
        <Label className="text-xl">Project Description</Label>
        <Textarea
          value={projectDescription}
          onChange={e => onUpdate('projectDescription', e.target.value)}
          placeholder="Enter project description..."
          className="text-lg"
        />
      </div>

      <div>
        <Label className="text-xl">Project Code</Label>
        <CodeEditor
          value={projectCode}
          onChange={value => onUpdate('projectCode', value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-xl">Department</Label>
          <Select 
            value={department}
            onValueChange={(value) => onUpdate('department', value)}
          >
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="Select department..." />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xl">Professor Department</Label>
          <Input
            value={professorDepartment}
            onChange={e => onUpdate('professorDepartment', e.target.value)}
            placeholder="Enter professor's department..."
            className="text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-xl">Main Professor</Label>
          <Input
            value={mainProfessor}
            onChange={e => onUpdate('mainProfessor', e.target.value)}
            placeholder="Enter main professor's name..."
            className="text-lg"
          />
        </div>
        <div>
          <Label className="text-xl">Main Professor Designation</Label>
          <Input
            value={mainProfessor_designation}
            onChange={e => onUpdate('mainProfessor_designation', e.target.value)}
            placeholder="Enter main professor's designation..."
            className="text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-xl">Secondary Professor</Label>
          <Input
            value={secondaryProfessor}
            onChange={e => onUpdate('secondaryProfessor', e.target.value)}
            placeholder="Enter secondary professor's name..."
            className="text-lg"
          />
        </div>
        <div>
          <Label className="text-xl">Secondary Professor Designation</Label>
          <Input
            value={secondaryProfessor_designation}
            onChange={e => onUpdate('secondaryProfessor_designation', e.target.value)}
            placeholder="Enter secondary professor's designation..."
            className="text-lg"
          />
        </div>
      </div>

      <div>
        <Label className="text-xl">Course Code</Label>
        <Input
          value={course}
          onChange={e => onUpdate('course', e.target.value)}
          placeholder="Enter course code..."
          className="text-lg"
        />
      </div>
    </Card>
  );
}