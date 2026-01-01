import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function middleware(request) {
	const { pathname } = request.nextUrl;

	 if (pathname.startsWith("/api/admin")) {
		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET,
		});

		if (!token) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		if (token.role !== "admin") {
			return NextResponse.json(
				{ error: "Forbidden" },
				{ status: 403 }
			);
		}
	}

	if (pathname.startsWith("/admin/dashboard")) {
		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET,
		});

		if (!token || token.role !== "admin") {
			return NextResponse.redirect(new URL("/admin", request.url));
		}

		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/api/admin/:path*", "/admin/dashboard/:path*"],
};
