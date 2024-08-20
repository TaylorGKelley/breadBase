'use server';

import { redirect } from 'next/navigation';

export async function checkAuth(redirectUrl: string = '/') {
  try {
    const response = await fetch(`${process.env.API_URI}/checkAuth`);

    if (!response.ok) {
      throw new Error('User not authenticated, redirect to login page');
    }
  } catch (error) {
    redirectUrl = '/login';
  } finally {
    redirect(redirectUrl);
  }
}
