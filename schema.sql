CREATE TABLE IF NOT EXISTS task_groups(
  id             integer NOT NULL PRIMARY KEY,
  name           varchar(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks(
  id             integer NOT NULL PRIMARY KEY,
  task_group_id  integer NOT NULL,
  task           varchar(40) NOT NULL,
  completed_at   datetime,
  dependency_ids int[],

  FOREIGN KEY (task_group_id) REFERENCES task_groups (id)
);
