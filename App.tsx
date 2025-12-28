
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UsageCharts from './components/UsageCharts';
import Recharge from './components/Recharge';
import Plans from './components/Plans';
import { MOCK_USER } from './constants';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<UserProfile>(MOCK_USER);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) {
      setIsLoggedIn(true);
    } else {
      alert('يرجى إدخال رقم هاتف صحيح');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPhone('');
    setActiveTab('dashboard');
  };

  const handleRecharge = (amount: number) => {
    setUser(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
              <span className="text-white text-3xl font-black">N</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">NetManage</h1>
            <p className="text-gray-500 mt-2">بوابة الخدمات الذاتية للمشتركين</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-lg text-left"
                  placeholder="05XXXXXXXX"
                  dir="ltr"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 transform active:scale-[0.98]"
            >
              تسجيل الدخول
            </button>
          </form>

          <p className="text-center text-gray-400 mt-8 text-sm">
            بإستمرارك، أنت توافق على شروط الخدمة وسياسة الخصوصية
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'usage': return <UsageCharts user={user} />;
      case 'recharge': return <Recharge onRecharge={handleRecharge} />;
      case 'plans': return <Plans />;
      default: return <Dashboard user={user} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onLogout={handleLogout}
      userName={user.name}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {activeTab === 'dashboard' && 'نظرة عامة على حسابك'}
          {activeTab === 'usage' && 'تفاصيل استهلاك البيانات'}
          {activeTab === 'recharge' && 'شحن الرصيد والدفع'}
          {activeTab === 'plans' && 'الخدمات والباقات المتاحة'}
        </h2>
        <p className="text-gray-500">مرحباً بك في لوحة تحكم NetManage</p>
      </div>
      {renderContent()}
    </Layout>
  );
};

export default App;
