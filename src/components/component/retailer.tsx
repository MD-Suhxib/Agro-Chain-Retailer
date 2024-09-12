"use client";
import { useState } from "react";
import { db } from '@/firebase'; // Ensure the path is correct
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function Retailer() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, 'produce'),
        where('produceName', '>=', searchTerm),
        where('produceName', '<=', searchTerm + '\uf8ff')
      );

      const querySnapshot = await getDocs(q);
      const produceData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log("Fetched produce data:", produceData);
    } catch (error) {
      console.error("Error fetching produce data: ", error);
      alert("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2 font-bold" prefetch={false}>
            <LeafIcon className="h-6 w-6 text-primary" />
            FarmFresh
          </Link>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5" />
                  <span>San Francisco</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Select Location</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  San Francisco
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  Los Angeles
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  New York
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  Chicago
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  <span>Account</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="#" className="relative" prefetch={false} />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-8 px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div>
              <h1 className="text-3xl font-bold">Discover Fresh Produce</h1>
              <p className="mt-2 text-muted-foreground">
                Browse our selection of locally-sourced farm lands and find the perfect produce for your needs.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Input
                  type="search"
                  placeholder="Search for produce..."
                  className="flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </div>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Filter by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <Checkbox />
                      Vegetables
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox />
                      Fruits
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox />
                      Grains
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox />
                      Dairy
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox />
                      Meat
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="container py-8 px-4 md:px-6">
          <h2 className="text-2xl font-bold">Featured Farm Lands</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Farm Land Cards */}
          </div>
        </section>
      </main>
      <footer className="border-t bg-background/80 py-6 backdrop-blur-sm">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <LeafIcon className="h-6 w-6 text-primary" />
            <span className="text-sm text-muted-foreground">&copy; 2023 FarmFresh. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground" prefetch={false}>
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-chevron-down"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

interface LeafIconProps extends React.SVGProps<SVGSVGElement> {}

const LeafIcon: React.FC<LeafIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 6C2 3.24 4.24 1 7 1c2.21 0 4.18 1.14 5.29 2.83C13.08 3.27 15.02 2 17 2c2.74 0 5 2.26 5 5 0 5.5-4.78 10-10 10" />
    </svg>
  );
};

interface MapPinIconProps extends React.SVGProps<SVGSVGElement> {}

const MapPinIcon: React.FC<MapPinIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10.5C21 13.89 17.66 18 12 18S3 13.89 3 10.5 6.34 3 12 3c1.66 0 3.18.35 4.5.96" />
      <path d="M12 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  );
};

interface UserIconProps extends React.SVGProps<SVGSVGElement> {}

const UserIcon: React.FC<UserIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
      <path d="M6 22c0-5 4-9 9-9s9 4 9 9" />
    </svg>
  );
};

interface SettingsIconProps extends React.SVGProps<SVGSVGElement> {}

const SettingsIcon: React.FC<SettingsIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.14 12.936l1.416-1.416a2 2 0 0 0-.291-2.79l-1.3-1.3a2 2 0 0 0-2.79-.292l-1.416 1.416a8 8 0 0 0-1.082-.058A8 8 0 0 0 6.7 9.286L5.289 7.972a2 2 0 0 0-2.791.292L1.5 9.82a2 2 0 0 0-.291 2.79l1.416 1.416a8 8 0 0 0 0 1.825l-1.416 1.416a2 2 0 0 0 .291 2.791l1.3 1.3a2 2 0 0 0 2.791.291l1.416-1.416a8 8 0 0 0 1.082.058 8 8 0 0 0 1.828-1.118l1.141 1.407a2 2 0 0 0 2.791-.291l1.3-1.3a2 2 0 0 0 .291-2.791zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
    </svg>
  );
};

interface LogOutIconProps extends React.SVGProps<SVGSVGElement> {}

const LogOutIcon: React.FC<LogOutIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 17l5-5-5-5M6 17h10a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v7a4 4 0 0 0 4 4z" />
    </svg>
  );
};
