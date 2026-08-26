import { useState, type FormEvent } from 'react';
import { Modal } from '@/components/ui/Modal';
import { CATEGORIES } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { Sparkles, Search } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

export function SkillForm({ open, onClose, onSaved }: Props) {
  const [type, setType] = useState<'teach' | 'learn'>('teach');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const { error: insertError } = await supabase
      .from('skills')
      .insert({ title: title.trim(), description: description.trim(), category, type });

    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }

    setTitle('');
    setDescription('');
    setCategory(CATEGORIES[0]);
    setType('teach');
    setBusy(false);
    onSaved();
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Add a skill">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setType('teach')}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
              type === 'teach'
                ? 'border-sage-400 bg-sage-50'
                : 'border-canvas-200 hover:border-canvas-300'
            }`}
          >
            <Sparkles className={`h-5 w-5 ${type === 'teach' ? 'text-sage-600' : 'text-ink-400'}`} />
            <span className={`text-sm font-medium ${type === 'teach' ? 'text-sage-700' : 'text-ink-500'}`}>
              I can teach
            </span>
          </button>
          <button
            type="button"
            onClick={() => setType('learn')}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
              type === 'learn'
                ? 'border-plum-400 bg-plum-50'
                : 'border-canvas-200 hover:border-canvas-300'
            }`}
          >
            <Search className={`h-5 w-5 ${type === 'learn' ? 'text-plum-600' : 'text-ink-400'}`} />
            <span className={`text-sm font-medium ${type === 'learn' ? 'text-plum-700' : 'text-ink-500'}`}>
              I want to learn
            </span>
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-500 mb-1.5 tracking-wide uppercase">
            Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Watercolor landscapes"
            className="w-full rounded-xl border border-canvas-200 bg-canvas-50/50 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 transition-all focus:outline-none focus:border-ink-400 focus:bg-canvas-50"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-500 mb-1.5 tracking-wide uppercase">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-canvas-200 bg-canvas-50/50 px-4 py-3 text-sm text-ink-800 transition-all focus:outline-none focus:border-ink-400 focus:bg-canvas-50"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-500 mb-1.5 tracking-wide uppercase">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe your skill, experience level, what you'd cover…"
            className="w-full rounded-xl border border-canvas-200 bg-canvas-50/50 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 transition-all focus:outline-none focus:border-ink-400 focus:bg-canvas-50 resize-none"
          />
        </div>

        {error && (
          <p className="text-sm text-terracotta-600">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-canvas-300 px-6 py-3 text-sm font-medium text-ink-600 hover:bg-canvas-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="flex-1 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-canvas-50 hover:bg-saffron-400 hover:text-ink-900 transition-all disabled:opacity-50"
          >
            {busy ? 'Saving…' : 'Add skill'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
