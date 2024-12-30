export async function handleResponse(response: any) {
  if (response.ok) {
    // Returning like this due to the test form post api
    // does not return proper json
    return response.json ? response.json() : response;
  }
  if (response.status === 403) {
    // To handle unauthorized access from API
    // API will be sending JSON response for 403
    return response.json ? response.json() : response;
  }
  if (response.status === 500) {
    // TODO: Take care about 500 handling in other places in the separate User Story
    var user = { "userName": '', "errorOcurredMessage": response.text() };
    return user;
  }
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

declare global {
  interface Window {
    TDIisOnline: boolean;
  }
}

let errorTimeout = setTimeout(() => null);

export const handleError = (error: any) => {
  const displayErrorPopup = (message: string, reload = false) => {
    alert(message);
    if (reload) {
      window.location.reload();
    }
  };
  if (
    typeof error === "string" &&
    error.trim().toLowerCase() === "typeerror: failed to fetch"
  ) {
    clearTimeout(errorTimeout);
    const isOnline = localStorage.getItem("TDI-isOnline");
    errorTimeout = setTimeout(() => {
      if (isOnline !== null && JSON.parse(isOnline) === true) {
        // User is online
        // Most likely a session issue
        const isSessionHandlingEnabled = localStorage.getItem(
          "TDI-isSessionHandlingEnabled"
        );
        if (
          isSessionHandlingEnabled !== null &&
          JSON.parse(isSessionHandlingEnabled) === true
        ) {
          displayErrorPopup(
            "Your page was idle and the session has expired. Please confirm reload.",
            true
          );
        } else {
          console.error("Session handling is disabled, ignoring error.");
        }
      } else {
        // User is offline
        displayErrorPopup(
          "Connection lost. Please make sure that you are connected to the internet, and then try again."
        );
      }
    }, 2000);
  }
  throw error;
};

// API additional configurations for axios
export const defaultConfigForAxios = {
  headers: {
    "content-type": "application/json",
  },
  timeout: 30000,
};

export const defaultConfigForOnPagerAxios = {
  headers: {
    "content-type": "application/json",
  },
  timeout: 60000,
};
/**
 * Set the API URL based on wether it is call for decision document or actual tech page.
 */
export const TechPagesAPIUrl = (baseURL: string, trlLevel?: string): string => {
  return trlLevel && trlLevel.trim().length > 0
    ? baseURL + "&trlLevel=" + trlLevel
    : baseURL;
};
