import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { localStorageKeys } from './config/localstorage-keys';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const loginUrl = new URL('/sign-in', request.url);
	const dashboardUrl = new URL('/', request.url);

	const publicRoutes = ['/sign-in', '/sign-up'];

	const token = request.cookies.get(localStorageKeys.AUTH_TOKEN)?.value;

	const isPublicRoute = publicRoutes.includes(pathname);

	if (token) {
		if (isPublicRoute) {
			return NextResponse.redirect(dashboardUrl);
		}

		return NextResponse.next();
	}

	if (!token) {
		if (isPublicRoute) {
			return NextResponse.next();
		}

		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

// O seu matcher está correto, mantenha-o como está.
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
