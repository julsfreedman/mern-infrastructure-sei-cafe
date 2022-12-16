import { checkToken } from "../utilities/users-service"

export default function OrderHistoryPage(props) {
    const handleCheckToken = async () => {
        const expDate = await checkToken()
    }

    return (
        <>
            <h1>OrderHistoryPage</h1>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
        </>
    )
}