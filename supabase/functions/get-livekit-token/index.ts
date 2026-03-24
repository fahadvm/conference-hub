import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { AccessToken } from "npm:livekit-server-sdk@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { roomName, participantName } = await req.json()

    // Get LiveKit secrets from Supabase Environment Variables
    const apiKey = Deno.env.get('LIVEKIT_API_KEY')
    const apiSecret = Deno.env.get('LIVEKIT_API_SECRET')

    if (!apiKey || !apiSecret) {
      throw new Error('LiveKit API key or secret not set')
    }

    // Create Access Token
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
    })

    // Add permissions to join the room
    at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true })

    const tokenString = await at.toJwt();

    return new Response(
      JSON.stringify({ token: tokenString }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
