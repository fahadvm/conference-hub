import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, Plus, Clock, Users, Calendar as CalendarIcon, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface Meeting {
  id: string;
  title: string;
  scheduledTime: Date;
  duration: number;
  participants: number;
  status: 'upcoming' | 'live' | 'ended';
  hostId: string; // Added hostId field
}

export default function MeetingsPage() {
  const { user } = useAuth();
  const [meetingCode, setMeetingCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchMeetings();
    }
  }, [user]);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .order('scheduled_time', { ascending: true });

      if (error) throw error;

      const formattedMeetings: Meeting[] = (data || []).map(m => {
        const scheduledTime = new Date(m.scheduled_time);
        const endTime = new Date(scheduledTime.getTime() + (m.duration || 30) * 60000);
        const isExpired = new Date() > endTime;
        
        return {
          id: m.id,
          title: m.title,
          scheduledTime,
          duration: m.duration,
          participants: 0,
          status: isExpired ? 'ended' : m.status as 'upcoming' | 'live' | 'ended',
          hostId: m.host_id
        };
      });

      setMeetings(formattedMeetings);
    } catch (err: any) {
      console.error('Error fetching meetings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinMeeting = () => {
    let code = meetingCode.trim();
    if (!code) return;

    if (code.includes('/meeting/')) {
      const parts = code.split('/meeting/');
      code = parts[parts.length - 1];
    }

    if (code) {
      window.location.href = `/meeting/${code}`;
    }
  };

  const handleStartInstantMeeting = async () => {
    if (!user) return;
    
    const newMeetingId = `mtg-${Date.now()}`;
    try {
      const { error } = await supabase
        .from('meetings')
        .insert([{
          id: newMeetingId,
          title: 'Instant Meeting',
          scheduled_time: new Date().toISOString(),
          duration: 60,
          host_id: user.id,
          status: 'live'
        }]);

      if (error) throw error;
      window.location.href = `/meeting/${newMeetingId}`;
    } catch (err) {
      console.error('Error creating instant meeting:', err);
      // Fallback navigate anyway if DB fails
      window.location.href = `/meeting/${newMeetingId}`;
    }
  };

  const deleteMeeting = async (id: string) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return;
    
    try {
      const { error } = await supabase
        .from('meetings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchMeetings();
    } catch (err: any) {
      alert(err.message || 'Failed to delete meeting');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-16 lg:py-20 border-b border-gridline">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <h1 className="font-heading text-5xl lg:text-7xl uppercase mb-6 tracking-wide">
            YOUR MEETINGS
          </h1>
          <p className="font-paragraph text-lg lg:text-xl max-w-3xl opacity-90">
            Start an instant meeting or join with a code. Manage your scheduled sessions below.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="w-full bg-background py-16 lg:py-20">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gridline border border-gridline">
            {/* Start New Meeting */}
            <div className="bg-background p-12 lg:p-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary flex items-center justify-center">
                  <Plus className="w-7 h-7 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <h2 className="font-heading text-3xl uppercase tracking-wide">
                  NEW MEETING
                </h2>
              </div>
              <p className="font-paragraph text-base text-subtletext mb-8 leading-relaxed">
                Start an instant meeting with a unique code. Share the code with participants to join.
              </p>
              <Button
                onClick={handleStartInstantMeeting}
                className="bg-primary text-primary-foreground hover:bg-foreground px-8 py-6 text-base font-paragraph uppercase tracking-wider w-full sm:w-auto"
              >
                Start Instant Meeting
              </Button>
            </div>

            {/* Join Meeting */}
            <div className="bg-background p-12 lg:p-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary flex items-center justify-center">
                  <Video className="w-7 h-7 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <h2 className="font-heading text-3xl uppercase tracking-wide">
                  JOIN MEETING
                </h2>
              </div>
              <p className="font-paragraph text-base text-subtletext mb-8 leading-relaxed">
                Enter meeting code or link
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Enter meeting code or link"
                  value={meetingCode}
                  onChange={(e) => setMeetingCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinMeeting()}
                  className="flex-1 px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground"
                />
                <Button
                  onClick={handleJoinMeeting}
                  disabled={!meetingCode.trim()}
                  className="bg-primary text-primary-foreground hover:bg-foreground px-8 py-6 text-base font-paragraph uppercase tracking-wider disabled:opacity-50"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scheduled Meetings */}
      <section className="w-full bg-background py-16 lg:py-20 border-t border-gridline">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <h2 className="font-heading text-4xl lg:text-5xl uppercase tracking-wide">
              SCHEDULED MEETINGS
            </h2>
            <Link to="/schedule">
              <Button className="bg-primary text-primary-foreground hover:bg-foreground px-8 py-6 text-base font-paragraph uppercase tracking-wider">
                Schedule New
              </Button>
            </Link>
          </div>

          <div className="space-y-px bg-gridline border border-gridline min-h-[200px] flex flex-col items-center justify-center bg-background">
            {loading ? (
              <div className="flex flex-col items-center gap-4 py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="font-paragraph text-subtletext uppercase tracking-widest text-xs">Loading meetings...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-destructive font-paragraph">
                {error}
              </div>
            ) : meetings.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center gap-6">
                <p className="font-paragraph text-subtletext text-lg">No meetings scheduled yet.</p>
                <Link to="/schedule">
                  <Button className="bg-primary text-primary-foreground hover:bg-foreground px-8 py-5 text-sm font-paragraph uppercase tracking-wider">
                    Schedule Your First Meeting
                  </Button>
                </Link>
              </div>
            ) : (
              meetings.map((meeting) => (
                <div key={meeting.id} className="bg-background p-8 lg:p-10 w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="font-heading text-2xl uppercase tracking-wide">
                          {meeting.title}
                        </h3>
                        <span className={`px-3 py-1 text-[10px] font-paragraph font-bold uppercase tracking-widest ${meeting.status === 'live'
                            ? 'bg-destructive text-destructive-foreground'
                            : meeting.status === 'upcoming'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground border border-gridline'
                          }`}>
                          {meeting.status === 'ended' ? 'Expired' : meeting.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-6 text-subtletext">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" strokeWidth={1.5} />
                          <span className="font-paragraph text-sm">
                            {format(meeting.scheduledTime, 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" strokeWidth={1.5} />
                          <span className="font-paragraph text-sm">
                            {format(meeting.scheduledTime, 'h:mm a')} · {meeting.duration} min
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-primary/60">
                          <span className="font-paragraph text-xs font-bold uppercase tracking-widest bg-primary/10 px-2 py-0.5 border border-primary/20">
                            ID: {meeting.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {meeting.status !== 'ended' ? (
                        <Link to={`/meeting/${meeting.id}`}>
                          <Button className="bg-primary text-primary-foreground hover:bg-foreground px-6 py-5 text-sm font-paragraph uppercase tracking-wider">
                            Join Meeting
                          </Button>
                        </Link>
                      ) : (
                        <Button disabled className="bg-muted text-subtletext px-6 py-5 text-sm font-paragraph uppercase tracking-wider cursor-not-allowed">
                          Meeting Expired
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="border-2 border-gridline hover:border-foreground px-6 py-5 text-sm font-paragraph uppercase tracking-wider"
                        onClick={() => {
                          const url = `${window.location.origin}/meeting/${meeting.id}`;
                          navigator.clipboard.writeText(url);
                          alert('Meeting link copied to clipboard!');
                        }}
                      >
                        Copy Link
                      </Button>
                      {(user && (user.id === meeting.hostId || meeting.status === 'ended')) && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 px-4 py-5"
                          onClick={() => deleteMeeting(meeting.id)}
                          title={meeting.status === 'ended' ? "Remove Expired Meeting" : "Delete Meeting"}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
