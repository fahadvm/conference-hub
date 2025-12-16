import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SchedulePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '30',
    participants: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to database
    console.log('Meeting scheduled:', formData);
    
    // Navigate to meetings page
    navigate('/meetings');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-16 lg:py-20 border-b border-gridline">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <h1 className="font-heading text-5xl lg:text-7xl uppercase mb-6 tracking-wide">
            SCHEDULE MEETING
          </h1>
          <p className="font-paragraph text-lg lg:text-xl max-w-3xl opacity-90">
            Plan your next video conference. Set the date, time, and invite participants.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full bg-background py-16 lg:py-20">
        <div className="max-w-[60rem] mx-auto px-8 lg:px-16">
          <form onSubmit={handleSubmit} className="border border-gridline">
            <div className="bg-background p-10 lg:p-12 space-y-8">
              {/* Meeting Title */}
              <div className="space-y-3">
                <Label htmlFor="title" className="font-heading text-base uppercase tracking-wider flex items-center gap-2">
                  <Video className="w-5 h-5" strokeWidth={1.5} />
                  Meeting Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter meeting title"
                  className="w-full px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground"
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="font-heading text-base uppercase tracking-wider">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add meeting agenda or notes (optional)"
                  rows={4}
                  className="w-full px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground resize-none"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="date" className="font-heading text-base uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-5 h-5" strokeWidth={1.5} />
                    Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="time" className="font-heading text-base uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-5 h-5" strokeWidth={1.5} />
                    Time
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <Label htmlFor="duration" className="font-heading text-base uppercase tracking-wider">
                  Duration (minutes)
                </Label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground bg-background"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              {/* Participants */}
              <div className="space-y-3">
                <Label htmlFor="participants" className="font-heading text-base uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-5 h-5" strokeWidth={1.5} />
                  Participants
                </Label>
                <Input
                  id="participants"
                  name="participants"
                  type="text"
                  value={formData.participants}
                  onChange={handleChange}
                  placeholder="Enter email addresses (comma separated)"
                  className="w-full px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground"
                />
                <p className="font-paragraph text-sm text-subtletext">
                  Invitations will be sent to all participants via email
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gridline">
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-foreground px-8 py-6 text-base font-paragraph uppercase tracking-wider"
                >
                  Schedule Meeting
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/meetings')}
                  className="flex-1 border-2 border-gridline hover:border-foreground px-8 py-6 text-base font-paragraph uppercase tracking-wider"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
