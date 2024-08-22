import {useAuth} from "react-oidc-context";
import {jwtDecode} from "jwt-decode";
import {IdTokenClaims} from "oidc-client-ts";


interface ProfileWithClientRoles extends IdTokenClaims {
    client_roles: string[];
}

export const useUserData = (): ProfileWithClientRoles | undefined => {
    const {isAuthenticated, user} = useAuth();

    if (!isAuthenticated) {
        return undefined;
    }

    return user && user.id_token ? jwtDecode<ProfileWithClientRoles>(user.id_token) : undefined;
}