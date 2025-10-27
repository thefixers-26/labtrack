import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Equipment } from "@/lib/api";

interface EquipmentFormProps {
  equipment?: Equipment | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function EquipmentForm({ equipment, onSubmit, onCancel, loading }: EquipmentFormProps) {
  const [formData, setFormData] = useState({
    equipment_id: equipment?.equipment_id || "",
    name: equipment?.name || "",
    make: equipment?.make || "",
    serial_no: equipment?.serial_no || "",
    model_no: equipment?.model_no || "",
    purchase_date: equipment?.purchase_date || "",
    stock_register_info: equipment?.stock_register_info || "",
    physical_presence: equipment?.physical_presence || "Available",
    working_status: equipment?.working_status || "Working",
    repair_status: equipment?.repair_status || "",
    funding_source: equipment?.funding_source || "",
    govt_registration: equipment?.govt_registration || "",
    project_completion_year: equipment?.project_completion_year || "",
    purchase_cost: equipment?.purchase_cost || "",
    location: equipment?.location || "",
    faculty_incharge: equipment?.faculty_incharge || "",
    category: equipment?.category || "",
    manufacturer: equipment?.manufacturer || "",
    status: equipment?.status || "Operational",
    specifications: equipment?.specifications || "",
    maintenance_due: equipment?.maintenance_due || "",
    assigned_user: equipment?.assigned_user || "",
    notes: equipment?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      <div className="grid grid-cols-2 gap-4">
        {/* 1. Equipment ID */}
        <div className="space-y-2">
          <Label htmlFor="equipment_id">Equipment ID *</Label>
          <Input
            id="equipment_id"
            value={formData.equipment_id}
            onChange={(e) => setFormData({ ...formData, equipment_id: e.target.value })}
            required
            disabled={!!equipment}
            placeholder="LAB-001"
          />
        </div>
        
        {/* 2. Name of the equipment/instrument */}
        <div className="space-y-2">
          <Label htmlFor="name">Name of Equipment *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Equipment name"
          />
        </div>

        {/* 3. Make */}
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Input
            id="make"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            placeholder="Manufacturer/Brand"
          />
        </div>

        {/* 4. Serial No */}
        <div className="space-y-2">
          <Label htmlFor="serial_no">Serial No.</Label>
          <Input
            id="serial_no"
            value={formData.serial_no}
            onChange={(e) => setFormData({ ...formData, serial_no: e.target.value })}
            placeholder="Serial number"
          />
        </div>

        {/* 5. Model No */}
        <div className="space-y-2">
          <Label htmlFor="model_no">Model No.</Label>
          <Input
            id="model_no"
            value={formData.model_no}
            onChange={(e) => setFormData({ ...formData, model_no: e.target.value })}
            placeholder="Model number"
          />
        </div>

        {/* 6. Date of Purchase */}
        <div className="space-y-2">
          <Label htmlFor="purchase_date">Date of Purchase</Label>
          <Input
            id="purchase_date"
            type="date"
            value={formData.purchase_date}
            onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
          />
        </div>

        {/* 7. Stock Register Info */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="stock_register_info">Page No. & Serial No. in Stock Register</Label>
          <Input
            id="stock_register_info"
            value={formData.stock_register_info}
            onChange={(e) => setFormData({ ...formData, stock_register_info: e.target.value })}
            placeholder="e.g., Page 45, Serial 120"
          />
        </div>

        {/* 8. Physical Presence */}
        <div className="space-y-2">
          <Label htmlFor="physical_presence">Physical Presence</Label>
          <Select value={formData.physical_presence} onValueChange={(value) => setFormData({ ...formData, physical_presence: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Not Available">Not Available</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 9. Working Status */}
        <div className="space-y-2">
          <Label htmlFor="working_status">Working Status</Label>
          <Select value={formData.working_status} onValueChange={(value) => setFormData({ ...formData, working_status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Working">Working</SelectItem>
              <SelectItem value="Not Working">Not Working</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 10. Repair Status (if not working) */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="repair_status">If Not Working - Repairable/Scrap Status</Label>
          <Input
            id="repair_status"
            value={formData.repair_status}
            onChange={(e) => setFormData({ ...formData, repair_status: e.target.value })}
            placeholder="e.g., Repairable, To be scrapped"
          />
        </div>

        {/* 11. Source of Funding */}
        <div className="space-y-2">
          <Label htmlFor="funding_source">Source of Funding</Label>
          <Select value={formData.funding_source} onValueChange={(value) => setFormData({ ...formData, funding_source: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="State">State</SelectItem>
              <SelectItem value="Central">Central</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 12. Government Registration */}
        <div className="space-y-2">
          <Label htmlFor="govt_registration">Govt. Agency Registration</Label>
          <Input
            id="govt_registration"
            value={formData.govt_registration}
            onChange={(e) => setFormData({ ...formData, govt_registration: e.target.value })}
            placeholder="Registration details if applicable"
          />
        </div>

        {/* 13. Project Completion Year */}
        <div className="space-y-2">
          <Label htmlFor="project_completion_year">Project Completion Year</Label>
          <Input
            id="project_completion_year"
            value={formData.project_completion_year}
            onChange={(e) => setFormData({ ...formData, project_completion_year: e.target.value })}
            placeholder="Year (e.g., 2024)"
          />
        </div>

        {/* 14. Cost */}
        <div className="space-y-2">
          <Label htmlFor="purchase_cost">Purchase Cost (₹)</Label>
          <Input
            id="purchase_cost"
            type="number"
            value={formData.purchase_cost}
            onChange={(e) => setFormData({ ...formData, purchase_cost: e.target.value })}
            placeholder="Cost in Rupees"
          />
        </div>

        {/* 15. Present Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Present Location (Block & Hall No.)</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g., Block A, Hall 101"
          />
        </div>

        {/* 16. Faculty In-charge */}
        <div className="space-y-2">
          <Label htmlFor="faculty_incharge">Faculty In-charge</Label>
          <Input
            id="faculty_incharge"
            value={formData.faculty_incharge}
            onChange={(e) => setFormData({ ...formData, faculty_incharge: e.target.value })}
            placeholder="Faculty name"
          />
        </div>

        {/* Additional fields for backward compatibility */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g., Testing, Machining"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Operational Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Operational">Operational</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Out of Service">Out of Service</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maintenance_due">Next Maintenance</Label>
          <Input
            id="maintenance_due"
            type="date"
            value={formData.maintenance_due}
            onChange={(e) => setFormData({ ...formData, maintenance_due: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assigned_user">Assigned User</Label>
          <Input
            id="assigned_user"
            value={formData.assigned_user}
            onChange={(e) => setFormData({ ...formData, assigned_user: e.target.value })}
            placeholder="User name or email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specifications">Specifications</Label>
        <Textarea
          id="specifications"
          value={formData.specifications}
          onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
          placeholder="Technical specifications..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
          rows={2}
        />
      </div>

      <div className="flex gap-2 justify-end pt-4 sticky bottom-0 bg-background">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : equipment ? "Update" : "Add"} Equipment
        </Button>
      </div>
    </form>
  );
}