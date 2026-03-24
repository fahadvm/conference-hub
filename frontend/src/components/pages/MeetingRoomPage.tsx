import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import '@livekit/components-styles';
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from '@livekit/components-react';
import { Copy, Check } from 'lucide-react';

export default function MeetingRoomPage() {
  const { meetingId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const roomName = meetingId || 'default-room';
  const participantName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest';

  useEffect(() => {
    let mounted = true;
    
    const fetchToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-livekit-token', {
          body: { roomName, participantName },
        });

        if (error) throw error;
        
        if (mounted) {
          setToken(data.token);
        }
      } catch (err: any) {
        console.error('Error fetching LiveKit token:', err);
        if (mounted) {
          setError(err.message || 'Failed to get meeting token. Please check Edge Function / Keys.');
        }
      }
    };

    fetchToken();

    return () => {
      mounted = false;
    };
  }, [roomName, participantName]);

  const onDisconnected = () => {
    navigate('/meetings');
  };

  const copyMeetingCode = async () => {
    if (!meetingId) return;
    try {
      const url = `${window.location.origin}/meeting/${meetingId}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Ensure this points to your LiveKit Cloud WebSocket URL
  const serverUrl = import.meta.env.VITE_LIVEKIT_URL || 'wss://your-livekit-url.livekit.cloud';

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Bar matching app theme */}
      <div className="bg-primary text-primary-foreground border-b border-gridline px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <h1 className="font-heading text-lg uppercase tracking-wider">Live Conference</h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-background text-foreground border border-gridline">
          <div className="flex flex-col">
            <span className="font-paragraph text-[10px] font-bold uppercase tracking-widest text-subtletext leading-none">Meeting Link</span>
            <span className="font-paragraph text-sm font-medium">{meetingId}</span>
          </div>
          <button 
            onClick={copyMeetingCode}
            className={`p-2 rounded-none transition-all duration-200 border ${
              copied 
                ? 'bg-green-500/10 border-green-500 text-green-500' 
                : 'bg-primary/5 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground'
            }`}
            title="Copy Meeting Link"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <div className="flex-1 relative w-full h-full bg-black">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center bg-background">
            <div className="bg-destructive/10 text-destructive p-8 border border-destructive max-w-lg">
              <h2 className="font-heading text-2xl uppercase tracking-wider mb-4">Connection Error</h2>
              <p className="font-paragraph mb-8 opacity-80">{error}</p>
              <button 
                onClick={() => navigate('/meetings')}
                className="px-8 py-4 bg-primary text-primary-foreground hover:bg-foreground uppercase font-heading text-sm transition-colors"
              >
                Return to Meetings
              </button>
            </div>
          </div>
        ) : token ? (
          <div className="w-full h-full livekit-custom-wrapper" data-lk-theme="default">
            <LiveKitRoom
              video={true}
              audio={true}
              token={token}
              serverUrl={serverUrl}
              onDisconnected={onDisconnected}
              className="h-full w-full outline-none"
              style={{ height: 'calc(100vh - 61px)' }} // 61px is topbar height
            >
              <VideoConference />
              <RoomAudioRenderer />
            </LiveKitRoom>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-6"></div>
            <p className="font-heading text-xl tracking-wide uppercase text-foreground">
              Establishing Secure Connection
            </p>
            <p className="font-paragraph text-subtletext mt-2">
              Joining room {roomName}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
