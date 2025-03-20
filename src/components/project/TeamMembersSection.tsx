import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TeamMember } from "@/types/project";

interface TeamMembersSectionProps {
  teamMembers: TeamMember[];
  onAddMember: () => void;
  onUpdateMember: (index: number, field: keyof TeamMember, value: string) => void;
}

export function TeamMembersSection({
  teamMembers,
  onAddMember,
  onUpdateMember,
}: TeamMembersSectionProps) {
  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Team Members</h2>
        <Button type="button" onClick={onAddMember} variant="outline" className="text-lg">
          Add Member
        </Button>
      </div>

      {teamMembers.map((member, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-xl">Name</Label>
            <Input
              value={member.name}
              onChange={e => onUpdateMember(index, 'name', e.target.value)}
              placeholder="Enter name..."
              className="text-lg"
            />
          </div>
          <div>
            <Label className="text-xl">Roll Number</Label>
            <Input
              value={member.rollNumber}
              onChange={e => onUpdateMember(index, 'rollNumber', e.target.value)}
              placeholder="Enter roll number..."
              className="text-lg"
            />
          </div>
          <div>
            <Label className="text-xl">Gender</Label>
            <select
              value={member.gender}
              onChange={e => onUpdateMember(index, 'gender', e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-lg"
            >
              <option value="">Select gender...</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>
        </div>
      ))}
    </Card>
  );
}