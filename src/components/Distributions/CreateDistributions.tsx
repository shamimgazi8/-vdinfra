// src/components/CreateDistributionDialog.tsx
'use client'; // This directive might be needed for Next.js app router

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { z, ZodIssue } from 'zod';
import { toast } from 'sonner';

// Define the validation schema using Zod
const distributionSchema = z.object({
  name: z.string().min(1, 'Distribution Name is required'),
  origin: z.string().min(1, 'Origin is required').url('Origin must be a valid URL'),
});

type FormData = z.infer<typeof distributionSchema>;
type FormErrors = {
  [key in keyof FormData]?: string;
};

// Define the props for the new component
interface CreateDistributionDialogProps {
  onDistributionCreated?: () => void;
}

export function CreateDistributionDialog({ onDistributionCreated }: CreateDistributionDialogProps) {
  const [formData, setFormData] = useState<FormData>({ name: '', origin: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id as keyof FormData]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors((prevErrors) => ({ ...prevErrors, [id as keyof FormErrors]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationResult = distributionSchema.safeParse(formData);

    if (validationResult.success) {
      console.log('Distribution details:', validationResult.data);
      toast.success('Distribution created successfully!', {
        description: `Distribution "${validationResult.data.name}" has been saved.`,
      });
      
      setOpen(false);
      setFormData({ name: '', origin: '' });
      
      // Call the optional callback prop if provided
      if (onDistributionCreated) {
        onDistributionCreated();
      }
    } else {
      console.error('Validation failed:', validationResult.error);
      const newErrors: FormErrors = {};
      
      if (validationResult.error && Array.isArray(validationResult.error.issues)) {
        validationResult.error.issues.forEach((issue: ZodIssue) => {
          const fieldName = issue.path[0] as keyof FormErrors; 
          if (fieldName) {
            newErrors[fieldName] = issue.message;
          }
        });
      }
      setErrors(newErrors);
      toast.error('Validation Error', {
        description: 'Please correct the highlighted fields.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-[#04A57D] hover:bg-green-700 text-white md:flex hidden">
          + Create Distribution
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create Distribution</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new CDN distribution.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Distribution Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="col-span-4 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="origin" className="text-right">
              Origin
            </Label>
            <Input
              id="origin"
              className="col-span-3"
              placeholder="e.g., example.com"
              value={formData.origin}
              onChange={handleInputChange}
            />
            {errors.origin && <p className="col-span-4 text-sm text-red-500">{errors.origin}</p>}
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save Distribution</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}