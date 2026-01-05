select strftime('%Y-%m',sale_date) as sale_month, sum(amount) as total_sales from Sales group by strftime('%Y-%m',sale_date) having sum(amount)>=4000 order by sum(amount) desc;
select c.customer_id, c.customer_name, count(o.order_id) as total_orders from Customers c left join Orders o on c.customer_id=o.customer_id group by c.customer_id, c.customer_name order by count(o.order_id) desc, c.customer_id asc;
select sale_month, customer_name, total_purchase, monthly_rank from (select strftime('%Y-%m',order_date) as sale_month, customer_name, sum(amount) as total_purchase,rank() over(partition by strftime('%Y-%m',order_date) order by sum(amount) desc) as monthly_rank from Orders group by customer_name, strftime('%Y-%m',order_date)) t 
where monthly_rank<4 
order by sale_month asc, monthly_rank asc, customer_name asc;
