FROM ubuntu:22.04

#Fixes problems related to polish signs in project (like polish book names)
RUN apt-get update && apt-get install -y locales && \
    locale-gen pl_PL.UTF-8

ENV LANG=pl_PL.UTF-8
ENV LANGUAGE=pl_PL:pl
ENV LC_ALL=pl_PL.UTF-8

RUN apt-get update && apt-get install -y \
	openjdk-21-jdk \
	git \
	gradle \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

WORKDIR /app

COPY gradlew gradlew
COPY gradle gradle
COPY build.gradle.kts settings.gradle.kts /app/
COPY src /app/src

RUN chmod +x gradlew

RUN ./gradlew bootJar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "build/libs/LibraryService-1.0.0.jar"]

