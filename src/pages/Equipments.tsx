import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EquipmentCard from "@/components/EquipmentCard";

// Temporary mock data - will be replaced with Supabase data
const mockEquipments = [
  {
    id: "1",
    equipment_id: "LAB-001",
    name: "Lathe Machine",
    category: "Machining",
    location: "Workshop A",
    status: "Operational",
    manufacturer: "HMT",
    maintenance_due: "2025-12-15",
  },
  {
    id: "2",
    equipment_id: "LAB-002",
    name: "Milling Machine",
    category: "Machining",
    location: "Workshop A",
    status: "Maintenance",
    manufacturer: "ACE",
    maintenance_due: "2025-11-01",
  },
  {
    id: "3",
    equipment_id: "LAB-003",
    name: "3D Printer",
    category: "Prototyping",
    location: "Design Lab",
    status: "Operational",
    manufacturer: "Prusa",
    maintenance_due: "2026-01-20",
  },
  {
    id: "4",
    equipment_id: "LAB-004",
    name: "Oscilloscope",
    category: "Electronics",
    location: "Electronics Lab",
    status: "Operational",
    manufacturer: "Tektronix",
    maintenance_due: "2025-11-30",
  },
];

export default function Equipments() {
  const [equipments, setEquipments] = useState(mockEquipments);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const categories = ["all", ...Array.from(new Set(mockEquipments.map(e => e.category)))];
  const statuses = ["all", ...Array.from(new Set(mockEquipments.map(e => e.status)))];

  const filteredEquipments = equipments.filter((equipment) => {
    const matchesSearch = 
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.equipment_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || equipment.category === filterCategory;
    const matchesStatus = filterStatus === "all" || equipment.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Lab Equipment</h1>
            <p className="text-muted-foreground">
              Browse and search through all available laboratory equipment
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, ID, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>

              {/* Category Filter */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full lg:w-[200px] h-11">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full lg:w-[200px] h-11">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Statuses" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {filteredEquipments.length} of {equipments.length} equipment items
              </span>
            </div>
          </div>

          {/* Equipment Grid */}
          {filteredEquipments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEquipments.map((equipment) => (
                <EquipmentCard key={equipment.id} equipment={equipment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-block p-6 rounded-full bg-secondary mb-4">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No equipment found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
