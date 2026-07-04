"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MailOpen,
  Trash2,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Zap,
  Clock,
  User,
  AtSign,
  Briefcase,
  MessageSquare,
  Globe,
  ChevronLeft,
  ChevronRight,
  CheckCheck,
} from "lucide-react";
import type { ContactMessage } from "@/lib/supabase";

// ─── Message Card ─────────────────────────────────────────────────────────────

function MessageCard({
  msg,
  onMarkRead,
  onDelete,
}: {
  msg: ContactMessage;
  onMarkRead: (id: string, isRead: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const formattedDate = new Date(msg.created_at).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this message? This cannot be undone.")) return;
    setDeleting(true);
    await onDelete(msg.id);
  };

  const handleToggleRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkRead(msg.id, !msg.is_read);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`
        relative rounded-xl border cursor-pointer
        transition-all duration-200
        ${msg.is_read
          ? "border-white/6 bg-zinc-900/40"
          : "border-violet-500/20 bg-violet-500/5"
        }
        ${deleting ? "opacity-40 pointer-events-none" : ""}
      `}
      onClick={() => {
        setExpanded((v) => !v);
        if (!msg.is_read) onMarkRead(msg.id, true);
      }}
    >
      {/* Unread dot */}
      {!msg.is_read && (
        <span className="absolute top-4 left-3 h-1.5 w-1.5 rounded-full bg-violet-500" />
      )}

      {/* Header row */}
      <div className="flex items-start gap-3 px-5 py-4 pl-6">
        {/* Avatar */}
        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
          <span className="font-mono text-sm font-bold text-white">
            {msg.name.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className={`font-semibold text-sm truncate ${msg.is_read ? "text-zinc-300" : "text-white"}`}>
                {msg.name}
              </span>
              {!msg.is_read && (
                <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 font-mono text-[9px] text-violet-400 uppercase tracking-wider">
                  New
                </span>
              )}
            </div>
            <span className="font-mono text-[10px] text-zinc-600 shrink-0">{formattedDate}</span>
          </div>
          <p className="font-mono text-xs text-zinc-500 truncate mt-0.5">{msg.email}</p>
          {!expanded && (
            <p className="text-xs text-zinc-600 truncate mt-1">{msg.message}</p>
          )}
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pl-6 space-y-3 border-t border-white/6 pt-3">
              {/* Fields grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <AtSign className="h-3.5 w-3.5 text-zinc-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-wider">Email</p>
                    <a
                      href={`mailto:${msg.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                {msg.project && (
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-3.5 w-3.5 text-zinc-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-wider">Project</p>
                      <p className="font-mono text-xs text-zinc-300">{msg.project}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <Clock className="h-3.5 w-3.5 text-zinc-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-wider">Received</p>
                    <p className="font-mono text-xs text-zinc-400">{formattedDate}</p>
                  </div>
                </div>

                {msg.ip_address && (
                  <div className="flex items-start gap-2">
                    <Globe className="h-3.5 w-3.5 text-zinc-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-wider">IP Address</p>
                      <p className="font-mono text-xs text-zinc-500">{msg.ip_address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Message body */}
              <div className="flex items-start gap-2">
                <MessageSquare className="h-3.5 w-3.5 text-zinc-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-wider mb-1.5">Message</p>
                  <p className="text-sm text-zinc-300 leading-relaxed bg-black/30 rounded-lg px-3 py-2.5 border border-white/6">
                    {msg.message}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleToggleRead}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 font-mono text-xs text-zinc-400 hover:text-white hover:border-white/15 transition-colors"
                >
                  {msg.is_read ? (
                    <><Mail className="h-3 w-3" /> Mark unread</>
                  ) : (
                    <><MailOpen className="h-3 w-3" /> Mark read</>
                  )}
                </button>
                <a
                  href={`mailto:${msg.email}?subject=Re: Your inquiry`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 font-mono text-xs text-violet-400 hover:bg-violet-500/20 transition-colors"
                >
                  <AtSign className="h-3 w-3" /> Reply
                </a>
                <button
                  onClick={handleDelete}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 font-mono text-xs text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loggingOut, setLoggingOut] = useState(false);

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const totalPages = Math.ceil(total / 20);

  const fetchMessages = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(page),
        ...(filter !== "all" ? { filter } : {}),
      });
      const res = await fetch(`/api/admin/messages?${params}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setMessages(data.messages ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, filter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMarkRead = async (id: string, is_read: boolean) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read } : m)));
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_read }),
    });
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setTotal((t) => t - 1);
  };

  const handleMarkAllRead = async () => {
    const unread = messages.filter((m) => !m.is_read);
    setMessages((prev) => prev.map((m) => ({ ...m, is_read: true })));
    await Promise.all(
      unread.map((m) =>
        fetch("/api/admin/messages", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: m.id, is_read: true }),
        })
      )
    );
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const filteredMessages = messages.filter((m) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q) ||
      m.project?.toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/6 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white">Admin Panel</h1>
              <p className="font-mono text-[10px] text-zinc-600">aiforge.dev · messages inbox</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchMessages(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/8 bg-white/5 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <motion.span animate={{ rotate: refreshing ? 360 : 0 }} transition={{ duration: 0.7, repeat: refreshing ? Infinity : 0, ease: "linear" }}>
                <RefreshCw className="h-3.5 w-3.5" />
              </motion.span>
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/10 font-mono text-xs text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total Messages", value: total, icon: Mail, color: "text-zinc-300" },
            { label: "Unread", value: messages.filter((m) => !m.is_read).length, icon: Mail, color: "text-violet-400" },
            { label: "Read", value: messages.filter((m) => m.is_read).length, icon: MailOpen, color: "text-emerald-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-white/6 bg-zinc-900/50 px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-3.5 w-3.5 ${color}`} />
                <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">{label}</span>
              </div>
              <p className={`font-mono text-2xl font-black ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Controls ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600" />
            <input
              type="text"
              placeholder="Search name, email, message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900/60 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 font-mono text-xs text-white placeholder:text-zinc-700 outline-none focus:border-violet-500/40 transition-colors"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-zinc-900/60 border border-white/8 rounded-xl p-1">
            {(["all", "unread", "read"] as const).map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs capitalize transition-all duration-150
                  ${filter === f
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                {f}
                {f === "unread" && unreadCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-violet-500/30 text-violet-300 text-[9px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mark all read */}
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/8 bg-white/5 font-mono text-xs text-zinc-400 hover:text-white whitespace-nowrap transition-colors"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Mark all read</span>
            </button>
          )}
        </div>

        {/* ── Messages list ── */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl border border-white/6 bg-zinc-900/40 animate-pulse" />
            ))}
          </div>
        ) : filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
              <Mail className="h-5 w-5 text-zinc-600" />
            </div>
            <p className="font-mono text-sm text-zinc-600">
              {search ? "No messages match your search." : "No messages yet."}
            </p>
          </motion.div>
        ) : (
          <motion.div layout className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredMessages.map((msg) => (
                <MessageCard
                  key={msg.id}
                  msg={msg}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-white/8 font-mono text-xs text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Prev
            </button>
            <span className="font-mono text-xs text-zinc-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-white/8 font-mono text-xs text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="mt-8 text-center font-mono text-[10px] text-zinc-800 uppercase tracking-widest">
          AIforge Admin · Session expires in 8h
        </p>
      </div>
    </main>
  );
}