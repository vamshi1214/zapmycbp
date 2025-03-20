import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="font-mono h-64 whitespace-pre"
      placeholder="Enter your code here..."
    />
  );
}