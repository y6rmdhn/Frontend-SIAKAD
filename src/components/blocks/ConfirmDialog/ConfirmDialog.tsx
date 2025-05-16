// components/ConfirmDialog.tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {useState} from "react";

interface ConfirmDialogProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    onConfirm: () => void;
}

export function ConfirmDialog({ children, title, description, onConfirm }: ConfirmDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onConfirm();
                            setOpen(false);
                        }}
                    >
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
