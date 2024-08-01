import { NodeRequestHandler } from 'next/dist/server/next-server';

export function middleware(request: NodeRequestHandler) {
  const isAuthenticated = false;

  if (!isAuthenticated) {
  }
}
