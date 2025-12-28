
import React, { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { analyzeUsage } from '../services/geminiService';
import { MOCK_OFFERS } from '../constants';

interface DashboardProps {
  user: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [insight, setInsight] = useState<string>("جاري تحليل استهلاكك...");
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const text = await analyzeUsage(user);
      setInsight(text);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, [user]);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">الرصيد المتاح</p>
          <h2 className="text-3xl font-bold text-indigo-600">{user.balance.toFixed(2)} <span className="text-sm font-normal text-gray-400">د.ل</span></h2>
          <div className="mt-4 flex items-center gap-2 text-green-600 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            <span>جاهز للتجديد التلقائي</span>
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">الباقة الحالية</p>
          <h2 className="text-xl font-bold">{user.currentPlan}</h2>
          <p className="text-gray-400 text-sm mt-1">تاريخ التجديد: {user.renewalDate}</p>
        </div>

        {/* Data Usage Quick View */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">الاستهلاك الكلي هذا الشهر</p>
          <h2 className="text-3xl font-bold text-orange-500">140.2 <span className="text-sm font-normal text-gray-400">جيجا</span></h2>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>

      {/* AI Assistant Insight */}
      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 className="font-bold text-indigo-900">مساعد NetManage الذكي</h3>
        </div>
        <p className={`text-indigo-800 leading-relaxed ${loadingInsight ? 'animate-pulse' : ''}`}>
          {insight}
        </p>
      </div>

      {/* Promotions Section */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">أحدث العروض والمزايا</h3>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">عرض الكل</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_OFFERS.map((offer) => (
            <div key={offer.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-start gap-4">
                <div className="text-4xl bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center border border-gray-100 group-hover:bg-indigo-50 transition-colors">
                  {offer.image}
                </div>
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded mb-2 uppercase tracking-wide">
                    {offer.badge}
                  </span>
                  <h4 className="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">{offer.title}</h4>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{offer.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
