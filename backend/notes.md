# notes.md

## 1️⃣ Assumptions

- One event triggers at most one matching campaign.
- Each campaign has unique action IDs.
- EventId is unique and used for idempotency.
- Action execution is simulated using setTimeout.
- No real email integration (SEND_EMAIL is simulated).
- MongoDB is running locally.

---

## 2️⃣ Concurrency Considerations

- Idempotency handled using MongoDB unique index on `eventId`.
- If duplicate event is sent:
  - MongoDB throws duplicate key error.
  - System catches it.
  - Existing execution is returned.
- There is a small delay handling to avoid race condition between event creation and execution creation.

Since this is a simplified assignment:
- No distributed locking.
- No background worker queue.
- No transaction usage.

---

## 3️⃣ Tradeoffs Made

- Used setTimeout instead of job queue (like Redis/Kafka) for simplicity.
- Stored execution state inside single document for easier tracking.
- Did not introduce microservices for this assignment.
- Used basic retry logic without exponential backoff.

The focus was clarity and separation of layers:
Domain → Services → Controllers → Routes.

---

## 4️⃣ What Was Skipped

- No real email sending service.
- No message queue system.
- No distributed system handling.
- Retry endpoint was implemented but not stress tested.
- No authentication layer added.
- No Docker setup.

---

## 5️⃣ AI Tools Used

- ChatGPT:
  - Used for architectural guidance.
  - Used for understanding idempotency improvements.
  - Manually reviewed and implemented logic.

All business logic and structure were implemented and reviewed manually.
