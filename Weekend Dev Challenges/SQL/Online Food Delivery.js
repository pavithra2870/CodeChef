import express from "express";
const router = express.Router();
import { query } from "./db.js";

// Helper function to convert SQL.js result into clean JSON
const format = (res) =>
  res.values.map(row =>
    Object.fromEntries(row.map((v, i) => [res.columns[i], v]))
  );

/* === BASE TABLES === */

// Fetch all orders
router.get("/orders", (req, res) => {
  // TODO:
  // Select all rows from Orders table
  // then sort by order_time
  const sql = `
  select order_id,customer_id,restaurant_id,partner_id,order_time,delivery_time,status
  from Orders order by order_time asc;
  `;
  res.json(format(query(sql)));
});

// Fetch all restaurants
router.get("/restaurants", (req, res) => {
  // TODO:
  // Select all rows from Restaurants table
  // then sort by restaurant_id
  const sql = `
    select * from Restaurants order by restaurant_id asc;
  `;
  res.json(format(query(sql)));
});

// Fetch all delivery partners
router.get("/delivery-partners", (req, res) => {
  // TODO:
  // Select all rows from DeliveryPartners table
  // then sort by partner_id
  const sql = ` select * from DeliveryPartners order by partner_id asc;
  `;
  res.json(format(query(sql)));
});

/* === ANALYTICS QUERIES === */

// Average delivery time per restaurant
router.get("/avg-delivery-time", (req, res) => {
  // TODO:
  // Calculate average delivery time per restaurant
  // Include only delivered orders
  // then sort by average delivery time (ascending)
  const sql = `
  select r.name as restaurant_name, round(avg(o.delivery_time),2) as avg_delivery_time from
  Restaurants r join Orders o on r.restaurant_id=o.restaurant_id and o.status="Delivered"
  group by r.restaurant_id, r.name 
  order by round(avg(o.delivery_time),2);
  `;
  res.json(format(query(sql)));
});

// Restaurants with highest number of cancellations
router.get("/most-cancellations", (req, res) => {
  // TODO:
  // Count cancelled orders per restaurant
  // then sort by cancellation count (descending)
  // Use restaurant name as secondary sort (ascending)
  const sql = `
    select r.name as restaurant_name, count(*) as cancellation_count
    from Restaurants r join Orders o on r.restaurant_id=o.restaurant_id and o.status="Cancelled"
    group by r.restaurant_id, r.name
    order by count(*) desc, r.name asc;
    `;
  res.json(format(query(sql)));
});

// Rank restaurants by delivery success ratio
router.get("/delivery-success-ratio", (req, res) => {
  // TODO:
  // For each restaurant:
  // Calculate success ratio = delivered orders / total orders
  // Round the ratio to 2 decimal places
  // then sort by success ratio (descending), then restaurant name (ascending)
  const sql = `
  select r.name as restaurant_name, round(cast(sum(case when o.status="Delivered" then 1 else 0 end) 
  as float)/count(o.order_id),2) as success_ratio from Restaurants r left join Orders o on
  o.restaurant_id=r.restaurant_id group by r.restaurant_id, r.name 
  order by success_ratio desc, r.name asc;
  `;
  res.json(format(query(sql)));
});

// Time gap between consecutive orders by same customer
router.get("/order-gaps", (req, res) => {
  // TODO:
  // For each customer:
  // Use a window function to find previous order time
  // then order results by customer_id and order_time
  const sql = `
  select customer_id, order_time, lag(order_time) over(partition by customer_id 
  order by order_time) as previous_order_time
  from Orders order by customer_id,order_time;
  `;
  res.json(format(query(sql)));
});

// Busiest hours of the day
router.get("/busiest-hours", (req, res) => {
  // TODO:
  // Extract hour range from order_time (24-hour format and hour range e.g., "09-10") 
  // Count number of orders per hour range
  // then sort by total orders (descending), then hour range (ascending)
  const sql = `
SELECT printf('%02d-%02d', hour, hour + 1) AS hour_range, COUNT(*) AS total_orders
FROM (SELECT CAST(strftime('%H', order_time) AS INTEGER) AS hour FROM Orders
)
GROUP BY hour
ORDER BY total_orders DESC, hour ASC;
  `;
  res.json(format(query(sql)));
});

export default router;
