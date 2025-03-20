import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "../ImageUpload";
import { FileCode, Image as ImageIcon, Bot } from "lucide-react";
import { ProjectResult } from "@/types/project";

interface ResultsSectionProps {
  showCodeOutput: boolean;
  showImageUpload: boolean;
  generateAIContent: boolean;
  result?: ProjectResult;
  onToggleCodeOutput: (checked: boolean) => void;
  onToggleImageUpload: (checked: boolean) => void;
  onToggleAIContent: (checked: boolean) => void;
  onUpdateResult: (field: keyof ProjectResult, value: any) => void;
}

export function ResultsSection({
  showCodeOutput,
  showImageUpload,
  generateAIContent,
  result,
  onToggleCodeOutput,
  onToggleImageUpload,
  onToggleAIContent,
  onUpdateResult,
}: ResultsSectionProps) {
  console.log('ResultsSection rendered with result:', result);
  
  const handleImagesSelected = (images: string[]) => {
    console.log('Images selected in ResultsSection:', images);
    onUpdateResult('resultImages', images);
  };

  return (
    <Card className="glass-card p-6 space-y-6">
      <h2 className="text-3xl font-bold text-primary">Results</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={showCodeOutput}
            onCheckedChange={onToggleCodeOutput}
          />
          <div className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-primary" />
            <Label className="text-xl">Include Code Output</Label>
          </div>
        </div>

        {showCodeOutput && (
          <Textarea
            value={result?.codeOutput || ""}
            onChange={e => onUpdateResult('codeOutput', e.target.value)}
            placeholder="Enter code output..."
            className="h-32 text-lg"
          />
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={showImageUpload}
            onCheckedChange={onToggleImageUpload}
          />
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <Label className="text-xl">Include Result Images</Label>
          </div>
        </div>

        {showImageUpload && (
          <ImageUpload
            onImagesSelected={handleImagesSelected}
          />
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={generateAIContent}
            onCheckedChange={onToggleAIContent}
          />
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <Label className="text-xl">Generate AI Content</Label>
          </div>
        </div>
      </div>
    </Card>
  );
}