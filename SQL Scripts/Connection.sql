CREATE TABLE `Connection`
(
    ConnectionId INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    MusicianSentId INT(6) UNSIGNED,
    MusicianReceivedId INT(6) UNSIGNED,
    ConnectionStatus enum('Sent', 'Accepted', 'Rejected') NOT NULL,
    SentDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    AcceptedDate TIMESTAMP,
    FOREIGN KEY (MusicianSentId) REFERENCES Musician(MusicianId),
    FOREIGN KEY (MusicianReceivedId) REFERENCES Musician(MusicianId)
);