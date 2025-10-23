import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EquipmentCard from "@/components/EquipmentCard";
import { equipmentApi, Equipment } from "@/lib/api";
import { toast } from "sonner";

export default function Equipments() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const data = await equipmentApi.getAll();
      setEquipments(data);
    } catch (error) {
      console.error('Error fetching equipments:', error);
      toast.error('Failed to load equipment');
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", ...Array.from(new Set(equipments.map(e => e.category).filter(Boolean)))];
  const statuses = ["all", ...Array.from(new Set(equipments.map(e => e.status).filter(Boolean)))];

  const filteredEquipments = equipments.filter((equipment) => {
    const matchesSearch = 
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.equipment_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (equipment.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    
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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredEquipments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEquipments.map((equipment) => (
                <EquipmentCard key={equipment.id || equipment.equipment_id} equipment={equipment} />
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
