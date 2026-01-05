import express from "express";
const router = express.Router();
import { query } from "./db.js";

// Helper function to convert SQL.js result into clean JSON
const format = (res) =>
  res.values.map(row =>
    Object.fromEntries(row.map((v, i) => [res.columns[i], v]))
  );

/* === BASE TABLES === */

// Fetch all candidates
router.get("/candidates", (req, res) => {
  // TODO:
  // Select all rows from Candidates table
  // then sort by candidate_id
  const sql = `
   select candidate_id, name, email from Candidates order by candidate_id asc;
  `;
  res.json(format(query(sql)));
});

// Fetch all job roles
router.get("/job-roles", (req, res) => {
  // TODO:
  // Select all rows from JobRoles table
  // then sort by role_id
  const sql = `
  select * from JobRoles order by role_id asc;
  `;
  res.json(format(query(sql)));
});

// Fetch all applications
router.get("/applications", (req, res) => {
  // TODO:
  // Select all rows from Applications table
  // then sort by application_id
  const sql = `
   select * from Applications order by application_id asc;
  `;
  res.json(format(query(sql)));
});

/* === ANALYTICS QUERIES === */

// Candidates whose names start with 'A'
router.get("/candidates-start-a", (req, res) => {
  // TODO:
  // Find candidates whose name starts with letter 'A'
  // then sort results by candidate_id
  const sql = `
    select * from Candidates where name like 'A%' order by candidate_id;

  `;
  res.json(format(query(sql)));
});

// Number of applications per job role
router.get("/applications-per-role", (req, res) => {
  // TODO:
  // Count total applications per role
  // Also include roles with zero applications
  // then sort by total applications (descending), then role name (ascending)
  const sql = `
  select j.role_name, count(a.application_id) as total_applications
  from JobRoles j left join Applications a on j.role_id=a.role_id 
  group by j.role_id, j.role_name order by count(a.application_id) desc, 
  j.role_name asc;
  `;
  res.json(format(query(sql)));
});

// Candidates rejected more than once
router.get("/rejected-more-than-once", (req, res) => {
  // TODO:
  // Count rejected applications per candidate
  // Include only candidates rejected more than once
  // then sort by rejection count (descending), then candidate name (ascending)
  const sql = `
  select name, count(*) as rejection_count from Candidates c join Applications a on 
  a.candidate_id=c.candidate_id where status="Rejected" group by c.candidate_id, c.name
  having count(*)>1 order by count(*) desc, c.name asc;
  `;
  res.json(format(query(sql)));
});

// Job roles with the most hires
router.get("/roles-most-hires", (req, res) => {
  // TODO:
  // Count hired applications per role
  // then sort by total hires (descending), then role name (ascending)
  const sql = `
  select j.role_name, count(a.application_id) as total_hires from JobRoles j join Applications a 
  on a.role_id=j.role_id and a.status='Hired' group by j.role_name, j.role_id 
  order by count(a.status) desc, j.role_name asc;
  `;
  res.json(format(query(sql)));
});

// Candidates who applied to multiple roles
router.get("/candidates-multiple-roles", (req, res) => {
  // TODO:
  // Count distinct roles applied by each candidate
  // Include only candidates who applied to more than one role
  // then sort by number of roles (descending), then candidate name (ascending)
  const sql = `
    select c.name, count(distinct a.role_id) as roles_applied 
    from Candidates c join Applications a
     on a.candidate_id=c.candidate_id
     group by c.candidate_id,c.name
     having count(distinct a.role_id)>1
     order by count(distinct a.role_id) desc, c.name asc;
  `;
  res.json(format(query(sql)));
});
export default router;
