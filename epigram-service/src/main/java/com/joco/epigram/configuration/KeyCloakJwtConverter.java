package com.joco.epigram.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@Slf4j
public class KeyCloakJwtConverter implements Converter<Jwt, JwtAuthenticationToken> {

    private final ConfigProperties configProperties;

    public KeyCloakJwtConverter(@Autowired ConfigProperties configProperties) {
        this.configProperties = configProperties;
    }

    @Override
    public JwtAuthenticationToken convert(Jwt jwt) {
        String RESOURCE_ACCESS_KEY = "resource_access";
        String REALM_ACCESS_KEY = "realm_access";
        String ROLES_KEY = "roles";
        String PRINCIPAL_ATTR = "preferred_username";

        Stream<SimpleGrantedAuthority> resourcesAccess = Optional.of(jwt)
                .map(token -> token.getClaimAsMap(RESOURCE_ACCESS_KEY))
                .map(claimMap -> (Map<String, List<String>>) claimMap.get(configProperties.getKeycloakClientId()))
                .map(resourceData -> resourceData.get(ROLES_KEY))
                .stream()
                .flatMap(Collection::stream)
                .map(SimpleGrantedAuthority::new);

        Set<GrantedAuthority> authorities = resourcesAccess.collect(Collectors.toSet());
        String principalClaimName = jwt.getClaimAsString(PRINCIPAL_ATTR);

        return new JwtAuthenticationToken(jwt, authorities, principalClaimName);

    }
}
