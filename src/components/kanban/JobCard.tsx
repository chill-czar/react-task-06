import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type JobStatus = "Applied" | "Interviewing" | "Offer" | "Rejected";

export type Job = {
  id: string;
  company: string;
  role: string;
  dateApplied: string; // ISO or formatted string
  status: JobStatus;
};

interface JobCardProps {
  job: Job;
}

const statusBadgeVariant: Record<JobStatus, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
  Applied: { variant: "secondary", label: "Applied" },
  Interviewing: { variant: "default", label: "Interviewing" },
  Offer: { variant: "default", label: "Offer" },
  Rejected: { variant: "destructive", label: "Rejected" },
};

export const JobCard = ({ job }: JobCardProps) => {
  const badge = statusBadgeVariant[job.status];

  return (
    <Card className="border bg-card/60 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base leading-tight text-foreground">
          {job.company}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-foreground/80">{job.role}</p>
            <p className="text-xs">Applied: {job.dateApplied}</p>
          </div>
          <Badge variant={badge.variant} aria-label={`Status ${badge.label}`}>
            {badge.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
