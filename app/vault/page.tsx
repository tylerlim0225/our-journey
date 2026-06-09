import VaultGate from '@/components/VaultGate';
import { vaultEntries } from '@/lib/data';

export default function VaultPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <p className="text-xs tracking-widest2 text-gold-600 uppercase mb-2">
          VAULT · 우리만의 금고
        </p>
        <h1 className="text-4xl font-bold text-navy-900">비밀 금고</h1>
        <p className="mt-2 text-sm text-navy-900/60">
          우리 둘만 아는 작은 약속들.
        </p>
      </header>

      <VaultGate entries={vaultEntries} />
    </div>
  );
}
