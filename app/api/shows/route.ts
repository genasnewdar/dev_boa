import { NextResponse } from 'next/server';
import { auth0 } from '../../../lib/auth0';

export const GET = async function shows(): Promise<Response> {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { token: accessToken } = await auth0.getAccessToken();

    // DEBUG: Log token to console (don't do this in production)
    console.log('Access Token:', accessToken);

    const apiPort: string = process.env.API_PORT || '3001';
    const response = await fetch(`http://localhost:${apiPort}/api/shows`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch shows: ${response.statusText}`);
    }

    const shows = (await response.json()) as unknown;

    // ✅ Also return the token in response for debugging (REMOVE IN PRODUCTION)
    return NextResponse.json({
      accessToken,
      shows,
    });
  } catch (error: any) {
    console.error('Error in /api/shows:', error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
};