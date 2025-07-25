import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Award, 
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";

const skillsData = [
  { skill: "React", count: 8, percentage: 67 },
  { skill: "TypeScript", count: 6, percentage: 50 },
  { skill: "Node.js", count: 5, percentage: 42 },
  { skill: "AWS", count: 4, percentage: 33 },
  { skill: "Python", count: 3, percentage: 25 },
  { skill: "Docker", count: 3, percentage: 25 }
];

const applicationStatusData = [
  { name: "Applied", value: 45, color: "#6366f1" },
  { name: "Interview", value: 25, color: "#f59e0b" },
  { name: "Offer", value: 15, color: "#10b981" },
  { name: "Rejected", value: 15, color: "#ef4444" }
];

const matchScoreData = [
  { range: "90-100%", count: 3, color: "#10b981" },
  { range: "80-89%", count: 5, color: "#f59e0b" },
  { range: "70-79%", count: 4, color: "#6366f1" },
  { range: "60-69%", count: 2, color: "#ef4444" }
];

const weeklyAnalytics = [
  { week: "Week 1", resumes: 3, applications: 2, matches: 5 },
  { week: "Week 2", resumes: 5, applications: 4, matches: 8 },
  { week: "Week 3", resumes: 2, applications: 3, matches: 4 },
  { week: "Week 4", resumes: 4, applications: 6, matches: 9 }
];

const topCompanies = [
  { name: "TechCorp Inc.", applications: 8, avgScore: 85 },
  { name: "StartupXYZ", applications: 6, avgScore: 78 },
  { name: "Innovation Labs", applications: 5, avgScore: 92 },
  { name: "Digital Solutions", applications: 4, avgScore: 81 },
  { name: "Future Systems", applications: 3, avgScore: 75 }
];

export const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes Analyzed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">147</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Match Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">82.4%</div>
            <Progress value={82.4} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">23</div>
            <p className="text-xs text-muted-foreground">5 added this week</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">2.3s</div>
            <p className="text-xs text-muted-foreground">Avg per resume</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Application Status */}
            <Card>
              <CardHeader>
                <CardTitle>Application Status Distribution</CardTitle>
                <CardDescription>Current status of all job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={applicationStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percentage}) => `${name}: ${percentage}%`}
                    >
                      {applicationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Match Score Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Match Score Distribution</CardTitle>
                <CardDescription>Resume-job match score ranges</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={matchScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Companies */}
          <Card>
            <CardHeader>
              <CardTitle>Top Companies by Applications</CardTitle>
              <CardDescription>Companies with the most job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCompanies.map((company, index) => (
                  <div key={company.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{company.name}</h4>
                        <p className="text-sm text-muted-foreground">{company.applications} applications</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{company.avgScore}% avg match</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Most Common Skills</CardTitle>
              <CardDescription>Skills appearing most frequently in resumes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={skillsData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="skill" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills Gap Analysis</CardTitle>
              <CardDescription>Skills present in resumes vs. job requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">
                        {skill.count} resumes ({skill.percentage}%)
                      </span>
                    </div>
                    <Progress value={skill.percentage} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Award className="h-8 w-8 mx-auto text-success" />
                <CardTitle>Top Performer</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold">John Doe</div>
                <p className="text-muted-foreground">96% match score</p>
                <Badge className="mt-2">Senior React Developer</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto text-primary" />
                <CardTitle>Processing Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold">99.2%</div>
                <p className="text-muted-foreground">Successful analyses</p>
                <Progress value={99.2} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto text-warning" />
                <CardTitle>Improvement Rate</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold">+15%</div>
                <p className="text-muted-foreground">Match accuracy this month</p>
                <Badge variant="outline" className="mt-2">↗ Trending up</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Trends</CardTitle>
              <CardDescription>Resume uploads, applications, and matches over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={weeklyAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="resumes" stackId="1" stroke="#6366f1" fill="#6366f1" />
                  <Area type="monotone" dataKey="applications" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                  <Area type="monotone" dataKey="matches" stackId="1" stroke="#10b981" fill="#10b981" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Resume uploads</span>
                    <span className="text-sm font-semibold text-success">↗ +23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Job applications</span>
                    <span className="text-sm font-semibold text-success">↗ +18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Match accuracy</span>
                    <span className="text-sm font-semibold text-success">↗ +12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Peak Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Most active</span>
                    <span className="text-sm font-semibold">2-4 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Uploads</span>
                    <span className="text-sm font-semibold">10-12 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Applications</span>
                    <span className="text-sm font-semibold">3-5 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">All systems operational</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">AI models active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Database responsive</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};