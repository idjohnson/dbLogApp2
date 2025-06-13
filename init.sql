CREATE TABLE IF NOT EXISTS logs (
    id VARCHAR(20) PRIMARY KEY,
    body TEXT NOT NULL,
    project TEXT NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    avatar_src TEXT,
    owner TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP,
    status TEXT NOT NULL
);

INSERT INTO logs (id, body, project, type, date, avatar_src, owner, description, created_at, status) VALUES
('001', 'Task 1', 'Project 1', 'Alert', 'Dec 5', '/rectangle-1-15.png', 'John Doe', 'This is a detailed description of Task 1. It involves completing the initial setup and configuration.', '2024-12-05T10:30:00Z', 'Active'),
('002', 'Task 2', 'Acme GTM', 'Info', 'Dec 5', '/rectangle-1-15.png', 'Jane Smith', 'Task 2 focuses on implementing the core functionality for the GTM system.', '2024-12-05T11:15:00Z', 'In Progress'),
('003', 'Write blog post for demo day', 'Acme GTM', 'Alert', 'Dec 5', '/rectangle-1-15.png', 'Mike Johnson', 'Create compelling blog content to showcase our demo day achievements and key features.', '2024-12-05T09:45:00Z', 'Pending'),
('004', 'Publish blog page', 'Website launch', 'Info', 'Dec 5', '/rectangle-1-15.png', 'Sarah Wilson', 'Deploy the blog page to production and ensure all links are working correctly.', '2024-12-05T14:20:00Z', 'Active');
-- Add more rows as needed