package org.example.backend.config;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Service
public class ConfigurationService {

    private static final String CREATE_STRING_NO_DATA = "sql/library_db.sql";

    private static final String CREATE_STRING_WITH_DATA = "sql/library_db_example_data.sql";

    private static final String DROP_SCHEMA_SCRIPT = "sql/dropSchema.sql";

    private final DataSource dataSource;

    @Autowired
    public ConfigurationService(
            DataSource dataSource
    ) {
        this.dataSource = dataSource;
    }

    @Transactional
    public void createEmptyDatabase() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(connection, new ClassPathResource(DROP_SCHEMA_SCRIPT));
            ScriptUtils.executeSqlScript(connection, new ClassPathResource(CREATE_STRING_NO_DATA));
        }
    }

    @Transactional
    public void createDatabaseWithExampleData() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(connection, new ClassPathResource(DROP_SCHEMA_SCRIPT));
            ScriptUtils.executeSqlScript(connection, new ClassPathResource(CREATE_STRING_WITH_DATA));
        }
    }

}
