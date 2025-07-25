import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Eye, Trash2, Download } from "lucide-react";

interface ResumeFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  status: "analyzing" | "completed" | "error";
  score?: number;
}

export const ResumeUpload = () => {
  const { toast } = useToast();
  const [resumes, setResumes] = useState<ResumeFile[]>([
    {
      id: "1",
      name: "John_Doe_Resume.pdf",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      status: "completed",
      score: 85
    },
    {
      id: "2",
      name: "Jane_Smith_CV.pdf",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      status: "analyzing"
    }
  ]);
  const [dragActive, setDragActive] = useState(false);

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type === "application/pdf") {
        const newResume: ResumeFile = {
          id: Date.now().toString(),
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          status: "analyzing"
        };
        
        setResumes(prev => [...prev, newResume]);
        
        toast({
          title: "Resume Uploaded",
          description: `${file.name} is being analyzed...`,
        });

        // Simulate analysis completion
        setTimeout(() => {
          setResumes(prev => prev.map(resume => 
            resume.id === newResume.id 
              ? { ...resume, status: "completed" as const, score: Math.floor(Math.random() * 40) + 60 }
              : resume
          ));
        }, 3000);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload PDF files only.",
          variant: "destructive"
        });
      }
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const deleteResume = (id: string) => {
    setResumes(prev => prev.filter(resume => resume.id !== id));
    toast({
      title: "Resume Deleted",
      description: "Resume has been removed from the system.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "analyzing":
        return "warning";
      case "error":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Resumes
          </CardTitle>
          <CardDescription>
            Upload PDF resumes for AI-powered analysis and ranking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drag & Drop Resumes</h3>
            <p className="text-muted-foreground mb-4">
              Or click to browse your files (PDF only)
            </p>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resume List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Resumes ({resumes.length})</CardTitle>
          <CardDescription>
            Manage and view analysis results for uploaded resumes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resumes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No resumes uploaded yet. Start by uploading your first resume!</p>
              </div>
            ) : (
              resumes.map((resume) => (
                <div key={resume.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{resume.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {resume.size} • Uploaded {resume.uploadDate}
                    </p>
                    {resume.status === "analyzing" && (
                      <Progress value={65} className="mt-2 w-48" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(resume.status) as any}>
                      {resume.status}
                    </Badge>
                    {resume.score && (
                      <Badge variant="outline">
                        Score: {resume.score}%
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteResume(resume.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};