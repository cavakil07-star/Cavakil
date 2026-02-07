"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Phone,
  User,
  Star,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function ContactUsDetailsDialog({ contact }) {
  const createdAt = format(
    new Date(contact.createdAt),
    "dd MMM yyyy 'at' h:mm a"
  );
  const updatedAt = format(
    new Date(contact.updatedAt),
    "dd MMM yyyy 'at' h:mm a"
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return { variant: 'success', icon: <CheckCircle2 size={14} /> };
      case 'reviewed':
        return { variant: 'warning', icon: <Clock size={14} /> };
      default:
        return { variant: 'destructive', icon: <XCircle size={14} /> };
    }
  };

  const statusBadge = getStatusBadge(contact.status);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="hover:bg-gray-100">
          <Eye size={18} className="text-gray-600" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-5xl p-6 bg-white rounded-xl">
        <DialogHeader className="border-b pb-3 mb-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare size={22} className="text-primary" />
              Contact Submission Details
            </DialogTitle>
            <div className="flex gap-2">
              <Badge
                variant={statusBadge.variant}
                className="flex items-center gap-1 py-1"
              >
                {statusBadge.icon}
                {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
              </Badge>

              {contact.important && (
                <Badge
                  variant="warning"
                  className="flex items-center gap-1 py-1"
                >
                  <Star size={14} className="fill-yellow-400" />
                  Important
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
              Contact Information
            </h3>

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <User size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{contact.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Mail size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{contact.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Phone size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{contact.phone}</p>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
              Timestamps
            </h3>

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Clock size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Submitted At</p>
                <p className="font-medium">{createdAt}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Clock size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{updatedAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
            Message
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">{contact.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
