import React, { type ReactNode } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import {
  ChevronRightIcon,
  MenuIcon,
  Bot,
  ChevronDown,
  PlusCircle,
} from "lucide-react";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  SignOutButton,
} from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { useUserContext } from "~/context/UserContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "~/components/ui/sidebar";
import { api } from "~/utils/api";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <Navbar />
        <MainSidebar />
        <div className="flex-grow">
          <SidebarTrigger className="mt-16" />
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}

const Navbar = () => {
  const { currentUser } = useUserContext();
  return (
    <header className="absolute top-0 z-20 flex h-16 w-full items-center justify-between gap-16 border-b bg-white px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Bot className="h-6 w-6" />
        <span className="text-lg font-semibold">jira-clone</span>
      </Link>
      <div className="ml-auto hidden items-center gap-4 lg:flex">
        <SignedOut>
          <Link
            href=""
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            <SignInButton forceRedirectUrl={"/?signedIn=true"} />
          </Link>
        </SignedOut>
        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={currentUser?.profile_picture_url ?? undefined}
                  alt="avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
                <span className="sr-only">Toggle user menu</span>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  href="#"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/settings"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="#"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="h-4 w-4" />
                  <SignOutButton>
                    <span className="text-red-500">Sign out</span>
                  </SignOutButton>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-4 py-6">
            <Link
              href="#"
              className="flex items-center justify-between text-lg font-semibold"
              prefetch={false}
            >
              Home
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-lg font-semibold"
              prefetch={false}
            >
              About
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-lg font-semibold"
              prefetch={false}
            >
              Services
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-lg font-semibold"
              prefetch={false}
            >
              Contact
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
            <SignedOut>
              <Link
                href=""
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                <SignInButton forceRedirectUrl={"/?signedIn=true"} />
              </Link>
            </SignedOut>
            <SignedIn>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={currentUser?.profile_picture_url ?? undefined}
                      alt="avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                    <span className="sr-only">Toggle user menu</span>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link
                      href="#"
                      className="flex items-center gap-2"
                      prefetch={false}
                    >
                      <div className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="#"
                      className="flex items-center gap-2"
                      prefetch={false}
                    >
                      <div className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      href="#"
                      className="flex items-center gap-2"
                      prefetch={false}
                    >
                      <div className="h-4 w-4" />
                      <SignOutButton>
                        <span className="text-red-500">Sign out</span>
                      </SignOutButton>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

const MainSidebar = () => {
  const { currentUser } = useUserContext();
  const { data: projects } = api.project.getAllProjectsForUser.useQuery(
    currentUser?.id ?? null,
    { enabled: !!currentUser },
  );
  const sidebar = useSidebar();
  return (
    <Sidebar collapsible="icon" className="mt-16 h-[calc(100vh-64px)]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {sidebar.open ? (
              <>
                <NewProjectDialog />
                <Separator />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      Select project
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    {projects?.map((project) => (
                      <DropdownMenuItem key={project.id}>
                        <span>{project.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : null}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NewProjectDialog />
              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

// interface NewProjectDialogProps {}

const NewProjectDialog = () => {
  const { status, mutate: createProject } = api.project.create.useMutation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <PlusCircle className="h-6 w-6" />
            <span>New project</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Create a new project to start tracking your tasks
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createProject("New project");
          }}
        >
          <div className="grid gap-4">
            <label htmlFor="project-name" className="text-sm font-medium">
              Project name
            </label>
            <input
              id="project-name"
              type="text"
              className="focus-visible:ring-ring h-9 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-visible:outline-none"
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={status == "pending"}
            >
              {status === "pending" ? "Creating..." : "Create project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
