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
    category: equipment?.category || "",
    manufacturer: equipment?.manufacturer || "",
    serial_no: equipment?.serial_no || "",
    purchase_date: equipment?.purchase_date || "",
    location: equipment?.location || "",
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
        
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Equipment name"
          />
        </div>

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
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            id="manufacturer"
            value={formData.manufacturer}
            onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
            placeholder="Manufacturer name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="serial_no">Serial Number</Label>
          <Input
            id="serial_no"
            value={formData.serial_no}
            onChange={(e) => setFormData({ ...formData, serial_no: e.target.value })}
            placeholder="Serial number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchase_date">Purchase Date</Label>
          <Input
            id="purchase_date"
            type="date"
            value={formData.purchase_date}
            onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g., Lab A, Room 101"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
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

      <div className="flex gap-2 justify-end pt-4">
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