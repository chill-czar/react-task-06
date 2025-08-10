import { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Job, JobStatus, JobCard } from "@/components/kanban/JobCard";
import { Separator } from "@/components/ui/separator";

const STATUSES: JobStatus[] = ["Applied", "Interviewing", "Offer", "Rejected"];

const initialData: Record<JobStatus, Job[]> = {
  Applied: [
    { id: "1", company: "Acme Corp", role: "Frontend Engineer", dateApplied: "2025-07-01", status: "Applied" },
    { id: "2", company: "Globex", role: "Full Stack Developer", dateApplied: "2025-07-03", status: "Applied" },
  ],
  Interviewing: [
    { id: "3", company: "Initech", role: "React Engineer", dateApplied: "2025-06-20", status: "Interviewing" },
  ],
  Offer: [
    { id: "4", company: "Umbrella", role: "UI Developer", dateApplied: "2025-06-10", status: "Offer" },
  ],
  Rejected: [
    { id: "5", company: "Hooli", role: "Junior Engineer", dateApplied: "2025-06-01", status: "Rejected" },
  ],
};

interface KanbanBoardProps {
  searchTerm?: string;
}

export const KanbanBoard = ({ searchTerm = "" }: KanbanBoardProps) => {
  const [columns, setColumns] = useState<Record<JobStatus, Job[]>>(initialData);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return columns;
    const next: Record<JobStatus, Job[]> = { Applied: [], Interviewing: [], Offer: [], Rejected: [] };
    (Object.keys(columns) as JobStatus[]).forEach((key) => {
      next[key] = columns[key].filter((j) =>
        [j.company, j.role].some((v) => v.toLowerCase().includes(term))
      );
    });
    return next;
  }, [columns, searchTerm]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceCol = source.droppableId as JobStatus;
    const destCol = destination.droppableId as JobStatus;

    // If filtering is active, we disable dragging via isDropDisabled, but guard anyway
    const isFiltering = !!searchTerm.trim();
    if (isFiltering) return;

    setColumns((prev) => {
      const sourceItems = Array.from(prev[sourceCol]);
      const [moved] = sourceItems.splice(source.index, 1);

      const destItems = sourceCol === destCol ? sourceItems : Array.from(prev[destCol]);

      // Update status if moved across columns
      const updatedMoved: Job = { ...moved, status: destCol };
      destItems.splice(destination.index, 0, updatedMoved);

      return {
        ...prev,
        [sourceCol]: sourceCol === destCol ? destItems : sourceItems,
        [destCol]: destItems,
      };
    });
  };

  return (
    <section aria-labelledby="kanban-heading" className="px-3 sm:px-6 py-6">
      <div className="mb-4">
        <h1 id="kanban-heading" className="text-2xl sm:text-3xl font-semibold text-foreground">Job Applications Kanban</h1>
        <p className="text-sm text-muted-foreground mt-1">Drag cards between stages to track your progress.</p>
        {searchTerm && (
          <p className="text-xs text-muted-foreground mt-2">Filtering is active. Drag-and-drop is temporarily disabled.</p>
        )}
      </div>
      <Separator />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATUSES.map((status) => (
            <Droppable droppableId={status} key={status} isDropDisabled={!!searchTerm.trim()}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="rounded-lg border bg-card/50 backdrop-blur-sm p-3 flex flex-col min-h-[300px]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-medium text-foreground/80">{status}</h2>
                    <span className="text-xs text-muted-foreground">{filtered[status].length}</span>
                  </div>
                  <div className="space-y-2">
                    {filtered[status].map((job, index) => (
                      <Draggable draggableId={job.id} index={index} key={job.id}>
                        {(dragProvided, dragSnapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className="select-none"
                          >
                            <JobCard job={job} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </section>
  );
};

export default KanbanBoard;
