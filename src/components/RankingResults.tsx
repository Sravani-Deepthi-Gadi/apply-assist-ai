import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Zap, FileText, Target, TrendingUp, Award, Brain, Eye } from "lucide-react";

interface Resume {
  id: string;
  name: string;
  candidate: string;
  overallScore: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  keywordMatch: number;
  strengths: string[];
  improvements: string[];
}

interface JobAnalysis {
  jobTitle: string;
  company: string;
  description: string;
  keyRequirements: string[];
  skillsRequired: string[];
  experienceLevel: string;
}

export const RankingResults = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [rankings, setRankings] = useState<Resume[]>([
    {
      id: "1",
      name: "John_Doe_Resume.pdf",
      candidate: "John Doe",
      overallScore: 92,
      skillsMatch: 95,
      experienceMatch: 88,
      educationMatch: 90,
      keywordMatch: 94,
      strengths: ["Strong React experience", "AWS certifications", "Team leadership"],
      improvements: ["Could improve TypeScript skills", "Limited mobile development experience"]
    },
    {
      id: "2",
      name: "Jane_Smith_CV.pdf",
      candidate: "Jane Smith",
      overallScore: 87,
      skillsMatch: 90,
      experienceMatch: 85,
      educationMatch: 88,
      keywordMatch: 85,
      strengths: ["Excellent UI/UX design", "Full-stack capabilities", "Agile methodology"],
      improvements: ["Could strengthen backend skills", "Limited DevOps experience"]
    },
    {
      id: "3",
      name: "Mike_Johnson_Resume.pdf",
      candidate: "Mike Johnson",
      overallScore: 78,
      skillsMatch: 82,
      experienceMatch: 75,
      educationMatch: 80,
      keywordMatch: 76,
      strengths: ["Strong problem-solving", "Good communication", "Quick learner"],
      improvements: ["Needs more senior-level experience", "Limited framework knowledge"]
    }
  ]);

  const [currentAnalysis, setCurrentAnalysis] = useState<JobAnalysis>({
    jobTitle: "Senior React Developer",
    company: "TechCorp Inc.",
    description: "We are seeking a Senior React Developer with 5+ years of experience...",
    keyRequirements: ["5+ years React", "TypeScript", "Team Leadership", "AWS"],
    skillsRequired: ["React", "TypeScript", "Node.js", "AWS", "Redux", "Jest"],
    experienceLevel: "Senior"
  });

  const runAnalysis = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Missing Job Description",
        description: "Please enter a job description to analyze against.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    toast({
      title: "AI Analysis Started",
      description: "Analyzing resumes against job requirements...",
    });

    // Simulate AI analysis
    setTimeout(() => {
      // Randomly adjust scores for demo
      setRankings(prev => prev.map(resume => ({
        ...resume,
        overallScore: Math.floor(Math.random() * 30) + 70,
        skillsMatch: Math.floor(Math.random() * 30) + 70,
        experienceMatch: Math.floor(Math.random() * 30) + 70,
        educationMatch: Math.floor(Math.random() * 30) + 70,
        keywordMatch: Math.floor(Math.random() * 30) + 70
      })).sort((a, b) => b.overallScore - a.overallScore));
      
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Resume ranking updated based on job requirements.",
      });
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    if (score >= 70) return "text-primary";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    if (score >= 70) return "outline";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      {/* AI Analysis Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Resume Ranking
          </CardTitle>
          <CardDescription>
            Analyze and rank resumes against specific job requirements using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job-select">Select Tracked Job (Optional)</Label>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose from tracked jobs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job1">Senior React Developer - TechCorp</SelectItem>
                  <SelectItem value="job2">Frontend Engineer - StartupXYZ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={runAnalysis} 
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="mr-2 h-4 w-4 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Run AI Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here for AI analysis..."
              rows={6}
            />
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analysis Progress</span>
                <span>Processing...</span>
              </div>
              <Progress value={65} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Analysis Info */}
      {currentAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Current Analysis: {currentAnalysis.jobTitle}
            </CardTitle>
            <CardDescription>{currentAnalysis.company}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Key Requirements:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.keyRequirements.map((req, index) => (
                    <Badge key={index} variant="outline">{req}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Skills Required:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.skillsRequired.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rankings Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Resume Rankings ({rankings.length} candidates)
          </CardTitle>
          <CardDescription>
            Candidates ranked by AI analysis based on job requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rankings.map((resume, index) => (
              <Card key={resume.id} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        {resume.candidate}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <FileText className="h-4 w-4" />
                        {resume.name}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(resume.overallScore)}`}>
                        {resume.overallScore}%
                      </div>
                      <Badge variant={getScoreBadge(resume.overallScore)}>
                        Overall Match
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-lg font-semibold ${getScoreColor(resume.skillsMatch)}`}>
                        {resume.skillsMatch}%
                      </div>
                      <p className="text-xs text-muted-foreground">Skills</p>
                      <Progress value={resume.skillsMatch} className="mt-1" />
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-semibold ${getScoreColor(resume.experienceMatch)}`}>
                        {resume.experienceMatch}%
                      </div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <Progress value={resume.experienceMatch} className="mt-1" />
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-semibold ${getScoreColor(resume.educationMatch)}`}>
                        {resume.educationMatch}%
                      </div>
                      <p className="text-xs text-muted-foreground">Education</p>
                      <Progress value={resume.educationMatch} className="mt-1" />
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-semibold ${getScoreColor(resume.keywordMatch)}`}>
                        {resume.keywordMatch}%
                      </div>
                      <p className="text-xs text-muted-foreground">Keywords</p>
                      <Progress value={resume.keywordMatch} className="mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-success mb-2">Strengths:</h5>
                      <ul className="text-sm space-y-1">
                        {resume.strengths.map((strength, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <TrendingUp className="h-3 w-3 text-success" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-warning mb-2">Areas for Improvement:</h5>
                      <ul className="text-sm space-y-1">
                        {resume.improvements.map((improvement, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Target className="h-3 w-3 text-warning" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button size="sm">
                      Contact Candidate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};