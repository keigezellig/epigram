package com.joco.epigram.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "epigram.security")
@Data
public class ConfigProperties {
    private String keycloakClientId;
}
