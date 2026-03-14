const server = process.env.REACT_APP_SERVER;

export const fetchUserOrders = async (userRole) => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to place an order");
        window.location.reload();
        return;
    }
    // const userRole = "vendor";

    try {
        const response = await fetch(`${server}/api/order/get-orders/${userRole}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            alert(data.message || `Failed to fetch ${userRole} orders`);
            return;
        }
        // console.log(data.result.orders);
        return data.result.orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        alert(`Failed to load ${userRole} orders. Please try again later.`)
        return;
    }
}