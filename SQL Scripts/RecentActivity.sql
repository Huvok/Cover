CREATE TABLE RecentActivity
(
    RecentActivityId INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    MusicianId INT(6) UNSIGNED,
    Type VARCHAR(50) NOT NULL,
    ActivityId INT(10) UNSIGNED,
    FileName VARCHAR(50),
    FOREIGN KEY (MusicianId) REFERENCES Musician(MusicianId)
);