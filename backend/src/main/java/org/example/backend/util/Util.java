package org.example.backend.util;

public class Util {

    // default time of reservation in days
    public static final int DEFAULT_RESERVATION_TIME = 14;

    // default time of single reservation time increase in day
    public static final int DEFAULT_RESERVATION_EXTENSION= 7;

    // default time of single time increase in days for borrowed resource
    public static final int DEFAULT_BORROW_EXTENSION = 7;

    // maximal number of extensions user can make per reservation
    public static final int MAX_NUMBER_OF_EXTENSIONS = 2;

    // maximal number of extensions user can make per borrowed resource
    public static final int MAX_NUMBER_OF_BORROW_EXTENSIONS = 5;
}
