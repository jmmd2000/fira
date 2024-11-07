import React, { type ReactNode } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { ChevronRightIcon, MenuIcon, Bot } from "lucide-react";
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

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex pt-16">
        <Sidebar />
        <div className="flex-grow">{children}</div>
      </main>
    </>
  );
}

const Navbar = () => {
  const { user } = useUserContext();
  return (
    <header className="absolute top-0 z-20 flex h-16 w-full items-center justify-between gap-4 border-b bg-white px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Bot className="h-6 w-6" />
        <span className="text-lg font-semibold">reddit-clone</span>
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
                  src={user?.profile_picture_url ?? undefined}
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
                      src={user?.profile_picture_url ?? undefined}
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

const Sidebar = () => {
  return (
    // <aside className="absolute left-0 z-10 hidden h-full w-64 flex-col gap-4 border-r px-4 py-6 lg:flex">
    <aside className="hidden h-[calc(100vh-64px)] w-64 flex-col gap-4 border-r px-4 py-6 lg:flex">
      <nav className="flex flex-col gap-4">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
          prefetch={false}
        >
          Services
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
          prefetch={false}
        >
          Contact
        </Link>
      </nav>
    </aside>
  );
};
