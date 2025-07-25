import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Briefcase, MapPin, Calendar, Eye, Edit, Trash2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  status: "applied" | "interview" | "offer" | "rejected" | "saved";
  datePosted: string;
  applicationDate?: string;
  description: string;
  requirements: string[];
  salary?: string;
}

export const JobTracker = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "full-time",
      status: "applied",
      datePosted: "2024-01-15",
      applicationDate: "2024-01-16",
      description: "We are looking for a Senior React Developer to join our team...",
      requirements: ["React", "TypeScript", "Node.js", "AWS"],
      salary: "$120,000 - $150,000"
    },
    {
      id: "2",
      title: "Frontend Engineer",
      company: "StartupXYZ",
      location: "Remote",
      type: "remote",
      status: "interview",
      datePosted: "2024-01-12",
      applicationDate: "2024-01-13",
      description: "Join our innovative team building the next generation...",
      requirements: ["JavaScript", "React", "CSS", "GraphQL"],
      salary: "$90,000 - $120,000"
    }
  ]);
  
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    status: "saved",
    description: "",
    requirements: [],
    salary: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addJob = () => {
    if (!newJob.title || !newJob.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in the job title and company.",
        variant: "destructive"
      });
      return;
    }

    const job: Job = {
      id: Date.now().toString(),
      title: newJob.title!,
      company: newJob.company!,
      location: newJob.location || "Not specified",
      type: newJob.type as Job["type"] || "full-time",
      status: newJob.status as Job["status"] || "saved",
      datePosted: new Date().toISOString().split('T')[0],
      description: newJob.description || "",
      requirements: newJob.requirements || [],
      salary: newJob.salary
    };

    setJobs(prev => [...prev, job]);
    setNewJob({
      title: "",
      company: "",
      location: "",
      type: "full-time",
      status: "saved",
      description: "",
      requirements: [],
      salary: ""
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Job Added",
      description: `${job.title} at ${job.company} has been added to your tracker.`,
    });
  };

  const updateJobStatus = (id: string, status: Job["status"]) => {
    setJobs(prev => prev.map(job => 
      job.id === id 
        ? { ...job, status, applicationDate: status === "applied" ? new Date().toISOString().split('T')[0] : job.applicationDate }
        : job
    ));
    
    toast({
      title: "Status Updated",
      description: `Job status updated to ${status}.`,
    });
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    toast({
      title: "Job Deleted",
      description: "Job has been removed from your tracker.",
    });
  };

  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "applied":
        return "default";
      case "interview":
        return "secondary";
      case "offer":
        return "outline";
      case "rejected":
        return "destructive";
      case "saved":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getTypeColor = (type: Job["type"]) => {
    switch (type) {
      case "full-time":
        return "default";
      case "part-time":
        return "secondary";
      case "contract":
        return "outline";
      case "remote":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Job Tracker</h2>
          <p className="text-muted-foreground">Track your job applications and opportunities</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Job</DialogTitle>
              <DialogDescription>
                Add a new job posting to track your applications
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Senior React Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newJob.company}
                    onChange={(e) => setNewJob(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g., TechCorp Inc."
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newJob.location}
                    onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select value={newJob.type} onValueChange={(value) => setNewJob(prev => ({ ...prev, type: value as Job["type"] }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={newJob.salary}
                    onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                    placeholder="e.g., $120k - $150k"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={newJob.description}
                  onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Paste the job description here..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addJob}>Add Job</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No jobs tracked yet. Add your first job posting!</p>
            </CardContent>
          </Card>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Posted {job.datePosted}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteJob(job.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(job.status)}>{job.status}</Badge>
                    <Badge variant={getTypeColor(job.type)}>{job.type}</Badge>
                    {job.salary && <Badge variant="outline">{job.salary}</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <Select value={job.status} onValueChange={(value) => updateJobStatus(job.id, value as Job["status"])}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saved">Saved</SelectItem>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {job.applicationDate && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Applied on {job.applicationDate}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};