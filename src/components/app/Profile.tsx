import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Avatar } from '@/components/ui/Avatar';
import { Spinner } from '@/components/ui/Spinner';
import { Reveal } from '@/components/ui/Reveal';
import { SkillCard } from '@/components/SkillCard';
import { SkillForm } from '@/components/app/SkillForm';
import { COLOR_KEYS, avatarColor } from '@/lib/constants';
import { Pencil, Plus, MapPin, Trash2, Star, Sparkles, Search, Camera } from 'lucide-react';
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
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    if (!user) return;
    const [skillsRes, reviewsRes] = await Promise.all([
      supabase
        .from('skills')
        .select('*, profiles!skills_user_id_fkey(id, full_name, avatar_color, avatar_url, location)')
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

  async function uploadAvatar(file: File) {
    if (!user) return;
    setAvatarError(null);
    if (!file.type.startsWith('image/')) {
      setAvatarError('Please choose an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setAvatarError('Your photo must be smaller than 5MB.');
      return;
    }
    setUploadingAvatar(true);
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `${user.id}/avatar.${extension}`;
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true, contentType: file.type });
    if (error) {
      setAvatarError(error.message);
    } else {
      const { data } = supabase.storage.from('avatars').getPublicUrl(path);
      const avatarUrl = `${data.publicUrl}?v=${Date.now()}`;
      const { error: profileError } = await supabase.from('profiles').update({ avatar_url: avatarUrl }).eq('id', user.id);
      if (profileError) setAvatarError(profileError.message);
      else await refreshProfile();
    }
    setUploadingAvatar(false);
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
    <div className="studio-page max-w-5xl">
      <Reveal className="mb-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-ink-900 bg-ink-900 p-7 text-canvas-50 shadow-[0_22px_60px_rgba(34,28,19,0.16)] sm:p-9">
          <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full border border-saffron-300/40" />
          <div className="absolute -bottom-28 right-20 h-64 w-64 rounded-full border border-canvas-50/15" />
          <div className="relative flex flex-col gap-7 md:flex-row md:items-start">
            <button type="button" onClick={() => avatarInputRef.current?.click()} className="group relative shrink-0 rounded-full" aria-label="Change profile photo">
              <Avatar name={profile.full_name} colorKey={profile.avatar_color} src={profile.avatar_url} size="xl" className="ring-4 ring-ink-800" />
              <span className="absolute inset-0 grid place-items-center rounded-full bg-ink-900/55 text-canvas-50 opacity-0 transition-opacity group-hover:opacity-100">{uploadingAvatar ? '…' : <Camera className="h-5 w-5" />}</span>
            </button>
            <input ref={avatarInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => e.target.files?.[0] && uploadAvatar(e.target.files[0])} />
            <div className="flex-1">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-saffron-300">Maker file / 04</p>
              <h1 className="mb-1 font-display text-3xl font-light text-canvas-50 md:text-5xl">
                {profile.full_name}
              </h1>
              {profile.location && (
                <p className="mb-4 flex items-center gap-1.5 text-sm text-canvas-300">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </p>
              )}
              {profile.bio && (
                <p className="mb-6 max-w-xl text-sm leading-relaxed text-canvas-300">
                  {profile.bio}
                </p>
              )}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full border border-canvas-50/15 px-3 py-2">
                  <Sparkles className="h-4 w-4 text-sage-500" />
                  <span className="text-sm text-canvas-300">
                    <span className="font-medium text-canvas-50">{teaching.length}</span> teaching
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-canvas-50/15 px-3 py-2">
                  <Search className="h-4 w-4 text-plum-500" />
                  <span className="text-sm text-canvas-300">
                    <span className="font-medium text-canvas-50">{learning.length}</span> seeking
                  </span>
                </div>
                {avgRating && (
                  <div className="flex items-center gap-1.5 rounded-full border border-canvas-50/15 px-3 py-2">
                    <Star className="h-4 w-4 fill-saffron-400 text-saffron-400" />
                    <span className="text-sm font-medium text-canvas-50">{avgRating}</span>
                    <span className="text-sm text-canvas-300">({reviews.length})</span>
                  </div>
                )}
              </div>
            </div>
            {avatarError && <p className="mt-3 max-w-xl text-xs text-terracotta-300">Photo upload: {avatarError}</p>}
            <button onClick={() => setEditing(true)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-canvas-50/30 px-4 py-2 text-sm font-medium text-canvas-50 transition-colors hover:border-saffron-300 hover:bg-canvas-50 hover:text-ink-900">
              <Pencil className="h-3.5 w-3.5" />
              Edit profile
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal className="mb-5">
        <div className="studio-section-head">
          <div><p className="studio-section-label">Your offering</p><h2 className="font-display text-2xl font-medium text-ink-900">Skills I teach</h2></div>
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

      <Reveal className="mb-5">
        <div className="studio-section-head"><div><p className="studio-section-label">Your curiosity</p><h2 className="font-display text-2xl font-medium text-ink-900">Skills I want to learn</h2></div></div>
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
