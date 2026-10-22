import { IAMService } from "@tidecloak/js";

window.carePassTideIntegrationLoaded = true;

const status = document.querySelector("#tide-status");
const loginButton = document.querySelector("#tide-login");
const logoutButton = document.querySelector("#tide-logout");

function setStatus(message) {
  if (status) status.textContent = message;
}

function setAuthenticated(role) {
  window.dispatchEvent(new CustomEvent("carepass:tide-role", { detail: { role } }));
}

function updateAuthUi(authenticated) {
  if (loginButton) loginButton.hidden = authenticated;
  if (logoutButton) logoutButton.hidden = !authenticated;
}

function handleSession(authenticated) {
  updateAuthUi(authenticated);
  if (!authenticated) {
    setAuthenticated(null);
    setStatus("TideCloak ready · sign in when configured");
    return;
  }

  const isPatient = IAMService.hasRealmRole("carepass.patient");
  const isDoctor = IAMService.hasRealmRole("carepass.doctor");
  const name = IAMService.getName?.() || "TideCloak account";

  if (isPatient === isDoctor) {
    setAuthenticated(null);
    setStatus("Signed in, but account needs exactly one CarePass role");
    return;
  }

  const role = isDoctor ? "doctor" : "patient";
  setAuthenticated(role);
  setStatus("Signed in: " + name + " · " + role);
}

loginButton?.addEventListener("click", () => {
  if (!tideConfigured) {
    setStatus("TideCloak isn’t configured yet · add tidecloak.json beside package.json");
    return;
  }
  IAMService.doLogin();
});

logoutButton?.addEventListener("click", () => IAMService.doLogout());

IAMService
  .on("ready", (_event, authenticated) => handleSession(authenticated))
  .on("authError", (_event, error) => {
    updateAuthUi(false);
    setAuthenticated(null);
    setStatus("TideCloak sign-in failed: " + (error?.message || "check realm setup"));
  })
  .on("initError", (_event, error) => {
    updateAuthUi(false);
    setAuthenticated(null);
    setStatus("TideCloak setup failed: " + (error?.message || "check adapter config"));
  })
  .on("logout", () => {
    handleSession(false);
    setStatus("Signed out · synthetic preview remains available");
  })
  .on("tokenExpired", () => {
    updateAuthUi(false);
    setAuthenticated(null);
    setStatus("Session expired · sign in again");
  });

let tideConfigured = false;

async function initializeTideCloak() {
  setStatus("Checking TideCloak setup…");
  try {
    const response = await fetch("/tidecloak.json", { cache: "no-store" });
    if (!response.ok) {
      setStatus("TideCloak not configured · synthetic preview only");
      return;
    }

    const adapter = await response.json();
    tideConfigured = true;
    await IAMService.initIAM(adapter);
  } catch (error) {
    setStatus("TideCloak unavailable · " + (error?.message || "start CarePass with npm run dev"));
  }
}

initializeTideCloak();
