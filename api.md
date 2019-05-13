## API

### GET /task_groups

Fetches all the groups and their associated tasks.

### POST /tasks/:id/toggle

If the task is not completed (the `completed_at` field is blank), the current date/time is saved into the `completed_at` field.

If the task has been completed, it will remove the data in the `completed_at` field.

If successful, the data returned by `/task_groups` is returned.
