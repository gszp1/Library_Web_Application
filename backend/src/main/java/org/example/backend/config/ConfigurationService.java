package org.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Service
public class ConfigurationService {

    private final DataSource dataSource;

    @Autowired
    public ConfigurationService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    private static final String CREATE_STRING_NO_DATA = "sql/library_db.sql";

    private static final String CREATE_STRING_WITH_DATA = "sql/library_db_example_data.sql";

    public void createEmptyDatabase() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(connection, new ClassPathResource(CREATE_STRING_NO_DATA));
        }
    }

    public void createDatabaseWithExampleData() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(connection, new ClassPathResource(CREATE_STRING_WITH_DATA));
        }
    }
}
