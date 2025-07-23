-- Tabla User con roles
CREATE TABLE User (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK( role IN ('TRABAJADOR', 'EMPRESA', 'ADMIN') ) NOT NULL DEFAULT 'TRABAJADOR',
    socialProvider TEXT,  -- Para indicar si se registró con Google, Facebook, Outlook
    socialId TEXT         -- ID del usuario en la red social
);

-- Tabla PlanPremium
CREATE TABLE PlanPremium (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    durationDays INTEGER NOT NULL
);

-- Tabla EmpresaPremium que asocia empresa a su plan premium
CREATE TABLE EmpresaPremium (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    planId TEXT NOT NULL,
    startDate TEXT DEFAULT (datetime('now')),
    endDate TEXT,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (planId) REFERENCES PlanPremium(id)
);

-- Tabla Job
CREATE TABLE Job (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    premium BOOLEAN DEFAULT 0,
    createdAt TEXT DEFAULT (datetime('now'))
);

-- Tabla Application
CREATE TABLE Application (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    jobId TEXT NOT NULL,
    isPremium BOOLEAN DEFAULT 0,
    status TEXT DEFAULT 'EN_REVISION',
    createdAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (jobId) REFERENCES Job(id)
);

-- Tabla SavedJob
CREATE TABLE SavedJob (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    jobId TEXT NOT NULL,
    UNIQUE(userId, jobId),
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (jobId) REFERENCES Job(id)
);

-- Tabla MercadoPagoTransactions
CREATE TABLE MercadoPagoTransactions (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    paymentId TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES User(id)
);
