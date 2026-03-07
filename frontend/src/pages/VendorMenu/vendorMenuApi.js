const server = process.env.REACT_APP_SERVER;

export const fetchVendorMenu = async (isPublic = false) => {
    let url;
    let token = null;

    if (isPublic) {
        url = `${server}/api/foods`;
    } else {
        url = `${server}/api/vendor/menu`;
        token = localStorage.getItem("token");
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            return { error: data?.message || "Failed to fetch menu" };
        }

        return data;
    } catch (error) {
        console.error("Error fetching vendor menu:", error);
        return { error: "Error fetching vendor menu. Network error" };
    }
};