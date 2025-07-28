import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

interface EWasteItem {
  type: string;
  brand: string;
  model: string;
  condition: string;
  quantity: number;
  estimatedWeight: number;
}

interface EWasteModalProps {
  trigger: React.ReactNode;
  onSubmit?: (items: EWasteItem[]) => void;
}

const EWasteModal = ({ trigger, onSubmit }: EWasteModalProps) => {
  const [items, setItems] = useState<EWasteItem[]>([{
    type: '',
    brand: '',
    model: '',
    condition: '',
    quantity: 1,
    estimatedWeight: 0
  }]);
  const [isOpen, setIsOpen] = useState(false);

  const wasteTypes = [
    'Mobile Phone',
    'Laptop',
    'Desktop Computer',
    'Tablet',
    'Television',
    'Printer',
    'Monitor',
    'Router',
    'Charger',
    'Battery',
    'Other Electronics'
  ];

  const conditions = [
    'Working',
    'Partially Working',
    'Not Working',
    'Damaged'
  ];

  const addItem = () => {
    setItems([...items, {
      type: '',
      brand: '',
      model: '',
      condition: '',
      quantity: 1,
      estimatedWeight: 0
    }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof EWasteItem, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const handleSubmit = () => {
    // Validate items
    const validItems = items.filter(item => 
      item.type && item.condition && item.quantity > 0
    );

    if (validItems.length === 0) {
      toast.error('Please add at least one valid e-waste item');
      return;
    }

    // Calculate total estimated carbon credits
    const totalWeight = validItems.reduce((sum, item) => sum + (item.estimatedWeight * item.quantity), 0);
    const estimatedCredits = Math.round(totalWeight * 0.5); // Example calculation

    toast.success(`${validItems.length} items submitted! Estimated ${estimatedCredits} carbon credits.`);
    
    if (onSubmit) {
      onSubmit(validItems);
    }
    
    setIsOpen(false);
    setItems([{
      type: '',
      brand: '',
      model: '',
      condition: '',
      quantity: 1,
      estimatedWeight: 0
    }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit E-Waste Items</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Item {index + 1}</h3>
                {items.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Type *</Label>
                  <Select
                    value={item.type}
                    onValueChange={(value) => updateItem(index, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent>
                      {wasteTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Condition *</Label>
                  <Select
                    value={item.condition}
                    onValueChange={(value) => updateItem(index, 'condition', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Brand</Label>
                  <Input
                    value={item.brand}
                    onChange={(e) => updateItem(index, 'brand', e.target.value)}
                    placeholder="e.g., Apple, Samsung"
                  />
                </div>
                
                <div>
                  <Label>Model</Label>
                  <Input
                    value={item.model}
                    onChange={(e) => updateItem(index, 'model', e.target.value)}
                    placeholder="e.g., iPhone 12, Galaxy S21"
                  />
                </div>
                
                <div>
                  <Label>Quantity *</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                  />
                </div>
                
                <div>
                  <Label>Estimated Weight (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    value={item.estimatedWeight}
                    onChange={(e) => updateItem(index, 'estimatedWeight', parseFloat(e.target.value) || 0)}
                    placeholder="0.5"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Another Item
            </Button>
            
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Submit Items
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EWasteModal;