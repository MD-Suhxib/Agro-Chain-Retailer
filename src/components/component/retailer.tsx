"use client";
import { useState } from "react";
import { db } from '@/firebase'; 
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Produce {
  id: string;
  produceName: string;
  category: string;
  price: number;
  quantity: number;
  location: string;
  farmName: string;
  image: string;  
}

export function Retailer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [produceData, setProduceData] = useState<Produce[]>([]);
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: boolean }>({});

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, 'produce'),
        where('produceName', '>=', searchTerm),
        where('produceName', '<=', searchTerm + '\uf8ff')
      );
  
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => {
        const docData = doc.data() as {
          produceName: string;
          category?: string;
          price: string;
          quantity: string;
          location?: string;
          timestamp?: string;
          image: string;
          farmName: string;
        };
  
        return {
          id: doc.id,
          produceName: docData.produceName,
          category: docData.category,
          price: parseFloat(docData.price), 
          quantity: parseInt(docData.quantity, 10),
          location: docData.location,
          timestamp: docData.timestamp,
          image: docData.image,
          farmName: docData.farmName
        };
      });
  
      setProduceData(data as Produce[]); 
    } catch (error) {
      console.error("Error fetching produce data: ", error);
      alert("Error fetching data. Please try again.");
    }
  };

  const handleBookSlot = (id: string) => {
    setBookedSlots((prev) => ({ ...prev, [id]: true }));
    alert('Your slot has been booked! Please contact the farmer.');
  };

  const styles = {
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2 font-bold" prefetch={false}>
            <LeafIcon className="h-6 w-6 text-primary" />
            Agro-Chain
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-8 px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div>
              <h1 className="text-3xl font-bold">Discover Fresh Produce</h1>
              <p className="mt-2 text-muted-foreground">
                Browse our selection of locally-sourced farm produce.
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

            {/* Filters */}
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
          <h2 className="text-2xl font-bold">Searched Produce</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produceData.length === 0 ? (
              <p>No produce found. Try searching for something else.</p>
            ) : (
              produceData.map((produce) => (
                <Card key={produce.id}>
                  <CardHeader>
                    <CardTitle>{produce.farmName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={produce.image} alt={produce.produceName} style={styles.image} />
                    <p>Location: {produce.location}</p>
                    <p>Price: ₹{produce.price.toFixed(2)}</p>
                    <p>Available Quantity: {produce.quantity} kg</p>
                    <Button
                      onClick={() => handleBookSlot(produce.id)}
                      className={`mt-4 ${bookedSlots[produce.id] ? 'bg-green-500' : ''}`}
                      disabled={bookedSlots[produce.id]}
                    >
                      {bookedSlots[produce.id] ? 'Slot Booked' : 'Book Slot'}
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="border-t bg-background/80 py-6 backdrop-blur-sm">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <LeafIcon className="h-6 w-6 text-primary" />
            <span className="text-sm text-muted-foreground">&copy; 2024 Agro-Chain. All rights reserved.</span>
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
      <path d="M11 20A7 7 0 0 1 9.8 6.8l1.9-1.9A7 7 0 0 1 12 20z"></path>
      <path d="M12 3v18"></path>
      <path d="M3 12h18"></path>
    </svg>
  );
};
