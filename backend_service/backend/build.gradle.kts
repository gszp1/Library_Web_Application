plugins {
	java
	id("org.springframework.boot") version "3.2.4"
	id("io.spring.dependency-management") version "1.1.4"
}

group = "org.example"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_21
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-jdbc")
	implementation("org.springframework.boot:spring-boot-starter-security:3.2.5")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0")
	implementation("io.jsonwebtoken:jjwt-api:0.11.5")
	implementation("org.springframework:spring-webmvc")
	implementation("org.springdoc:springdoc-openapi-ui:1.8.0")
	implementation("io.springfox:springfox-swagger-ui:3.0.0")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")

	developmentOnly("org.springframework.boot:spring-boot-devtools")

	annotationProcessor("org.projectlombok:lombok")

	compileOnly("org.projectlombok:lombok")
	compileOnly("jakarta.servlet:jakarta.servlet-api")

	runtimeOnly("org.postgresql:postgresql")
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")

//	providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.bootJar {
	archiveBaseName.set("LibraryService")
	archiveVersion.set("1.0.0")
	archiveClassifier.set("")
	archiveExtension.set("jar")
	destinationDirectory.set(file("$buildDir/libs"))
}
