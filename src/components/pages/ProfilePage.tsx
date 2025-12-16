import { useState } from 'react';
import { User, Mail, Calendar, Video, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinDate: 'January 2025',
    totalMeetings: 47,
    totalHours: 32
  });

  const [editData, setEditData] = useState({
    name: profileData.name,
    email: profileData.email
  });

  const handleSave = () => {
    setProfileData({
      ...profileData,
      name: editData.name,
      email: editData.email
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: profileData.name,
      email: profileData.email
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-16 lg:py-20 border-b border-gridline">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <h1 className="font-heading text-5xl lg:text-7xl uppercase mb-6 tracking-wide">
            YOUR PROFILE
          </h1>
          <p className="font-paragraph text-lg lg:text-xl max-w-3xl opacity-90">
            Manage your account settings and view your meeting statistics.
          </p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="w-full bg-background py-16 lg:py-20">
        <div className="max-w-[60rem] mx-auto px-8 lg:px-16">
          <div className="border border-gridline">
            {/* Profile Header */}
            <div className="bg-background p-10 lg:p-12 border-b border-gridline">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-primary flex items-center justify-center">
                    <span className="font-heading text-5xl text-primary-foreground uppercase">
                      {profileData.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-heading text-3xl uppercase tracking-wide mb-2">
                      {profileData.name}
                    </h2>
                    <p className="font-paragraph text-base text-subtletext">
                      {profileData.email}
                    </p>
                  </div>
                </div>
                
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary text-primary-foreground hover:bg-foreground px-8 py-5 text-sm font-paragraph uppercase tracking-wider"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <div className="bg-background p-10 lg:p-12 border-b border-gridline space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="font-heading text-base uppercase tracking-wider flex items-center gap-2">
                    <User className="w-5 h-5" strokeWidth={1.5} />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="font-heading text-base uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-6 py-6 text-base font-paragraph border-2 border-gridline focus:border-foreground"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-foreground px-8 py-6 text-base font-paragraph uppercase tracking-wider"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 border-2 border-gridline hover:border-foreground px-8 py-6 text-base font-paragraph uppercase tracking-wider"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="bg-background p-10 lg:p-12">
              <h3 className="font-heading text-2xl uppercase tracking-wide mb-8">
                Meeting Statistics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gridline border border-gridline">
                <div className="bg-background p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                    <span className="font-paragraph text-sm text-subtletext uppercase tracking-wider">
                      Member Since
                    </span>
                  </div>
                  <p className="font-heading text-3xl">
                    {profileData.joinDate}
                  </p>
                </div>

                <div className="bg-background p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Video className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                    <span className="font-paragraph text-sm text-subtletext uppercase tracking-wider">
                      Total Meetings
                    </span>
                  </div>
                  <p className="font-heading text-3xl">
                    {profileData.totalMeetings}
                  </p>
                </div>

                <div className="bg-background p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                    <span className="font-paragraph text-sm text-subtletext uppercase tracking-wider">
                      Total Hours
                    </span>
                  </div>
                  <p className="font-heading text-3xl">
                    {profileData.totalHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
