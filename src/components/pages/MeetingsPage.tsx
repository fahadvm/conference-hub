import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Plus, Clock, Users, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

interface Meeting {
  id: string;
  title: string;
  scheduledTime: Date;
  duration: number;
  participants: number;
  status: 'upcoming' | 'live' | 'ended';
}

export default function MeetingsPage() {
  const [meetingCode, setMeetingCode] = useState('');
  
  const [meetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Team Standup',
      scheduledTime: new Date(Date.now() + 3600000),
      duration: 30,
      participants: 8,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Client Presentation',
      scheduledTime: new Date(Date.now() + 7200000),
      duration: 60,
      participants: 5,
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Design Review',
      scheduledTime: new Date(Date.now() - 3600000),
      duration: 45,
      participants: 12,
      status: 'ended'
    }
  ]);

  const handleJoinMeeting = () => {
    if (meetingCode.trim()) {
      window.location.href = `/meeting/${meetingCode}`;
    }
  };

  const handleStartInstantMeeting = () => {
    const newMeetingId = `mtg-${Date.now()}`;
    window.location.href = `/meeting/${newMeetingId}`;
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
                Enter a meeting code to join an existing session.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Enter meeting code"
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

          <div className="space-y-px bg-gridline border border-gridline">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="bg-background p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="font-heading text-2xl uppercase tracking-wide">
                        {meeting.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-paragraph uppercase tracking-wider ${
                        meeting.status === 'live' 
                          ? 'bg-destructive text-destructiveforeground' 
                          : meeting.status === 'upcoming'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground border border-gridline'
                      }`}>
                        {meeting.status}
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
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" strokeWidth={1.5} />
                        <span className="font-paragraph text-sm">
                          {meeting.participants} participants
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {meeting.status === 'upcoming' && (
                      <Link to={`/meeting/${meeting.id}`}>
                        <Button className="bg-primary text-primary-foreground hover:bg-foreground px-6 py-5 text-sm font-paragraph uppercase tracking-wider">
                          Join Meeting
                        </Button>
                      </Link>
                    )}
                    <Button 
                      variant="outline" 
                      className="border-2 border-gridline hover:border-foreground px-6 py-5 text-sm font-paragraph uppercase tracking-wider"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
