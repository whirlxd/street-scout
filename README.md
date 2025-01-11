# Street Scout

Street Scout is a community-driven platform for reporting and tracking public property issues. Users can submit reports about various issues, such as broken streetlights, damaged pavements, and fallen trees, and track the status of these reports.

## Features

- **User Authentication**: Simple login system for users.
- **Report Submission**: Users can submit reports with details such as title, location, severity, and an image.
- **Report Tracking**: Track the status of submitted reports.
- **Map View**: View reported issues on a map.
- **Dashboard**: Admin dashboard to monitor and manage community reports.
- **Notifications**: Receive notifications about report status and community updates.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Mobile**: Capacitor for Android support
- **Maps**: Leaflet, Mapbox GL

Database Schema
Reports Table
Column Name	Data Type	Description
id	integer	Primary key, unique identifier for each report
title	text	Title of the report
location	text	Location of the reported issue
severity	integer	Severity level of the issue (1: low, 2: medium, 3: high)
image_url	text	URL of the image associated with the report
created_at	timestamp	Timestamp when the report was created
Storage
Bucket: report-images