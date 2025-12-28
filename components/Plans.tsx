
import React from 'react';
import { AVAILABLE_PLANS } from '../constants';

const Plans: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">اكتشف باقات الإنترنت الجديدة</h2>
        <p className="text-gray-500">اختر الباقة التي تناسب استهلاكك واحتياجات منزلك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {AVAILABLE_PLANS.map((plan) => (
          <div key={plan.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col group">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{plan.name}</h3>
              <p className="text-indigo-600 font-semibold">{plan.speed}</p>
            </div>
            
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>سعة تحميل: {plan.quota}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>دعم فني 24/7</span>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t flex items-end justify-between">
              <div>
                <span className="text-3xl font-black text-gray-900">{plan.price}</span>
                <span className="text-gray-400 text-sm mr-1">د.ل/شهر</span>
              </div>
              <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-xl font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                اشتراك
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex flex-col md:flex-row items-center gap-6">
        <div className="bg-orange-500 p-4 rounded-xl text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div className="flex-1 text-center md:text-right">
          <h4 className="font-bold text-orange-900">عرض محدود!</h4>
          <p className="text-orange-800">احصل على خصم 20% عند الترقية لباقة النخبة لمدة 6 أشهر.</p>
        </div>
        <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all">
          استفد من العرض
        </button>
      </div>
    </div>
  );
};

export default Plans;
