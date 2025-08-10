import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

export const AppLayout = ({ children, searchTerm, onSearchChange }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center gap-3 border-b bg-card px-3 sm:px-4">
            <SidebarTrigger className="shrink-0" />
            <div className={cn("flex items-center gap-2 text-sm sm:text-base font-medium text-foreground/80")}
                 aria-label="Job Applications Kanban">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary" aria-hidden />
              <span>Job Tracker</span>
            </div>

            {onSearchChange && (
              <div className="ml-auto flex items-center gap-2 w-[40%] max-w-md">
                <Input
                  value={searchTerm ?? ""}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="Search company or role"
                  aria-label="Search job applications"
                  className="h-9"
                />
                <Button variant="secondary" className="h-9">Search</Button>
              </div>
            )}
          </header>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
