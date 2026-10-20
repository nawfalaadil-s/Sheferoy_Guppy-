"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Trash2,
  Search,
  RefreshCw,
  Loader2,
  User,
  Inbox,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

interface Enquiry {
  id: number;
  name: string;
  contact: string;
  subject: string;
  message: string;
  status: "pending" | "contacted" | "completed";
  created_at: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data.success && Array.isArray(data.enquiries)) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: number, newStatus: Enquiry["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.contact.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = enquiries.filter((e) => e.status === "pending" || !e.status).length;
  const contactedCount = enquiries.filter((e) => e.status === "contacted").length;

  const isEmail = (str: string) => str.includes("@");
  const cleanPhone = (str: string) => str.replace(/[^0-9]/g, "");

  return (
    <div className="bg-page min-h-screen pb-20">
      <PageHeader
        eyebrow="Admin Console"
        title={
          <>
            Customer{" "}
            <span className="font-display italic text-brand">Enquiries</span>
          </>
        }
        description="Review, respond to, and manage customer inquiries received via the website contact form."
      />

      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10 -mt-6">
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-page px-3.5 py-2 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Admin Hub</span>
          </Link>

          <button
            onClick={fetchEnquiries}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-page px-3.5 py-2 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
              Total Enquiries
            </span>
            <p className="mt-1 font-display text-2xl font-bold text-heading">
              {enquiries.length}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
              Pending Response
            </span>
            <p className="mt-1 font-display text-2xl font-bold text-brand">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-success">
              Contacted
            </span>
            <p className="mt-1 font-display text-2xl font-bold text-success">
              {contactedCount}
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search enquiries by name, contact, subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-xs sm:text-sm text-heading placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-white shadow-sm overflow-x-auto">
            {["all", "pending", "contacted", "completed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === st
                    ? "bg-brand text-white shadow-sm"
                    : "text-body hover:text-heading hover:bg-page"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-border">
            <Loader2 className="h-8 w-8 text-brand animate-spin" />
            <p className="mt-3 text-xs text-muted">Loading customer enquiries...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-border text-center px-4">
            <Inbox className="h-12 w-12 text-muted/50 mb-3" />
            <h3 className="font-display text-base font-bold text-heading">
              No enquiries found
            </h3>
            <p className="mt-1 text-xs text-muted max-w-sm">
              {search || statusFilter !== "all"
                ? "Try adjusting your search terms or status filter."
                : "Customer messages sent from the Contact page will appear right here."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnquiries.map((enquiry) => {
              const formattedDate = new Date(enquiry.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              const isContactEmail = isEmail(enquiry.contact);
              const phoneDigits = cleanPhone(enquiry.contact);

              return (
                <div
                  key={enquiry.id}
                  className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-sm hover:border-brand/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-sm sm:text-base font-bold text-heading">
                            {enquiry.name}
                          </h4>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              enquiry.status === "completed"
                                ? "bg-muted/15 text-muted"
                                : enquiry.status === "contacted"
                                ? "bg-success/15 text-success"
                                : "bg-gold/15 text-gold-dark"
                            }`}
                          >
                            {enquiry.status || "pending"}
                          </span>
                        </div>
                        <p className="text-xs text-muted mt-0.5 flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{formattedDate}</span>
                        </p>
                      </div>
                    </div>

                    {/* Quick Direct Actions */}
                    <div className="flex items-center gap-2">
                      {isContactEmail ? (
                        <a
                          href={`mailto:${enquiry.contact}?subject=Re: ${encodeURIComponent(
                            enquiry.subject
                          )} - Sheferoy Guppy`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-page text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
                        >
                          <Mail className="h-3.5 w-3.5 text-brand" />
                          <span>Reply via Email</span>
                        </a>
                      ) : (
                        <>
                          {phoneDigits.length >= 10 && (
                            <a
                              href={`https://wa.me/91${phoneDigits.slice(-10)}?text=${encodeURIComponent(
                                `Hi ${enquiry.name}, thank you for contacting Sheferoy Guppy regarding "${enquiry.subject}". How can we assist you?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-success/30 bg-success/10 text-xs font-semibold text-success hover:bg-success hover:text-white transition-colors"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          )}
                          <a
                            href={`tel:${enquiry.contact}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-page text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5 text-brand" />
                            <span>Call</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                        Subject:
                      </span>{" "}
                      <span className="text-xs sm:text-sm font-semibold text-heading">
                        {enquiry.subject}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-body leading-relaxed whitespace-pre-line bg-page p-3.5 rounded-xl border border-border/60">
                      {enquiry.message}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-xs text-muted">
                      <span>
                        Contact Info: <strong className="text-heading">{enquiry.contact}</strong>
                      </span>

                      {/* Status toggle & delete */}
                      <div className="flex items-center gap-2">
                        {enquiry.status !== "contacted" && (
                          <button
                            onClick={() => handleStatusChange(enquiry.id, "contacted")}
                            disabled={updatingId === enquiry.id}
                            className="text-xs font-semibold text-success hover:underline disabled:opacity-50"
                          >
                            Mark as Contacted
                          </button>
                        )}
                        {enquiry.status === "contacted" && (
                          <button
                            onClick={() => handleStatusChange(enquiry.id, "completed")}
                            disabled={updatingId === enquiry.id}
                            className="text-xs font-semibold text-muted hover:underline disabled:opacity-50"
                          >
                            Mark as Done
                          </button>
                        )}
                        <span className="text-border">|</span>
                        <button
                          onClick={() => handleDelete(enquiry.id)}
                          disabled={updatingId === enquiry.id}
                          className="text-xs text-red-500 hover:text-red-700 transition-colors"
                          title="Delete enquiry"
                        >
                          <Trash2 className="h-3.5 w-3.5 inline" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
