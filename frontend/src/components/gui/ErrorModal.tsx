'use client'

import { TriangleAlert } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ErrorModalProps {
  open: boolean
  onClose: () => void
  message: string
}

export default function ErrorModal({ open, onClose, message }: ErrorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader className="flex flex-col items-center space-y-3 text-center">
          <TriangleAlert className="w-10 h-10 text-red-500" />
          <DialogTitle className="text-lg font-semibold text-red-600">
            Error
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mt-4">
          <Button onClick={onClose} variant="destructive" className="px-6 button-primary">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
