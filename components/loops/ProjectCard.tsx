import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { IProject } from "@/types";
import { PROJECT_STATUS, STATUS_COLORS } from "@/lib/constants";

const getProjectStatus = (project: IProject): keyof typeof PROJECT_STATUS => {
  if (project.homepage) return PROJECT_STATUS.LIVE;
  if (project.archived) return PROJECT_STATUS.ARCHIVED;
  if (project.visibility === "private") return PROJECT_STATUS.PRIVATE;
  return PROJECT_STATUS.BETA;
};

export const ProjectCard = ({
  project,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  project: IProject;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const formatDate = (dateString: string): string => {
    // You can implement proper date formatting here
    return dateString;
  };
  return (
    <Card
      className="group h-full transform cursor-pointer border border-white/10 bg-black/50 transition-all duration-300 hover:scale-105 hover:border-cyan-500/50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardContent className="p-6">
        {/* Project header */}
        <div className="mb-4 flex items-start justify-between">
          <ProjectStatusIndicator project={project} />
          <span className="font-mono text-xs text-white/40">{formatDate(project.created_at)}</span>
        </div>

        {/* Project title */}
        <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-cyan-400">
          {project.name}
        </h3>

        {/* Project language */}
        {project.language && (
          <div className="mb-3 font-mono text-xs text-purple-400">{project.language}</div>
        )}

        {/* Description */}
        {project.description && (
          <p className="mb-4 text-sm leading-relaxed text-white/70">{project.description}</p>
        )}

        {/* Tech stack */}
        {project.topics && project.topics.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.topics.map((topic) => (
              <span
                key={topic}
                className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs text-white/60"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <ProjectActions project={project} isVisible={isHovered} />
      </CardContent>
    </Card>
  );
};

const ProjectActions = ({ project, isVisible }: { project: IProject; isVisible: boolean }) => (
  <div
    className={`flex gap-2 transition-opacity duration-300 ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}
  >
    {project.homepage && (
      <Button
        size="sm"
        variant="outline"
        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
        onClick={() => window.open(project.homepage, "_blank")}
      >
        <ExternalLink className="mr-1 h-3 w-3" />
        View
      </Button>
    )}
    {project.html_url && (
      <Button
        size="sm"
        variant="outline"
        className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
        onClick={() => window.open(project.html_url, "_blank")}
      >
        <Github className="mr-1 h-3 w-3" />
        Code
      </Button>
    )}
  </div>
);

const ProjectStatusIndicator = ({ project }: { project: IProject }) => {
  const status = getProjectStatus(project);
  const colorClass = STATUS_COLORS[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${colorClass} animate-pulse`} />
      <span className="font-mono text-xs text-white/60">{status}</span>
    </div>
  );
};
