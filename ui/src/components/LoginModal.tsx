import React, { useState } from "react";
import { Terminal, ArrowRight, Server, Layers, AlertCircle, RefreshCw } from "lucide-react";

interface LoginModalProps {
  onConnect: (wsPort: number) => void;
  defaultPort?: number;
  connecting?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  onConnect,
  defaultPort = 3001,
  connecting = false
}) => {
  const [port, setPort] = useState(defaultPort.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(port, 10);
    if (!isNaN(p) && p > 0) {
      onConnect(p);
    }
  };

  const selectNode = (p: number) => {
    setPort(p.toString());
    onConnect(p);
  };

  const currentPortNum = parseInt(port, 10);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 select-none">
      <div className="bg-white border border-[#E2E8F0] rounded-[8px] max-w-md w-full p-6 space-y-5 shadow-sm">
        {/* Logo / Title */}
        <div className="space-y-1.5 pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-[4px] bg-[#0F172A] text-white flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0F172A] font-mono tracking-tight uppercase">
                P2P Network Workbench
              </h2>
              <p className="text-xs text-[#64748B] font-sans">
                Công cụ Kiểm thử Giao thức Mạng P2P & Giám sát Gói tin TCP
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0F172A] mb-1.5">
              WebSocket Peer Backend Port (Localhost)
            </label>
            <div className="relative">
              <input
                type="number"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="3001"
                required
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-[6px] px-3 py-2 text-sm text-[#0F172A] font-mono focus:outline-none focus:border-[#0F172A] focus:bg-white transition-colors"
              />
              <span className="absolute right-3 top-2.5 text-xs font-mono text-[#94A3B8]">
                ws://127.0.0.1
              </span>
            </div>

            {/* Quick Node Select Buttons */}
            <div className="mt-2 text-[11px] font-mono text-[#64748B] flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => selectNode(3001)}
                className={`px-2 py-0.5 rounded-[4px] border text-xs transition-colors cursor-pointer ${
                  port === "3001"
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-[#F1F5F9] border-[#E2E8F0] hover:bg-[#E2E8F0] text-[#334155]"
                }`}
              >
                Node Alice: 3001
              </button>
              <button
                type="button"
                onClick={() => selectNode(3002)}
                className={`px-2 py-0.5 rounded-[4px] border text-xs transition-colors cursor-pointer ${
                  port === "3002"
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-[#F1F5F9] border-[#E2E8F0] hover:bg-[#E2E8F0] text-[#334155]"
                }`}
              >
                Node Bob: 3002
              </button>
              <button
                type="button"
                onClick={() => selectNode(3003)}
                className={`px-2 py-0.5 rounded-[4px] border text-xs transition-colors cursor-pointer ${
                  port === "3003"
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-[#F1F5F9] border-[#E2E8F0] hover:bg-[#E2E8F0] text-[#334155]"
                }`}
              >
                Node Charlie: 3003
              </button>
            </div>
          </div>

          {/* Connection status notification */}
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[6px] p-3 text-xs text-[#92400E] space-y-2">
            <div className="flex items-center gap-1.5 font-semibold">
              <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>Chưa kết nối được tới Backend tại cổng {port}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#B45309]">
              UI đang liên tục tự động thử kết nối lại... Hãy đảm bảo Peer Backend đang chạy trong Terminal hoặc Docker:
            </p>
            <div className="bg-[#FEF3C7] rounded p-2 font-mono text-[10px] text-[#78350F] select-all break-all border border-[#FCD34D] space-y-1">
              <div className="font-bold text-[#92400E]">
                {currentPortNum === 3001 && "npm run peer:alice"}
                {currentPortNum === 3002 && "npm run peer:bob"}
                {currentPortNum === 3003 && "npm run peer:charlie"}
              </div>
              <div className="text-[9px] text-[#A16207]">
                {currentPortNum === 3001 && "(hoặc: npx tsx peer/index.ts --name Alice --tcpPort 8001 --uiPort 3001 --mode dht)"}
                {currentPortNum === 3002 && "(hoặc: npx tsx peer/index.ts --name Bob --tcpPort 8002 --uiPort 3002 --mode dht --bootstrap 127.0.0.1:8001)"}
                {currentPortNum === 3003 && "(hoặc: npx tsx peer/index.ts --name Charlie --tcpPort 8003 --uiPort 3003 --mode dht --bootstrap 127.0.0.1:8002)"}
                {currentPortNum !== 3001 && currentPortNum !== 3002 && currentPortNum !== 3003 && `npx tsx peer/index.ts --uiPort ${port}`}
              </div>
            </div>
            <div className="text-[10px] text-[#92400E] pt-0.5">
              💡 Hoặc chạy tất cả các node tự động bằng Docker: <code className="bg-[#FEF3C7] px-1 rounded font-bold">docker compose up -d</code>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono font-medium py-2.5 px-4 rounded-[4px] text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            {connecting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>ĐANG KẾT NỐI TỚI CỔNG {port}...</span>
              </>
            ) : (
              <>
                <span>KẾT NỐI / THỬ LẠI CỔNG {port}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="border-t border-[#E2E8F0] pt-3 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
          <span className="flex items-center gap-1">
            <Server className="w-3 h-3 text-[#94A3B8]" />
            TCP Socket Direct
          </span>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#94A3B8]" />
            Packet Inspector
          </span>
        </div>
      </div>
    </div>
  );
};
