'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  MessageCircle,
  DollarSign,
  Target,
  Activity,
  UserPlus,
  RefreshCw,
  Eye,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Revenue Data (JPY)
  const revenueData = {
    total: 8000000, // 8M JPY average
    subscriptions: 5200000,
    inAppPurchases: 2100000,
    advertising: 700000,
    growth: 12.5
  };

  // Cost Data
  const costData = {
    advertising: 1000000, // 1M JPY
    operations: 450000,
    development: 600000,
    support: 280000,
    total: 2330000
  };

  // User Engagement Metrics
  const engagementMetrics = {
    dau: 24500,
    mau: 186000,
    dauMauRatio: 13.2,
    avgSessionDuration: '18m 32s',
    sessionsPerUser: 5.8,
    activeUsersGrowth: 8.3
  };

  // Matching Metrics
  const matchingMetrics = {
    totalMatches: 45600,
    matchRate: 23.5,
    avgMatchesPerUser: 4.2,
    swipeRight: 156000,
    swipeLeft: 342000,
    swipeRightRate: 31.3,
    mutualLikes: 28900
  };

  // Message Metrics
  const messageMetrics = {
    totalMessages: 892000,
    avgMessagesPerMatch: 19.6,
    responseRate: 67.8,
    avgResponseTime: '2h 15m',
    conversationStartRate: 58.4,
    activeConversations: 23400
  };

  // Retention & Conversion
  const retentionData = {
    day1: 68.5,
    day7: 42.3,
    day30: 28.7,
    day90: 15.2
  };

  const conversionData = {
    freeToTrial: 18.5,
    trialToPaid: 45.2,
    overallConversion: 8.4,
    churnRate: 4.2
  };

  // Financial Metrics
  const financialMetrics = {
    arpu: 4301, // JPY
    arppu: 12800, // JPY
    ltv: 89400, // JPY
    cac: 8500, // JPY
    ltvCacRatio: 10.5,
    paybackPeriod: '2.1 months'
  };

  // Top Features Usage
  const featureUsage = [
    { name: 'Profile Views', users: 158000, percentage: 84.9 },
    { name: 'Swiping', users: 145000, percentage: 77.9 },
    { name: 'Messaging', users: 89000, percentage: 47.8 },
    { name: 'Filters', users: 76000, percentage: 40.9 },
    { name: 'Video Chat', users: 34500, percentage: 18.5 },
    { name: 'Events', users: 28900, percentage: 15.5 }
  ];

  const formatCurrency = (amount: number) => {
    return `¥${(amount / 1000000).toFixed(2)}M`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-[#e8e8e8] p-4 font-sans">
      <div className="mx-auto max-w-[1600px] bg-[#fff] rounded-lg shadow-lg">
        {/* Title Bar */}
        <div className="bg-[#323232] px-4 py-3 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Link href="/" className="hover:bg-white/20 p-1 rounded transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Activity className="w-4 h-4" />
            <span>Matching App Analytics Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white/10 text-white text-xs px-3 py-1 rounded border border-white/20"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <div className="bg-white/90 px-3 py-1 text-xs text-[#323232] font-semibold rounded">
              Dashboard
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Revenue Overview */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Revenue Overview
            </h2>
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-green-700 font-semibold">Total Revenue</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-900">{formatCurrency(revenueData.total)}</div>
                <div className="text-xs text-green-600 mt-1">+{revenueData.growth}% vs last month</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Subscriptions</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(revenueData.subscriptions)}</div>
                <div className="text-xs text-gray-500 mt-1">65% of total</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">In-App Purchases</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(revenueData.inAppPurchases)}</div>
                <div className="text-xs text-gray-500 mt-1">26.3% of total</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Ad Revenue</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(revenueData.advertising)}</div>
                <div className="text-xs text-gray-500 mt-1">8.7% of total</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-700 font-semibold mb-2">Net Profit</div>
                <div className="text-xl font-bold text-blue-900">
                  {formatCurrency(revenueData.total - costData.total)}
                </div>
                <div className="text-xs text-blue-600 mt-1">70.9% margin</div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-600" />
              Cost Breakdown
            </h2>
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                <div className="text-xs text-red-700 font-semibold mb-2">Total Costs</div>
                <div className="text-2xl font-bold text-red-900">{formatCurrency(costData.total)}</div>
                <div className="text-xs text-red-600 mt-1">29.1% of revenue</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Advertising Spend</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(costData.advertising)}</div>
                <div className="text-xs text-gray-500 mt-1">42.9% of costs</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Development</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(costData.development)}</div>
                <div className="text-xs text-gray-500 mt-1">25.8% of costs</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Operations</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(costData.operations)}</div>
                <div className="text-xs text-gray-500 mt-1">19.3% of costs</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Support</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(costData.support)}</div>
                <div className="text-xs text-gray-500 mt-1">12.0% of costs</div>
              </div>
            </div>
          </div>

          {/* User Engagement */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              User Engagement
            </h2>
            <div className="grid grid-cols-6 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-purple-700 font-semibold">DAU</span>
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-900">{formatNumber(engagementMetrics.dau)}</div>
                <div className="text-xs text-purple-600 mt-1">Daily Active Users</div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-indigo-700 font-semibold">MAU</span>
                  <UserPlus className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-indigo-900">{formatNumber(engagementMetrics.mau)}</div>
                <div className="text-xs text-indigo-600 mt-1">Monthly Active Users</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">DAU/MAU Ratio</div>
                <div className="text-xl font-bold text-gray-900">{engagementMetrics.dauMauRatio}%</div>
                <div className="text-xs text-green-600 mt-1">+{engagementMetrics.activeUsersGrowth}% growth</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <Clock className="w-3 h-3" />
                  <span>Avg Session</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{engagementMetrics.avgSessionDuration}</div>
                <div className="text-xs text-gray-500 mt-1">per user</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <RefreshCw className="w-3 h-3" />
                  <span>Sessions/User</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{engagementMetrics.sessionsPerUser}</div>
                <div className="text-xs text-gray-500 mt-1">per day</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Growth Rate</div>
                <div className="text-xl font-bold text-green-600">+{engagementMetrics.activeUsersGrowth}%</div>
                <div className="text-xs text-gray-500 mt-1">month over month</div>
              </div>
            </div>
          </div>

          {/* Matching & Messaging Metrics */}
          <div className="grid grid-cols-2 gap-6">
            {/* Matching Metrics */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-600" />
                Matching Metrics
              </h2>
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-xs text-pink-700 font-semibold">Total Matches</div>
                      <div className="text-2xl font-bold text-pink-900">{formatNumber(matchingMetrics.totalMatches)}</div>
                    </div>
                    <Heart className="w-5 h-5 text-pink-600 fill-pink-600" />
                  </div>
                  <div className="text-xs text-pink-600">This month</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Match Rate</div>
                    <div className="text-lg font-bold text-gray-900">{matchingMetrics.matchRate}%</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Avg Matches/User</div>
                    <div className="text-lg font-bold text-gray-900">{matchingMetrics.avgMatchesPerUser}</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-3">Swipe Activity</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Swipe Right</span>
                      <span className="text-sm font-bold text-green-600">{formatNumber(matchingMetrics.swipeRight)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${matchingMetrics.swipeRightRate}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Swipe Left</span>
                      <span className="text-sm font-bold text-red-600">{formatNumber(matchingMetrics.swipeLeft)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${100 - matchingMetrics.swipeRightRate}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Mutual Likes</span>
                    <span className="text-lg font-bold text-pink-600">{formatNumber(matchingMetrics.mutualLikes)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messaging Metrics */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                Messaging Metrics
              </h2>
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-xs text-blue-700 font-semibold">Total Messages</div>
                      <div className="text-2xl font-bold text-blue-900">{formatNumber(messageMetrics.totalMessages)}</div>
                    </div>
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-xs text-blue-600">This month</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Response Rate</div>
                    <div className="text-lg font-bold text-gray-900">{messageMetrics.responseRate}%</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Avg Response Time</div>
                    <div className="text-lg font-bold text-gray-900">{messageMetrics.avgResponseTime}</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-3">Conversation Activity</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Avg Messages/Match</span>
                      <span className="text-sm font-bold text-gray-900">{messageMetrics.avgMessagesPerMatch}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Conversation Start Rate</span>
                      <span className="text-sm font-bold text-green-600">{messageMetrics.conversationStartRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Active Conversations</span>
                      <span className="text-sm font-bold text-blue-600">{formatNumber(messageMetrics.activeConversations)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-700 font-semibold">Engagement Score</span>
                    <span className="text-lg font-bold text-green-900">8.7/10</span>
                  </div>
                  <div className="text-xs text-green-600 mt-1">Excellent engagement</div>
                </div>
              </div>
            </div>
          </div>

          {/* Retention & Conversion */}
          <div className="grid grid-cols-2 gap-6">
            {/* Retention */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-orange-600" />
                User Retention
              </h2>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-700">Day 1 Retention</span>
                      <span className="text-lg font-bold text-gray-900">{retentionData.day1}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{ width: `${retentionData.day1}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-700">Day 7 Retention</span>
                      <span className="text-lg font-bold text-gray-900">{retentionData.day7}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full" style={{ width: `${retentionData.day7}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-700">Day 30 Retention</span>
                      <span className="text-lg font-bold text-gray-900">{retentionData.day30}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full" style={{ width: `${retentionData.day30}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-700">Day 90 Retention</span>
                      <span className="text-lg font-bold text-gray-900">{retentionData.day90}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full" style={{ width: `${retentionData.day90}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                Conversion Metrics
              </h2>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg">
                    <span className="text-sm text-teal-700 font-semibold">Free to Trial</span>
                    <span className="text-lg font-bold text-teal-900">{conversionData.freeToTrial}%</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="text-sm text-blue-700 font-semibold">Trial to Paid</span>
                    <span className="text-lg font-bold text-blue-900">{conversionData.trialToPaid}%</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="text-sm text-green-700 font-semibold">Overall Conversion</span>
                    <span className="text-lg font-bold text-green-900">{conversionData.overallConversion}%</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                    <span className="text-sm text-red-700 font-semibold">Churn Rate</span>
                    <span className="text-lg font-bold text-red-900">{conversionData.churnRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Metrics */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-600" />
              Key Financial Metrics
            </h2>
            <div className="grid grid-cols-6 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                <div className="text-xs text-yellow-700 font-semibold mb-2">ARPU</div>
                <div className="text-xl font-bold text-yellow-900">¥{financialMetrics.arpu}</div>
                <div className="text-xs text-yellow-600 mt-1">per user</div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
                <div className="text-xs text-amber-700 font-semibold mb-2">ARPPU</div>
                <div className="text-xl font-bold text-amber-900">¥{financialMetrics.arppu}</div>
                <div className="text-xs text-amber-600 mt-1">per paying user</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200">
                <div className="text-xs text-emerald-700 font-semibold mb-2">LTV</div>
                <div className="text-xl font-bold text-emerald-900">¥{financialMetrics.ltv}</div>
                <div className="text-xs text-emerald-600 mt-1">lifetime value</div>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg border border-cyan-200">
                <div className="text-xs text-cyan-700 font-semibold mb-2">CAC</div>
                <div className="text-xl font-bold text-cyan-900">¥{financialMetrics.cac}</div>
                <div className="text-xs text-cyan-600 mt-1">acquisition cost</div>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-4 rounded-lg border border-violet-200">
                <div className="text-xs text-violet-700 font-semibold mb-2">LTV:CAC</div>
                <div className="text-xl font-bold text-violet-900">{financialMetrics.ltvCacRatio}:1</div>
                <div className="text-xs text-violet-600 mt-1">excellent ratio</div>
              </div>

              <div className="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 p-4 rounded-lg border border-fuchsia-200">
                <div className="text-xs text-fuchsia-700 font-semibold mb-2">Payback Period</div>
                <div className="text-lg font-bold text-fuchsia-900">{financialMetrics.paybackPeriod}</div>
                <div className="text-xs text-fuchsia-600 mt-1">ROI timeline</div>
              </div>
            </div>
          </div>

          {/* Feature Usage */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600" />
              Feature Usage
            </h2>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="space-y-3">
                {featureUsage.map((feature, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700 font-medium">{feature.name}</span>
                        <span className="text-xs text-gray-500">({formatNumber(feature.users)} users)</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{feature.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          index === 0 ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                          index === 1 ? 'bg-gradient-to-r from-pink-400 to-pink-600' :
                          index === 2 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                          index === 3 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                          index === 4 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                          'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${feature.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-gradient-to-r from-[#323232] to-[#4a4a4a] p-6 rounded-lg text-white">
            <h3 className="text-lg font-bold mb-4">Executive Summary</h3>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-xs text-gray-300 mb-1">Monthly Performance</div>
                <div className="text-sm">
                  Revenue up <span className="font-bold text-green-400">12.5%</span>,
                  costs optimized at <span className="font-bold text-blue-400">29.1%</span> of revenue
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-300 mb-1">User Growth</div>
                <div className="text-sm">
                  MAU grew <span className="font-bold text-green-400">8.3%</span>,
                  strong engagement with <span className="font-bold text-purple-400">13.2%</span> DAU/MAU ratio
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-300 mb-1">Matching Success</div>
                <div className="text-sm">
                  <span className="font-bold text-pink-400">45.6K</span> matches this month,
                  <span className="font-bold text-pink-400">23.5%</span> match rate
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-300 mb-1">Financial Health</div>
                <div className="text-sm">
                  LTV:CAC ratio <span className="font-bold text-yellow-400">10.5:1</span>,
                  payback in <span className="font-bold text-cyan-400">2.1 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
