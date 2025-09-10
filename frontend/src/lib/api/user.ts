export async function login(email: string, password: string) {
	const res = await fetch(`/api/users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include', // <-- Important for cookie storage!
		body: JSON.stringify({ email, password })
	});

	if (!res.ok) {
		throw new Error(`Login failed: ${await res.text()}`);
	}

	return res.json();
}

/**
 * Logout the current user.
 */
export async function logout() {
	const res = await fetch(`/api/users/logout`, {
		method: 'POST',
		credentials: 'include'
	});

	if (!res.ok) {
		throw new Error(`Logout failed: ${await res.text()}`);
	}

	return res.json();
}

/**
 * Get the currently logged-in user.
 */
export async function getCurrentUser() {
	const res = await fetch(`/api/users/me`, {
		method: 'GET',
		credentials: 'include'
	});

	if (!res.ok) {
		return null; // Not logged in
	}

	return res.json();
}
