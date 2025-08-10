import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import KanbanBoard from "@/components/kanban/KanbanBoard";

const Index = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Job Applications Kanban | Track Your Applications";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Manage job applications in a Kanban board: Applied, Interviewing, Offer, Rejected. Drag-and-drop and search.");
  }, []);

  return (
    <AppLayout searchTerm={search} onSearchChange={setSearch}>
      <KanbanBoard searchTerm={search} />
    </AppLayout>
  );
};

export default Index;
