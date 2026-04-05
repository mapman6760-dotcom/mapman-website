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
