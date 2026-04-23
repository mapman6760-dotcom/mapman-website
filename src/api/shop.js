const BASE_URL = "https://mapman-production.up.railway.app/shop";

export const getShopAnalytics = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/analytics`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "usertoken": token
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch analytics");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching shop analytics:", error);
        throw error;
    }
};
export const fetchSavedVideos = async (page) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/fetchMySavedVideos?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "usertoken": token
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch saved videos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching saved videos:", error);
        throw error;
    }
};

export const fetchSavedShops = async (page) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/fetchSavedShops?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "usertoken": token
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch saved shops");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching saved shops:", error);
        throw error;
    }
};
export const getProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/getProfile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "usertoken": token
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch profile");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};
export const fetchShop = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/fetchShop`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "usertoken": token
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch shop details");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching shop details:", error);
        throw error;
    }
};
export const registerShop = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/shopRegister`, {
            method: "POST",
            headers: {
                "usertoken": token
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to register shop");
        }

        return await response.json();
    } catch (error) {
        console.error("Error registering shop:", error);
        throw error;
    }
};

export const updateProfile = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/updateProfile`, {
            method: "POST",
            headers: {
                "usertoken": token
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update profile");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};
