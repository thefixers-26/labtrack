import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, Plus, Edit, Trash2, Download, QrCode, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { equipmentApi, scanLogApi, Equipment, ScanLog } from "@/lib/api";
import EquipmentForm from "@/components/EquipmentForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [scanLogs, setScanLogs] = useState<ScanLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedQrUrl, setSelectedQrUrl] = useState<string>("");
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const [equipmentData, logsData] = await Promise.all([
        equipmentApi.getAll(),
        scanLogApi.getAll(),
      ]);
      setEquipments(equipmentData);
      setScanLogs(logsData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "admin@lab.com" && password === "admin123") {
      setIsAuthenticated(true);
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials. Try admin@lab.com / admin123");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    toast.success("Logged out successfully");
  };

  const handleAddEquipment = async (data: any) => {
    setLoading(true);
    try {
      const newEquipment = await equipmentApi.create(data);
      setEquipments([newEquipment, ...equipments]);
      setIsAddDialogOpen(false);
      toast.success("Equipment added successfully!");
      
      // Show QR code dialog
      if (newEquipment.qr_url) {
        setSelectedQrUrl(newEquipment.qr_url);
        setSelectedEquipmentId(newEquipment.equipment_id);
        setQrDialogOpen(true);
      }
    } catch (error) {
      console.error("Error adding equipment:", error);
      toast.error("Failed to add equipment");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEquipment = async (data: any) => {
    if (!editingEquipment) return;
    
    setLoading(true);
    try {
      const updated = await equipmentApi.update(editingEquipment.equipment_id, data);
      setEquipments(equipments.map(eq => 
        eq.equipment_id === editingEquipment.equipment_id ? updated : eq
      ));
      setEditingEquipment(null);
      toast.success("Equipment updated successfully!");
    } catch (error) {
      console.error("Error updating equipment:", error);
      toast.error("Failed to update equipment");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEquipment = async (equipmentId: string) => {
    try {
      await equipmentApi.delete(equipmentId);
      setEquipments(equipments.filter(eq => eq.equipment_id !== equipmentId));
      setDeletingId(null);
      toast.success("Equipment deleted successfully!");
    } catch (error) {
      console.error("Error deleting equipment:", error);
      toast.error("Failed to delete equipment");
    }
  };

  const handleDownloadQR = () => {
    if (!selectedQrUrl) return;
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = selectedQrUrl;
    link.download = `QR_${selectedEquipmentId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR code downloaded!");
  };

  const handleShowQR = (equipment: Equipment) => {
    if (equipment.qr_url) {
      setSelectedQrUrl(equipment.qr_url);
      setSelectedEquipmentId(equipment.equipment_id);
      setQrDialogOpen(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@lab.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Demo: admin@lab.com / admin123
                </p>
              </form>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage equipment, view logs, and generate QR codes
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <Tabs defaultValue="equipment" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="logs">Scan Logs</TabsTrigger>
            </TabsList>

            {/* Equipment Management Tab */}
            <TabsContent value="equipment" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Equipment Management</CardTitle>
                      <CardDescription>Add, edit, or delete equipment items</CardDescription>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Equipment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Add New Equipment</DialogTitle>
                          <DialogDescription>
                            Fill in the details to add new equipment. QR code will be generated automatically.
                          </DialogDescription>
                        </DialogHeader>
                        <EquipmentForm
                          onSubmit={handleAddEquipment}
                          onCancel={() => setIsAddDialogOpen(false)}
                          loading={loading}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {equipments.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        No equipment found. Add your first equipment to get started.
                      </div>
                    ) : (
                      equipments.map((equipment) => (
                        <div
                          key={equipment.equipment_id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{equipment.name}</h3>
                              {equipment.status && (
                                <Badge
                                  className={
                                    equipment.status === "Operational"
                                      ? "bg-success"
                                      : equipment.status === "Maintenance"
                                      ? "bg-warning"
                                      : "bg-destructive"
                                  }
                                >
                                  {equipment.status}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>ID: {equipment.equipment_id}</span>
                              {equipment.category && (
                                <>
                                  <span>•</span>
                                  <span>{equipment.category}</span>
                                </>
                              )}
                              {equipment.location && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {equipment.location}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleShowQR(equipment)}
                              disabled={!equipment.qr_url}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Dialog open={editingEquipment?.equipment_id === equipment.equipment_id} onOpenChange={(open) => !open && setEditingEquipment(null)}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setEditingEquipment(equipment)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Equipment</DialogTitle>
                                  <DialogDescription>
                                    Update equipment details
                                  </DialogDescription>
                                </DialogHeader>
                                <EquipmentForm
                                  equipment={editingEquipment}
                                  onSubmit={handleUpdateEquipment}
                                  onCancel={() => setEditingEquipment(null)}
                                  loading={loading}
                                />
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setDeletingId(equipment.equipment_id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scan Logs Tab */}
            <TabsContent value="logs" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Scan Logs</CardTitle>
                      <CardDescription>
                        Track when and where equipment was scanned
                      </CardDescription>
                    </div>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scanLogs.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        No scan logs yet. Scan a QR code to create logs.
                      </div>
                    ) : (
                      scanLogs.map((log) => (
                        <div
                          key={log.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card"
                        >
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-semibold">{log.equipment_id}</span>
                              <span className="text-sm text-muted-foreground">
                                by {log.user_info || "Guest"}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>
                                {log.scanned_at && new Date(log.scanned_at).toLocaleString()}
                              </span>
                              {log.latitude && log.longitude && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {log.latitude.toFixed(4)}, {log.longitude.toFixed(4)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          {log.latitude && log.longitude && (
                            <a
                              href={`https://www.google.com/maps?q=${log.latitude},${log.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="outline" size="sm">
                                View on Map
                              </Button>
                            </a>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Equipment QR Code</DialogTitle>
            <DialogDescription>
              QR Code for {selectedEquipmentId}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            {selectedQrUrl && (
              <img 
                src={selectedQrUrl} 
                alt={`QR code for ${selectedEquipmentId}`}
                className="w-64 h-64 border rounded-lg"
              />
            )}
            <Button onClick={handleDownloadQR} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the equipment
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDeleteEquipment(deletingId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}
