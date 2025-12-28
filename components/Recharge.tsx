
import React, { useState } from 'react';

interface RechargeProps {
  onRecharge: (amount: number) => void;
}

const Recharge: React.FC<RechargeProps> = ({ onRecharge }) => {
  const [amount, setAmount] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (val > 0) {
      onRecharge(val);
      setSuccess(true);
      setAmount('');
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const presets = [50, 100, 200, 500];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-6">شحن رصيد المحفظة</h3>
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span>تم شحن الرصيد بنجاح!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">المبلغ المطلوب شحنه (د.ل)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="0.00"
              required
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setAmount(p.toString())}
                className="px-6 py-2 rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors font-bold"
              >
                {p} د.ل
              </button>
            ))}
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-4">اختر وسيلة الدفع</h4>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="p-4 border rounded-xl flex items-center justify-center gap-2 hover:border-indigo-500 transition-colors">
                <span className="font-bold">سداد / ادفع لي</span>
              </button>
              <button type="button" className="p-4 border rounded-xl flex items-center justify-center gap-2 hover:border-indigo-500 transition-colors">
                <span className="font-bold">تداول / بطاقة مصرفية</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            إتمام عملية الشحن
          </button>
        </form>
      </div>
    </div>
  );
};

export default Recharge;
