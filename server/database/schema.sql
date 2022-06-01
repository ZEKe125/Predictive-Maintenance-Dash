DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS userteam;
DROP TABLE IF EXISTS fleet;
DROP TABLE IF EXISTS robot;
DROP TABLE IF EXISTS record;
DROP TABLE IF EXISTS fault;
DROP TABLE IF EXISTS maintenance;
DROP TABLE IF EXISTS robotmodel;
DROP TABLE IF EXISTS modelspecs;
DROP TABLE IF EXISTS maintenancetype;
DROP TABLE IF EXISTS robotdata;
DROP TABLE IF EXISTS teamfleet;

CREATE TABLE user (
    u_userID        INTEGER PRIMARY KEY,
    u_username      TEXT    UNIQUE
                            NOT NULL,
    u_password      TEXT    NOT NULL,
    u_email         TEXT    UNIQUE
                            NOT NULL,
    u_isAdmin       BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE profile (
    p_profileID     INTEGER PRIMARY KEY,
    p_userID        INTEGER NOT NULL,
    p_name          TEXT    NOT NULL,
    p_lastname      TEXT    NOT NULL
);

CREATE TABLE team (
    t_teamID        INTEGER PRIMARY KEY,
    t_adminID       INTEGER NOT NULL,
    t_name          TEXT    NOT NULL,
    t_organization  TEXT    NOT NULL,
    t_access_code   TEXT    UNIQUE
                            NOT NULL
);


CREATE TABLE userteam (
    ut_userteamID   INTEGER PRIMARY KEY,
    ut_userID       INTEGER NOT NULL,
    ut_teamID       INTEGER NOT NULL
);

CREATE TABLE fleet (
    fl_fleetID  INTEGER PRIMARY KEY,
    fl_name     TEXT    NOT NULL
);

CREATE TABLE teamfleet (
    tf_teamfleetID  INTEGER PRIMARY KEY,
    tf_fleetID      INTEGER NOT NULL,
    tf_teamID       INTEGER NOT NULL
);

CREATE TABLE robot (
    ro_robotID      INTEGER PRIMARY KEY,
    ro_fleetID      INTEGER NOT NULL,
    ro_modelID      INTEGER NOT NULL,
    ro_name          TEXT NOT NULL,
    ro_serialNumber  TEXT UNIQUE
                          NOT NULL,
    ro_workcell      TEXT
);

CREATE TABLE record (
    re_recordID         INTEGER PRIMARY KEY,
    re_robotID          INTEGER NOT NULL,
    re_profileID        INTEGER NOT NULL,
    re_faultID          INTEGER UNIQUE
                                NOT NULL,
    re_maintenanceID    INTEGER UNIQUE
                                NOT NULL
);

CREATE TABLE fault (
    fa_faultID     INTEGER  PRIMARY KEY,
    fa_name        TEXT     NOT NULL,
    fa_type        TEXT     NOT NULL,
    fa_date        DATETIME NOT NULL,
    fa_is_resolved BOOLEAN  NOT NULL,
    fa_description TEXT
);


CREATE TABLE maintenance (
    m_maintenanceID     INTEGER PRIMARY KEY,
    m_mtypeID           INTEGER  NOT NULL,
    m_type              TEXT     NOT NULL,
    m_date              DATETIME NOT NULL,
    m_notes             TEXT
);


CREATE TABLE robotmodel (
    rm_robotmodelID     INTEGER PRIMARY KEY,
    rm_specsID          INTEGER NOT NULL,
    rm_mtypeID          INTEGER NOT NULL,
    rm_name           TEXT    NOT NULL
);


CREATE TABLE modelspecs (
    ms_modelspecsID        INTEGER PRIMARY KEY,
    ms_payload             TEXT    NOT NULL,
    ms_reach               TEXT,
    ms_joint1_range        TEXT,
    ms_joint2_range        TEXT,
    ms_joint3_range        TEXT,
    ms_joint4_range        TEXT,
    ms_joint4_inertia      TEXT,
    ms_cycle_time          TEXT,
    ms_downward_push_force TEXT,
    ms_joint1_speed        TEXT,
    ms_joint2_speed        TEXT,
    ms_joint3_speed        TEXT,
    ms_joint4_speed        TEXT
);


CREATE TABLE maintenancetype (
    mt_maintenancetypeID    INTEGER  PRIMARY KEY,
    mt_name                 TEXT     NOT NULL
);

CREATE TABLE maintenanceitem (
    mi_maintenanceitemID    INTEGER  PRIMARY KEY,
    mi_maintenancetypeID    INTEGER  NOT NULL,
    mi_item                 TEXT     NOT NULL,
    mi_period               DATETIME NOT NULL,
    mi_reference            TEXT
);

CREATE TABLE robotdata (
    rd_robotdataID      INTEGER PRIMARY KEY,
    rd_robotID          INTEGER NOT NULL,
    rd_timestamp        INTEGER DATETIME,
    rd_PkVelAx1         INTEGER DEFAULT 0,
    rd_PkVelAx2         INTEGER DEFAULT 0,
    rd_PkVelAx3         INTEGER DEFAULT 0,
    rd_PkVelAx4         INTEGER DEFAULT 0,
    rd_AC230V           INTEGER DEFAULT 0,
    rd_HighVoltDC       INTEGER DEFAULT 0,
    rd_DC24V            INTEGER DEFAULT 0,
    rd_DutyCycAx1       INTEGER DEFAULT 0,
    rd_DutyCycAx2       INTEGER DEFAULT 0,
    rd_DutyCycAx3       INTEGER DEFAULT 0,
    rd_DutyCycAx4       INTEGER DEFAULT 0,
    rd_AmpTempAx1       INTEGER DEFAULT 0,
    rd_AmpTempAx2       INTEGER DEFAULT 0,
    rd_AmpTempAx3       INTEGER DEFAULT 0,
    rd_AmpTempAx4       INTEGER DEFAULT 0,
    rd_EncTempAx1       INTEGER DEFAULT 0,
    rd_EncTempAx2       INTEGER DEFAULT 0,
    rd_EncTempAx3       INTEGER DEFAULT 0,
    rd_EncTempAx4       INTEGER DEFAULT 0,
    rd_BaseBoardTemp    INTEGER DEFAULT 0,
    rd_PkPosErrAx1      INTEGER DEFAULT 0,
    rd_PkPosErrAx2      INTEGER DEFAULT 0,
    rd_PkPosErrAx3      INTEGER DEFAULT 0,
    rd_PkPosErrAx4      INTEGER DEFAULT 0,
    rd_ActTorAx1        INTEGER DEFAULT 0,
    rd_ActTorAx2        INTEGER DEFAULT 0,
    rd_ActTorAx3        INTEGER DEFAULT 0,
    rd_ActTorAx4        INTEGER DEFAULT 0,
    rd_PkTorAx1         INTEGER DEFAULT 0,
    rd_PkTorAx2         INTEGER DEFAULT 0,
    rd_PkTorAx3         INTEGER DEFAULT 0,
    rd_PkTorAx4         INTEGER DEFAULT 0
);
