function isSupabaseConfigured() {
  return Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
}

async function supabaseRequest(path, options = {}) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured yet.");
  }

  const response = await fetch(`${SUPABASE_CONFIG.url}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_CONFIG.anonKey,
      Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error_description || body.msg || body.message || "Authentication failed.");
  }

  return body;
}

async function signUpWithPassword({ email, password, profile }) {
  const redirectTo = getAuthRedirectUrl();
  const query = redirectTo ? `?redirect_to=${encodeURIComponent(redirectTo)}` : "";

  return supabaseRequest(`/auth/v1/signup${query}`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      data: profile
    })
  });
}

function getAuthRedirectUrl() {
  return SUPABASE_CONFIG.authRedirectUrl || chrome.runtime.getURL("dashboard.html");
}

async function signInWithPassword({ email, password }) {
  return supabaseRequest("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}

async function sendPasswordResetEmail(email) {
  const redirectTo = getAuthRedirectUrl();
  const query = redirectTo ? `?redirect_to=${encodeURIComponent(redirectTo)}` : "";

  return supabaseRequest(`/auth/v1/recover${query}`, {
    method: "POST",
    body: JSON.stringify({ email })
  });
}

async function updatePassword(accessToken, password) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured yet.");
  }

  const response = await fetch(`${SUPABASE_CONFIG.url}/auth/v1/user`, {
    method: "PUT",
    headers: {
      apikey: SUPABASE_CONFIG.anonKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password })
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error_description || body.msg || body.message || "Could not update password.");
  }

  return body;
}

async function getStoredSession() {
  const callbackSession = await storeSessionFromUrlHash();
  if (callbackSession) return callbackSession;

  const data = await chromeGet(["supabaseSession", "dashboardUser"]);
  return {
    session: data.supabaseSession || null,
    user: data.dashboardUser || null
  };
}

async function storeSessionFromUrlHash() {
  if (!window.location.hash.includes("access_token")) return null;

  const params = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const expiresAt = params.get("expires_at");
  const type = params.get("type");

  if (!accessToken) return null;

  const user = await getSupabaseUser(accessToken);
  const profile = {
    email: user.email,
    businessName: user.user_metadata?.businessName || "My Business",
    businessType: user.user_metadata?.businessType || "Small Business",
    location: user.user_metadata?.location || "My Area"
  };

  const dashboardUser = await storeAuthSession({
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresAt,
    type,
    user
  }, profile);

  history.replaceState(null, "", window.location.pathname);
  return {
    session: { accessToken, refreshToken, expiresAt, type, user },
    user: dashboardUser
  };
}

async function getSupabaseUser(accessToken) {
  const response = await fetch(`${SUPABASE_CONFIG.url}/auth/v1/user`, {
    headers: {
      apikey: SUPABASE_CONFIG.anonKey,
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error("Could not load confirmed user.");
  }

  return response.json();
}

async function storeAuthSession(authResponse, profile) {
  const session = {
    accessToken: authResponse.access_token,
    refreshToken: authResponse.refresh_token,
    expiresAt: authResponse.expires_at,
    type: authResponse.type || null,
    user: authResponse.user
  };

  const dashboardUser = {
    email: authResponse.user?.email || profile.email,
    businessName: authResponse.user?.user_metadata?.businessName || profile.businessName,
    businessType: authResponse.user?.user_metadata?.businessType || profile.businessType,
    location: authResponse.user?.user_metadata?.location || profile.location,
    authProvider: "supabase"
  };

  await chromeSet({
    supabaseSession: session,
    dashboardUser
  });

  return dashboardUser;
}

async function clearAuthSession() {
  await chromeSet({
    supabaseSession: null,
    dashboardUser: null
  });
}