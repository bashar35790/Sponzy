'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import {
  ShieldCheck,
  Users,
  DollarSign,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  Search,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Clock,
  UserCheck,
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'verifications' | 'users' | 'transactions'>('verifications');
  const [stats, setStats] = useState<any>(null);
  const [verifications, setVerifications] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Protection
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, verifRes, usersRes, txRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/verifications'),
        api.get('/admin/users'),
        api.get('/admin/transactions'),
      ]);

      if (statsRes.data?.stats) setStats(statsRes.data.stats);
      if (verifRes.data?.requests) setVerifications(verifRes.data.requests);
      if (usersRes.data?.users) setUsers(usersRes.data.users);
      if (txRes.data?.transactions) setTransactions(txRes.data.transactions);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchAdminData();
    }
  }, [user]);

  const handleUpdateVerification = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    setActionLoading(id);
    try {
      await api.put(`/admin/verifications/${id}`, { status });
      // Update local state
      setVerifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      fetchAdminData();
    } catch (err) {
      alert('Failed to update verification status.');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (authLoading || (!user && loading)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-transparent p-6 rounded-3xl border border-amber-500/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-dark-bg shadow-lg shadow-amber-500/20">
            <ShieldCheck className="w-8 h-8 font-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Platform Administration</h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage platform metrics, creator KYC approvals, users, and fee revenues.
            </p>
          </div>
        </div>

        <button
          onClick={fetchAdminData}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-dark-card border border-dark-border text-xs font-bold text-slate-200 hover:text-white hover:bg-dark-hover transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Row */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Total Accounts</span>
              <Users className="w-4 h-4 text-brand-400" />
            </div>
            <div className="text-2xl font-black text-white">{stats.totalUsers || 0}</div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="text-pink-400 font-bold">{stats.totalCreators || 0} Creators</span>
              <span>•</span>
              <span>{(stats.totalUsers || 0) - (stats.totalCreators || 0)} Members</span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Active Subscriptions</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white">{stats.activeSubscriptions || 0}</div>
            <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Recurring monthly volume</span>
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold">Gross Volume</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">
              ${Number(stats.totalGrossVolume || 0).toFixed(2)}
            </div>
            <p className="text-[11px] text-slate-400">Total transacted across subscriptions & PPV</p>
          </div>

          <div className="p-5 rounded-3xl bg-dark-card border border-amber-500/20 bg-amber-500/5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold text-amber-300">Platform Earnings</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400">
              ${Number(stats.totalPlatformEarnings || 0).toFixed(2)}
            </div>
            <p className="text-[11px] text-amber-300/80">Platform commission net revenue</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-dark-border pb-3">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'verifications'
                ? 'bg-brand-600 text-white shadow-md shadow-pink-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Creator KYC Queue</span>
            {verifications.filter((v) => v.status === 'PENDING').length > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-pink-500 text-white font-black">
                {verifications.filter((v) => v.status === 'PENDING').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-brand-600 text-white shadow-md shadow-pink-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Management</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'transactions'
                ? 'bg-brand-600 text-white shadow-md shadow-pink-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Transactions Log</span>
          </button>
        </div>

        {/* Tab 1: KYC Verifications */}
        {activeTab === 'verifications' && (
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-200">Creator Identity Verification Requests</h2>
            {verifications.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No verification requests currently submitted.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-dark-bg/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-dark-border">
                    <tr>
                      <th className="py-3 px-4">Creator</th>
                      <th className="py-3 px-4">Document Type</th>
                      <th className="py-3 px-4">ID Photo</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {verifications.map((req) => (
                      <tr key={req.id} className="hover:bg-dark-hover/50">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <img
                            src={req.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80'}
                            className="w-8 h-8 rounded-full object-cover"
                            alt={req.user?.name}
                          />
                          <div>
                            <p className="font-bold text-slate-200">{req.user?.name}</p>
                            <p className="text-[11px] text-slate-500">@{req.user?.username}</p>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold">{req.docType || 'Passport / National ID'}</td>
                        <td className="py-3.5 px-4">
                          <a
                            href={req.documentUrl || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="text-pink-400 font-bold hover:underline"
                          >
                            View Document ↗
                          </a>
                        </td>
                        <td className="py-3.5 px-4">
                          {req.status === 'PENDING' && (
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px]">
                              Pending Review
                            </span>
                          )}
                          {req.status === 'APPROVED' && (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                              Approved
                            </span>
                          )}
                          {req.status === 'REJECTED' && (
                            <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 font-bold text-[10px]">
                              Rejected
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {req.status === 'PENDING' ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleUpdateVerification(req.id, 'APPROVED')}
                                disabled={actionLoading === req.id}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleUpdateVerification(req.id, 'REJECTED')}
                                disabled={actionLoading === req.id}
                                className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white font-bold text-xs flex items-center gap-1 transition-all"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Reject</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-500 text-xs italic">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Users */}
        {activeTab === 'users' && (
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search name, username, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-2xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-dark-bg border border-dark-border rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                >
                  <option value="ALL">All Roles</option>
                  <option value="CREATOR">Creators</option>
                  <option value="USER">Members</option>
                  <option value="ADMIN">Admins</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-dark-bg/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-dark-border">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role & Category</th>
                    <th className="py-3 px-4">Wallet Balance</th>
                    <th className="py-3 px-4">Posts</th>
                    <th className="py-3 px-4">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-dark-hover/50">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80'}
                          className="w-8 h-8 rounded-full object-cover"
                          alt={u.name}
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-slate-200">{u.name}</span>
                            {u.isVerified && <CheckCircle2 className="w-3 h-3 text-brand-500 fill-brand-500" />}
                          </div>
                          <span className="text-[11px] text-slate-500">@{u.username}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{u.email}</td>
                      <td className="py-3.5 px-4">
                        {u.role === 'ADMIN' ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                            👑 Admin
                          </span>
                        ) : u.role === 'CREATOR' ? (
                          <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-pink-400 font-bold text-[10px]">
                            ✨ {u.profession || 'Creator'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold text-[10px]">
                            💜 Member
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400">
                        ${Number(u.walletBalance || 0).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">{u._count?.posts || 0}</td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Transactions */}
        {activeTab === 'transactions' && (
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-200">Recent Platform Transactions</h2>
            {transactions.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">No transactions recorded yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-dark-bg/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-dark-border">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Platform Fee</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-dark-hover/50">
                        <td className="py-3.5 px-4 font-bold text-slate-200">{tx.user?.name || 'User'}</td>
                        <td className="py-3.5 px-4 font-semibold">{tx.type}</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-400">${Number(tx.amount).toFixed(2)}</td>
                        <td className="py-3.5 px-4 text-amber-400">${Number(tx.platformFee || 0).toFixed(2)}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
