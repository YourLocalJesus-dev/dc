import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Avatar } from '@/components/ui/Avatar';
import { Spinner } from '@/components/ui/Spinner';
import { Reveal } from '@/components/ui/Reveal';
import { SkillCard } from '@/components/SkillCard';
import { SkillForm } from '@/components/app/SkillForm';
import { Button } from '@/components/ui/Button';
import { COLOR_KEYS, avatarColor, CATEGORIES } from '@/lib/constants';
import { Pencil, Plus, MapPin, Trash2, Star, Sparkles, Search } from 'lucide-react';
import type { SkillWithProfile, Review } from '@/types';

export function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const [skills, setSkills] = useState<SkillWithProfile[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [colorKey, setColorKey] = useState('emerald');
  const [saving, setSaving] = useState(false);

  async function load() {
    if (!user) return;
    const [skillsRes, reviewsRes] = await Promise.all([
      supabase
        .from('skills')
        .select('*, profiles!skills_user_id_fkey(id, full_name, avatar_color, location)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('reviews')
        .select('*')
        .in(
          'exchange_id',
          (await supabase
            .from('exchanges')
            .select('id')
            .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)).data?.map((e) => e.id) ?? []
        ),
    ]);
    setSkills((skillsRes.data as SkillWithProfile[]) ?? []);
    setReviews((reviewsRes.data as Review[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
      setBio(profile.bio);
      setLocation(profile.location);
      setColorKey(profile.avatar_color);
    }
    load();
  }, [user, profile]);

  async function saveProfile() {
    setSaving(true);
    await supabase
      .from('profiles')
      .update({
        full_name: fullName.trim(),
        bio: bio.trim(),
        location: location.trim(),
        avatar_color: colorKey,
      })
      .eq('id', user!.id);
    await refreshProfile();
    setSaving(false);
    setEditing(false);
  }

  async function deleteSkill(id: string) {
    await supabase.from('skills').delete().eq('id', id);
    load();
  }

  if (loading || !profile) return <Spinner>Loading profile…</Spinner>;

  const teaching = skills.filter((s) => s.type === 'teach');
  const learning = skills.filter((s) => s.type === 'learn');
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Reveal className="mb-10">
        <div className="relative overflow-hidden rounded-3xl border border-canvas-200 bg-canvas-50 p-8 grain">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-saffron-200/30 to-terracotta-200/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-start gap-6">
            <Avatar
              name={profile.full_name}
              colorKey={profile.avatar_color}
              size="xl"
              className="ring-4 ring-canvas-50"
            />
            <div className="flex-1">
              <h1 className="font-display text-3xl md:text-4xl font-light text-ink-900 mb-1">
                {profile.full_name}
              </h1>
              {profile.location && (
                <p className="flex items-center gap-1.5 text-sm text-ink-500 mb-3">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </p>
              )}
              {profile.bio && (
                <p className="text-sm text-ink-600 leading-relaxed max-w-xl mb-4">
                  {profile.bio}
                </p>
              )}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-sage-500" />
                  <span className="text-sm text-ink-600">
                    <span className="font-medium text-ink-800">{teaching.length}</span> teaching
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Search className="h-4 w-4 text-plum-500" />
                  <span className="text-sm text-ink-600">
                    <span className="font-medium text-ink-800">{learning.length}</span> seeking
                  </span>
                </div>
                {avgRating && (
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-saffron-400 text-saffron-400" />
                    <span className="text-sm font-medium text-ink-800">{avgRating}</span>
                    <span className="text-sm text-ink-400">({reviews.length})</span>
                  </div>
                )}
              </div>
            </div>
            <Button onClick={() => setEditing(true)} variant="outline" size="sm">
              <Pencil className="h-3.5 w-3.5" />
              Edit profile
            </Button>
          </div>
        </div>
      </Reveal>

      <Reveal className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-medium text-ink-900">
            Skills I teach
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-ink-500 hover:text-ink-900 ink-underline"
          >
            Add skill
          </button>
        </div>
      </Reveal>

      {teaching.length === 0 ? (
        <Reveal>
          <EmptySkill label="No teaching skills yet." onAdd={() => setShowForm(true)} />
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {teaching.map((skill, i) => (
            <Reveal key={skill.id} delay={i * 60}>
              <div className="relative group">
                <SkillCard skill={skill} showAction={false} />
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-canvas-50/80 backdrop-blur flex items-center justify-center text-ink-400 hover:text-terracotta-600 hover:bg-terracotta-50 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Delete skill"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mb-4">
        <h2 className="font-display text-2xl font-medium text-ink-900">
          Skills I want to learn
        </h2>
      </Reveal>

      {learning.length === 0 ? (
        <Reveal>
          <EmptySkill label="No learning goals yet." onAdd={() => setShowForm(true)} />
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learning.map((skill, i) => (
            <Reveal key={skill.id} delay={i * 60}>
              <div className="relative group">
                <SkillCard skill={skill} showAction={false} />
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-canvas-50/80 backdrop-blur flex items-center justify-center text-ink-400 hover:text-terracotta-600 hover:bg-terracotta-50 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Delete skill"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <SkillForm open={showForm} onClose={() => setShowForm(false)} onSaved={load} />

      {editing && (
        <EditModal
          fullName={fullName}
          bio={bio}
          location={location}
          colorKey={colorKey}
          onFullName={setFullName}
          onBio={setBio}
          onLocation={setLocation}
          onColor={setColorKey}
          onSave={saveProfile}
          onClose={() => setEditing(false)}
          busy={saving}
        />
      )}
    </div>
  );
}

function EmptySkill({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-canvas-300 bg-canvas-50/50 p-8 text-center">
      <p className="text-sm text-ink-400 mb-3">{label}</p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 ink-underline"
      >
        <Plus className="h-4 w-4" />
        Add one now
      </button>
    </div>
  );
}

type EditModalProps = {
  fullName: string;
  bio: string;
  location: string;
  colorKey: string;
  onFullName: (v: string) => void;
  onBio: (v: string) => void;
  onLocation: (v: string) => void;
  onColor: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
  busy: boolean;
};

function EditModal(props: EditModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in"
        onClick={props.onClose}
      />
      <div className="relative w-full max-w-lg animate-scale-in">
        <div className="glass rounded-3xl border border-canvas-200 shadow-2xl p-8">
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">
            Edit profile
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wide">
                Name
              </label>
              <input
                type="text"
                value={props.fullName}
                onChange={(e) => props.onFullName(e.target.value)}
                className="w-full rounded-xl border border-canvas-200 bg-canvas-50/50 px-4 py-3 text-sm text-ink-800 focus:outline-none focus:border-ink-400 focus:bg-canvas-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wide">
                Location
              </label>
              <input
                type="text"
                value={props.location}
                onChange={(e) => props.onLocation(e.target.value)}
                placeholder="City, Country"
                className="w-full rounded-xl border border-canvas-200 bg-canvas-50/50 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-ink-400 focus:bg-canvas-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wide">
                Bio
              </label>
              <textarea
                value={props.bio}
                onChange={(e) => props.onBio(e.target.value)}
                rows={3}
                placeholder="Tell the community about yourself…"
                className="w-full rounded-xl border border-canvas-200 bg-canvas-50/50 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-ink-400 focus:bg-canvas-50 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wide">
                Avatar color
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_KEYS.map((key) => {
                  const c = avatarColor(key);
                  return (
                    <button
                      key={key}
                      onClick={() => props.onColor(key)}
                      className={`h-10 w-10 rounded-full ${c.bg} transition-all ${
                        props.colorKey === key
                          ? 'ring-4 ring-offset-2 ring-offset-canvas-50 ' + c.ring
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      aria-label={key}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={props.onClose}
              className="flex-1 rounded-full border border-canvas-300 px-6 py-3 text-sm font-medium text-ink-600 hover:bg-canvas-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={props.onSave}
              disabled={props.busy}
              className="flex-1 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-canvas-50 hover:bg-saffron-400 hover:text-ink-900 transition-all disabled:opacity-50"
            >
              {props.busy ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
