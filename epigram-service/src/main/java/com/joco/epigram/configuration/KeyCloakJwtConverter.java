package com.joco.epigram.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class KeyCloakJwtConverter implements Converter<Jwt, JwtAuthenticationToken> {


    @Override
    public JwtAuthenticationToken convert(Jwt jwt) {
        String ROLES_KEY = "client_roles";
        String PRINCIPAL_ATTR = "preferred_username";

        List<GrantedAuthority> authorities = jwt.getClaimAsStringList(ROLES_KEY).stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        String principalClaimName = jwt.getClaimAsString(PRINCIPAL_ATTR);

        return new JwtAuthenticationToken(jwt, authorities, principalClaimName);

    }
}
