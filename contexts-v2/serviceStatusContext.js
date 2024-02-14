// serviceStatusContext.js
import { checkServiceStatus } from "@/utils/globalFunctions";
import { createContext, useContext, useEffect, useState } from "react";

const ServiceStatusContext = createContext();

const ServiceStatusProvider = ({ children }) => {
    const [isServiceAvailable, setIsServiceAvailable] = useState(true);

    useEffect(() => {
        async function fetchService() {
            const isStatusActive = await checkServiceStatus();
            setIsServiceAvailable(isStatusActive);
        }
        fetchService();
    }, []);

    return <ServiceStatusContext.Provider value={{ isServiceAvailable }}>{children}</ServiceStatusContext.Provider>;
};
export default ServiceStatusProvider;
export const useServiceStatus = () => {
    return useContext(ServiceStatusContext);
};
