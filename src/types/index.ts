export type Profile = {
  id: string;
  full_name: string;
  bio: string;
  location: string;
  avatar_color: string;
  created_at: string;
};

export type Skill = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  type: 'teach' | 'learn';
  created_at: string;
};

export type Exchange = {
  id: string;
  requester_id: string;
  recipient_id: string;
  skill_id: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: string;
  exchange_id: string;
  reviewer_id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type SkillWithProfile = Skill & {
  profiles: Pick<Profile, 'id' | 'full_name' | 'avatar_color' | 'location'> | null;
};

export type ExchangeWithDetails = Exchange & {
  skills: Pick<Skill, 'title' | 'category'> | null;
  requester: Pick<Profile, 'id' | 'full_name' | 'avatar_color'> | null;
  recipient: Pick<Profile, 'id' | 'full_name' | 'avatar_color'> | null;
};
