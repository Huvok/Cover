CREATE TABLE Performance
(
    PerformanceId INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    MusicianId INT(6) UNSIGNED,
    Place VARCHAR(50) NOT NULL,
    Location VARCHAR(50) NOT NULL,
    DateAndTime TIMESTAMP NOT NULL,
    FOREIGN KEY (MusicianId) REFERENCES Musician(MusicianId)
);