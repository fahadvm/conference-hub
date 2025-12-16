import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  MonitorOff,
  MessageSquare,
  Users,
  Phone,
  Settings,
  MoreVertical,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Participant {
  id: string;
  name: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isHost: boolean;
}

export default function MeetingRoomPage() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [participants] = useState<Participant[]>([
    { id: '1', name: 'You', isVideoOn: true, isAudioOn: true, isHost: true },
    { id: '2', name: 'Sarah Chen', isVideoOn: true, isAudioOn: true, isHost: false },
    { id: '3', name: 'Michael Ross', isVideoOn: false, isAudioOn: true, isHost: false },
    { id: '4', name: 'Emma Wilson', isVideoOn: true, isAudioOn: false, isHost: false }
  ]);

  const [messages] = useState([
    { id: '1', sender: 'Sarah Chen', message: 'Thanks for joining everyone!', time: '10:30 AM' },
    { id: '2', sender: 'Michael Ross', message: 'Happy to be here', time: '10:31 AM' }
  ]);

  const handleCopyMeetingId = () => {
    navigator.clipboard.writeText(meetingId || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeaveMeeting = () => {
    navigate('/meetings');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  return (
    <div className="h-screen bg-primary flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground border-b border-gridline px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-heading text-lg uppercase tracking-wider">Meeting Room</h1>
          <div className="flex items-center gap-2 px-4 py-2 bg-background text-foreground">
            <span className="font-paragraph text-sm">ID: {meetingId}</span>
            <button onClick={handleCopyMeetingId} className="hover:opacity-70 transition-opacity">
              {copied ? (
                <Check className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Copy className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="font-paragraph text-sm opacity-70">
            {participants.length} participants
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-gridline"
          >
            <Settings className="w-5 h-5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-6">
          <div className="h-full grid grid-cols-2 gap-4">
            {participants.map((participant) => (
              <div 
                key={participant.id}
                className="relative bg-foreground border border-gridline flex items-center justify-center overflow-hidden"
              >
                {participant.isVideoOn ? (
                  <div className="w-full h-full bg-subtletext flex items-center justify-center">
                    <span className="font-heading text-6xl text-background uppercase">
                      {participant.name.charAt(0)}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                      <span className="font-heading text-4xl text-primary-foreground uppercase">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-paragraph text-background">Camera Off</span>
                  </div>
                )}
                
                {/* Participant Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-primary bg-opacity-80 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-paragraph text-sm text-primary-foreground">
                      {participant.name}
                    </span>
                    {participant.isHost && (
                      <span className="px-2 py-1 bg-background text-foreground text-xs font-paragraph uppercase">
                        Host
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!participant.isAudioOn && (
                      <MicOff className="w-4 h-4 text-destructive" strokeWidth={1.5} />
                    )}
                    {!participant.isVideoOn && (
                      <VideoOff className="w-4 h-4 text-destructive" strokeWidth={1.5} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-background border-l border-gridline flex flex-col">
            <div className="px-6 py-4 border-b border-gridline">
              <h2 className="font-heading text-lg uppercase tracking-wider">Chat</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-paragraph text-sm font-semibold">{msg.sender}</span>
                    <span className="font-paragraph text-xs text-subtletext">{msg.time}</span>
                  </div>
                  <p className="font-paragraph text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gridline">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 text-sm font-paragraph border-2 border-gridline focus:border-foreground"
                />
                <Button 
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-foreground px-6 text-sm font-paragraph uppercase"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Participants Sidebar */}
        {showParticipants && (
          <div className="w-80 bg-background border-l border-gridline flex flex-col">
            <div className="px-6 py-4 border-b border-gridline">
              <h2 className="font-heading text-lg uppercase tracking-wider">
                Participants ({participants.length})
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
              {participants.map((participant) => (
                <div 
                  key={participant.id}
                  className="flex items-center justify-between p-3 border border-gridline"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="font-heading text-sm text-primary-foreground uppercase">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-paragraph text-sm">{participant.name}</p>
                      {participant.isHost && (
                        <span className="font-paragraph text-xs text-subtletext">Host</span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-primary text-primary-foreground border-t border-gridline px-6 py-6">
        <div className="flex items-center justify-center gap-4">
          {/* Video Toggle */}
          <Button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-14 h-14 ${
              isVideoOn 
                ? 'bg-background text-foreground hover:bg-secondary' 
                : 'bg-destructive text-destructiveforeground hover:bg-destructive'
            }`}
          >
            {isVideoOn ? (
              <Video className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <VideoOff className="w-6 h-6" strokeWidth={1.5} />
            )}
          </Button>

          {/* Audio Toggle */}
          <Button
            onClick={() => setIsAudioOn(!isAudioOn)}
            className={`w-14 h-14 ${
              isAudioOn 
                ? 'bg-background text-foreground hover:bg-secondary' 
                : 'bg-destructive text-destructiveforeground hover:bg-destructive'
            }`}
          >
            {isAudioOn ? (
              <Mic className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <MicOff className="w-6 h-6" strokeWidth={1.5} />
            )}
          </Button>

          {/* Screen Share */}
          <Button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`w-14 h-14 ${
              isScreenSharing 
                ? 'bg-background text-foreground hover:bg-secondary' 
                : 'bg-background text-foreground hover:bg-secondary'
            }`}
          >
            {isScreenSharing ? (
              <MonitorOff className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Monitor className="w-6 h-6" strokeWidth={1.5} />
            )}
          </Button>

          {/* Chat Toggle */}
          <Button
            onClick={() => setShowChat(!showChat)}
            className={`w-14 h-14 ${
              showChat 
                ? 'bg-foreground text-background hover:bg-subtletext' 
                : 'bg-background text-foreground hover:bg-secondary'
            }`}
          >
            <MessageSquare className="w-6 h-6" strokeWidth={1.5} />
          </Button>

          {/* Participants Toggle */}
          <Button
            onClick={() => setShowParticipants(!showParticipants)}
            className={`w-14 h-14 ${
              showParticipants 
                ? 'bg-foreground text-background hover:bg-subtletext' 
                : 'bg-background text-foreground hover:bg-secondary'
            }`}
          >
            <Users className="w-6 h-6" strokeWidth={1.5} />
          </Button>

          {/* Leave Meeting */}
          <Button
            onClick={handleLeaveMeeting}
            className="w-14 h-14 bg-destructive text-destructiveforeground hover:bg-destructive ml-8"
          >
            <Phone className="w-6 h-6 rotate-[135deg]" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
