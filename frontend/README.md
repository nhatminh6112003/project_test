
## installation

```
npm install
npm run dev
```
## Registration Feature

The registration page is the entry point for new users to create an account for access to the application's features. This document provides an overview of the registration functionality on the frontend.

### Accessing the Registration Page

To register as a new user, navigate to the following URL:http://localhost:3000/register

### Registration Form Fields

The registration form requires the following information:

- **FirstName**: The user's first name.
- **LastName**: The user's last name.
- **Username**: A unique identifier that the user will use to log in.
- **Password**: A secure password for account protection.

### How to Register

Follow these steps to create a new account:

1. Fill in all the fields on the registration form.
2. Click the `Sign In` button to submit the form.
3. Upon successful registration, you will be redirected to the login page.
## Login Feature

The login page allows existing users to access their accounts by entering their credentials. This section explains how users can log in to the application through the frontend interface.

### Accessing the Login Page

You can access the login page at:http://localhost:3000/login

### Login Form Fields

To log in to the application, you will need to provide:

- **Username**: Your unique username associated with your account.
- **Password**: The password you set during the registration process.
### Cart Overview

Upon accessing the cart page, you will see the following information:

- **My Points**: Shows the total points available to you, which can be used for purchases.
- A list of **Products** added to the cart, including:
  - Product image and name
  - The points required for the product
  - Quantity selector to adjust the number of items
  - The total points for that product based on quantity
  - A delete button to remove the item from the cart

### Managing Your Cart

- **Update Quantity**: To change the quantity of an item, use the quantity selector next to the product.
- **Remove Items**: To remove an item from your cart, click the 'Delete' button associated with the item.
- **Review Total Points**: At the bottom of the list, the total points for all items in the cart are displayed.

### Checking Out

Once you have reviewed your items and are ready to purchase:

1. Verify that you have enough points available for the purchase.
2. Click the 'Buy' button located below the total points summary.
3. You will be guided through the checkout process to complete your purchase.
![z5275164794431_3f0fef1e14dab29af3eae0266ad51cdc](https://github.com/nhatminh6112003/ITJOBS-FRONTEND/assets/106549349/8bb92005-94cc-46ab-94d7-24fa95da6031)

## My Orders

The "My Orders" page provides a comprehensive view of all your completed and pending orders. It enables you to track the status of your purchases and perform actions such as viewing detailed order information or canceling an order if necessary.

### Accessing My Orders

To view your orders, click on the "My Orders" link typically located in the user profile menu or navigate directly to:http://localhost:3000/order

### Understanding Your Orders

On the "My Orders" page, you will find the following information for each order:

- **Order ID**: The unique identifier for your order.
- **Total Point Payment**: The total points spent on the order.
- **Status**: The current status of your order (e.g., Pending, Completed, Shipped).
- **Action**: Buttons for "Detail" to view more information about the order, and "Cancel Order" to cancel the order if it is still in a cancellable state.

### Managing Your Orders

- **Viewing Order Details**: Click the 'Detail' button corresponding to an order to see its full details, including items purchased, shipping information, and transaction history.
- **Canceling an Order**: If an order is in a 'Pending' status and you wish to cancel it, click the 'Cancel Order' button. Please note that orders may only be canceled within a specific timeframe after placing the order.


![z5275235214414_11765bf3a0d8fbf42c769b229d565bc8](https://github.com/nhatminh6112003/ITJOBS-FRONTEND/assets/106549349/5c45a2b3-528b-4104-a100-ac6135151bcb)


## Order Details

The "Order Details" page offers an in-depth look at the specific items that make up an order. This interface allows users to review the individual products, their quantities, and associated points within an order.

### Viewing Order Details

When you view the details of an order, the following information is displayed for each item:

- **Title**: The name of the product.
- **Writer**: The author or creator of the product.
- **Cover Image**: A visual representation of the product.
- **Tag**: Labels that categorize the product, such as 'fiction' or 'science'.
- **Quantity**: The number of units of the product ordered.
- **Point**: The cost in points for each unit of the product.

![image](https://github.com/nhatminh6112003/ITJOBS-FRONTEND/assets/106549349/2554a6ba-8c72-4791-83de-76dc55faa75b)
