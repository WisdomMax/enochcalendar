import { EnochDate } from "@/types/calendar";
import { X } from "lucide-react";

interface DateDetailModalProps {
  day: EnochDate | null;
  onClose: () => void;
}

export default function DateDetailModal({ day, onClose }: DateDetailModalProps) {
  if (!day) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <div 
        className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-3xl font-black text-gray-100 tracking-tighter">{day.monthName} {day.enochDay}일</h3>
              <p className="text-blue-500 font-bold uppercase tracking-widest text-xs mt-1">{day.weekday}</p>
            </div>
            <button onClick={onClose} className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-all border border-gray-700">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="space-y-5">
            <div className="bg-gray-950/50 p-5 rounded-2xl border border-gray-800">
              <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-widest font-black">양력 날짜 (Gregorian)</p>
              <p className="text-xl font-bold text-gray-300">{day.gregorian}</p>
            </div>

            {day.feast && (
              <div className="bg-red-950/20 p-5 rounded-2xl border border-red-900/30 text-center shadow-inner">
                <p className="text-[10px] text-red-500/70 mb-2 uppercase tracking-widest font-black">절기 / 기념일</p>
                <p className="text-2xl font-black text-red-500">{day.feast}</p>
              </div>
            )}

            {day.weekday === "안식일" && !day.feast && (
              <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/20 text-center">
                <p className="text-2xl font-black text-amber-500 uppercase tracking-tighter">안식일 (Sabbath)</p>
              </div>
            )}
          </div>

          <div className="mt-10">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-gray-100 text-gray-900 rounded-2xl font-black text-lg hover:bg-white transition-all transform active:scale-95 shadow-xl"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
